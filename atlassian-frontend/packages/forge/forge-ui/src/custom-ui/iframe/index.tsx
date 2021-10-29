/** @jsx jsx */
import {
  Fragment,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ApolloClient from 'apollo-client';
import Bowser from 'bowser';
import { css, jsx } from '@emotion/core';
import { EnvironmentContext } from '../../context';
import { FORGE_UI_ANALYTICS_CHANNEL } from '../../analytics';
import type { Extension } from '../../web-client';
import { useInvokeExtension, useCustomUITunnelsList } from '../../web-client';
import { Loader } from '../../web-runtime/loader';
import { ThreeLOPrompt } from '../../components';

import { UI_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { parse } from '@atlassian/cs-ari';
import {
  CoreData,
  CoreDataInner,
  ExtensionData,
  ProductEnvironment,
  LicenseState,
} from '@atlassian/forge-ui-types';
import { useBridge } from '../useBridge';
import SectionMessage from '@atlaskit/section-message';
import { useNavigation } from './useNavigation';
import stringify from 'fast-json-stable-stringify';

type InvokeRetry = () => Promise<void>;
import { createHistory, HistoryApiProvider } from './history';
import { useProductFetchClient } from './useProductFetchClient';

export type ComponentMap = {
  ThreeLOPrompt: typeof ThreeLOPrompt;
  [name: string]: (props: any) => React.ReactNode;
};

const defaultComponents: ComponentMap = {
  ThreeLOPrompt: (props) => <ThreeLOPrompt {...props} />,
};

export type ResolverContext = CoreData & { extension: ExtensionData };
export type ViewContext = {
  accountId: string | undefined;
  license?: LicenseState;
} & ResolverContext;

type UserConsentState = {
  requiresUserConsent: boolean;
};

interface BridgeConfig extends HistoryApiProvider {
  openModal?: (
    opts: any,
    consentState?: UserConsentState,
  ) => boolean | undefined;
  close?: (payload?: any) => boolean | undefined;
  submit?: (payload?: any) => boolean | undefined;
  spaPush?: (path: string, state?: any) => void;
}

interface Props {
  accountId: string | undefined;
  apolloClient: ApolloClient<object>;
  contextIds: string[];
  extension: Extension;
  components?: (defaults: ComponentMap) => ComponentMap;
  coreData: CoreData;
  extensionData: ExtensionData;
  onLoad?: () => void;
  loadingComponent?: () => ReactNode;
  height?: string;
  width?: string;
  bridge?: BridgeConfig;
  egressConsentFlowEnabled?: boolean;
  isResizable?: boolean;
  entryPoint?: string;
}

interface InnerProps extends Props {
  src: string;
  coreData: CoreDataInner;
}

const productEnvToCdnEnv = {
  [ProductEnvironment.PRODUCTION]: 'prod',
  [ProductEnvironment.STAGING]: 'stg',
  [ProductEnvironment.DEVELOPMENT]: 'stg',
};

const supportedBrowsers = {
  chrome: '>=25',
  edge: '>=14',
  firefox: '>=23',
  opera: '>=15',
  safari: '>=7',
};

export const getIsSupportedBrowser = (userAgent: string): boolean => {
  const browser = Bowser.getParser(userAgent);
  const isSupported = browser.satisfies(supportedBrowsers);
  if (isSupported === undefined) {
    return false;
  }
  return isSupported;
};

export const createSrcFromExtension = (
  appId: string,
  extension: Extension,
  environment: ProductEnvironment,
  entryPoint: string,
): string => {
  const resourceUploadId =
    extension.properties.resourceUploadId || extension.appVersion;

  return `https://${extension.installationId}.cdn.${productEnvToCdnEnv[environment]}.atlassian-dev.net/${appId}/${extension.environmentId}/${resourceUploadId}/${entryPoint}/index.html`;
};

export const getSrcUrl = (
  tunnels: { resourceKey: string; tunnelUrl: string }[],
  extensionResource: string,
  defaultUrl: string,
) => {
  const matchTunnel = tunnels.find(
    (tunnel) => tunnel.resourceKey === extensionResource,
  );
  if (matchTunnel) {
    return matchTunnel.tunnelUrl;
  }
  return defaultUrl;
};

export const getExtensionEntryPoint = (
  extension: Extension,
  entryPoint?: string,
): string => {
  const defaultEntryPoint = extension.properties.resource;
  const alternativeEntryPoint =
    entryPoint && extension.properties[entryPoint]?.resource;

  return alternativeEntryPoint || defaultEntryPoint;
};

const getResolverContext = (
  coreData: CoreDataInner,
  extensionData: ExtensionData,
): ResolverContext => ({
  ...coreData,
  extension: extensionData,
});

const getViewContext = (
  resolverContext: ResolverContext,
  accountId: string | undefined,
  extension: Extension,
): ViewContext => ({
  ...resolverContext,
  accountId,
  license: extension.properties?.license,
});

const ReloadOnContextChangeWrapper = ({
  context,
  children,
}: {
  context: ViewContext;
  children: ReactNode;
}) => <Fragment key={stringify(context)}>{children}</Fragment>;

const IFrameComponent = ({
  accountId,
  extension,
  contextIds,
  apolloClient,
  components,
  coreData,
  extensionData,
  loadingComponent,
  onLoad,
  height = '100%',
  width = '100%',
  src,
  bridge,
  egressConsentFlowEnabled,
  isResizable,
}: InnerProps) => {
  const { ThreeLOPrompt } = components
    ? components(defaultComponents)
    : defaultComponents;

  const { consentUrl, currentUserConsent, requiresUserConsent } = extension;

  const environment = useContext(EnvironmentContext);
  const { cloudId } = coreData;

  const [userConsentRequired, setUserConsentRequired] = useState(
    egressConsentFlowEnabled &&
      consentUrl &&
      !currentUserConsent &&
      requiresUserConsent,
  );

  const [resolverContext] = useState(
    getResolverContext(coreData, extensionData),
  );

  const [viewContext] = useState(
    getViewContext(resolverContext, accountId, extension),
  );

  const [threeLOInfo, setThreeLOInfo] = useState<{
    authUrl: string;
    onSuccess: () => Promise<void>;
    onReject: () => void;
  } | null>(null);

  const invokeRetriesRef = useRef<Array<InvokeRetry>>([]);

  useEffect(() => {
    const clearThreeLOInfo = async () => setThreeLOInfo(null);

    if (
      egressConsentFlowEnabled &&
      consentUrl &&
      !currentUserConsent &&
      requiresUserConsent
    ) {
      setThreeLOInfo({
        authUrl: consentUrl,
        onSuccess: async () => {
          setUserConsentRequired(false);
          return clearThreeLOInfo();
        },
        onReject: clearThreeLOInfo,
      });

      if (onLoad) {
        onLoad();
      }
    }
  }, [
    egressConsentFlowEnabled,
    consentUrl,
    currentUserConsent,
    requiresUserConsent,
    onLoad,
  ]);

  const navigation = useNavigation({ extension, push: bridge?.spaPush });

  const invoker = useInvokeExtension(contextIds, extension.id, {
    client: apolloClient,
  });

  const productFetchClient = useProductFetchClient({
    environment,
    cloudId,
    extensionId: extension.id,
    options: { client: apolloClient },
  });

  const { loading, iframeProps } = useBridge({
    origin: new URL(src).origin,
    api: {
      onInvoke: async (payload) => {
        const { data } = await invoker({
          call: payload,
          context: {
            ...resolverContext,
          },
        });
        const resp = data?.invokeExtension;
        if (!resp?.success) {
          const error = resp?.errors?.[0];
          if (error?.extensions.errorType === 'USER_CONSENT_REQUIRED') {
            return {
              type: '3lo',
              authUrl: error?.extensions.fields?.authInfoUrl as string,
            };
          }
          return {
            type: 'err',
            message:
              error?.message ?? 'An error occurred while trying to invoke.',
          };
        }
        return {
          type: 'ok',
          response: resp?.response?.body,
        };
      },
      onNavigate: navigation.onNavigate,
      onThreeLO: async (authUrl, retry: InvokeRetry) => {
        return new Promise((resolve, reject) => {
          invokeRetriesRef.current.push(retry);
          setThreeLOInfo({
            authUrl,
            onSuccess: () => {
              resolve();
              setThreeLOInfo(null);
              return Promise.all(
                invokeRetriesRef.current.map((retry) => retry()),
              ).then(() => {
                invokeRetriesRef.current = [];
              });
            },
            onReject: reject,
          });
        });
      },
      submit: (payload?: any) => {
        if (bridge?.submit) {
          return bridge.submit(payload) ?? true;
        }
        return false;
      },
      close: (payload?: any) => {
        if (bridge?.close) {
          return bridge.close(payload) ?? true;
        }
        return false;
      },
      openModal: (opts) => {
        if (bridge?.openModal) {
          return (
            bridge.openModal(opts, {
              requiresUserConsent: !!userConsentRequired,
            }) ?? true
          );
        }
        return false;
      },
      getContext: async () => ({
        ...viewContext,
      }),
      createHistory: async () =>
        createHistory({
          history: bridge?.history,
          extensionBasePath: bridge?.extensionBasePath,
        }),
      fetchProduct: async ({ restPath, product, fetchRequestInit }) => {
        const response = await productFetchClient(
          restPath,
          product,
          fetchRequestInit,
        );

        const { status, statusText } = response;
        const headers = Object.fromEntries(response.headers.entries());
        const body = response.body ? await response.text() : undefined;

        return { headers, status, statusText, body };
      },
    },
    onLoad,
    isResizable,
    height,
  });

  return (
    <div
      css={css`
        position: relative;
        ${isResizable ? '' : `height: ${height};`}
        width: ${width};
      `}
    >
      {navigation.getModalJsx()}
      {(loading || threeLOInfo) && (
        <Suspense fallback={null}>
          <div
            css={css`
              width: 100%;
              height: 100%;
            `}
          >
            {loading &&
              !threeLOInfo &&
              (loadingComponent ? loadingComponent : <Loader />)}
            {threeLOInfo &&
              ThreeLOPrompt({
                authUrl: threeLOInfo.authUrl,
                onSuccess: threeLOInfo.onSuccess,
              })}
          </div>
        </Suspense>
      )}
      {!userConsentRequired && (
        <iframe
          data-testid="hosted-resources-iframe"
          css={css`
            border: none;
            display: ${loading || threeLOInfo ? 'none' : 'initial'};
            width: 100%;
            ${isResizable ? '' : 'height: 100%;'}
          `}
          sandbox="allow-downloads allow-forms allow-modals allow-same-origin allow-scripts"
          allow="camera; microphone"
          src={src}
          {...iframeProps}
        />
      )}
    </div>
  );
};

export const Iframe = ({
  accountId,
  extension,
  contextIds,
  apolloClient,
  components,
  coreData,
  extensionData,
  loadingComponent,
  onLoad,
  height = '100%',
  width = '100%',
  bridge,
  egressConsentFlowEnabled = false,
  isResizable = false,
  entryPoint,
}: Props) => {
  const isSupportedBrowser = useMemo(
    () => getIsSupportedBrowser(window.navigator.userAgent),
    [],
  );
  const environment = useContext(EnvironmentContext);

  const ari = parse(extension.id);
  const [appId, , , moduleKey] = ari.resourceId!.split('/');

  const extensionEntryPoint = getExtensionEntryPoint(extension, entryPoint);

  const defaultSrc = useMemo(
    () =>
      createSrcFromExtension(
        appId,
        extension,
        environment,
        extensionEntryPoint,
      ),
    [appId, extension, environment, extensionEntryPoint],
  );

  const { tunnels, loading } = useCustomUITunnelsList({
    client: apolloClient,
    appId,
    environmentId: extension.environmentId,
    environmentType: extension.environmentType,
  });

  const { createAnalyticsEvent } = useAnalyticsEvents();
  useEffect(() => {
    createAnalyticsEvent({
      eventType: UI_EVENT_TYPE,
      data: {
        action: 'viewed',
        actionSubject: 'forgeUIExtension',
        attributes: {
          isCustomUI: true,
        },
      },
    }).fire(FORGE_UI_ANALYTICS_CHANNEL);
  }, [createAnalyticsEvent]);

  if (!isSupportedBrowser) {
    return <UnsupportedBrowserMessage extension={extension} />;
  }

  const coreDataInner = {
    ...coreData,
    moduleKey,
  };

  const resizingEnabled = isResizable && !extension.properties.viewportSize;

  return (
    <div
      data-testid="hosted-resources-iframe-container"
      css={css`
        position: relative;
        min-height: ${height};
        ${resizingEnabled ? '' : `height: ${height};`}
        width: ${width};
      `}
    >
      {loading && (
        <Suspense fallback={null}>
          <div
            css={css`
              position: absolute;
              top: 0px;
              left: 0px;
              width: 100%;
              height: 100%;
            `}
          >
            {loading && (loadingComponent ? loadingComponent : <Loader />)}
          </div>
        </Suspense>
      )}
      {!loading && (
        <ReloadOnContextChangeWrapper
          context={getViewContext(
            getResolverContext(coreDataInner, extensionData),
            accountId,
            extension,
          )}
        >
          <IFrameComponent
            accountId={accountId}
            extension={extension}
            contextIds={contextIds}
            apolloClient={apolloClient}
            components={components}
            coreData={coreDataInner}
            extensionData={extensionData}
            loadingComponent={loadingComponent}
            onLoad={onLoad}
            height={height}
            width={width}
            src={getSrcUrl(tunnels, extensionEntryPoint, defaultSrc)}
            bridge={bridge}
            egressConsentFlowEnabled={egressConsentFlowEnabled}
            isResizable={resizingEnabled}
          />
        </ReloadOnContextChangeWrapper>
      )}
    </div>
  );
};

const UnsupportedBrowserMessage = ({ extension }: Pick<Props, 'extension'>) => {
  const extensionName = extension.properties.title;
  const errorMessage = extensionName
    ? `Cannot render "${extensionName}"`
    : 'Cannot render extension';

  // TODO: Change 'compatible version' to be a link to DAC page of supported browsers
  return (
    <SectionMessage appearance="warning" title={errorMessage}>
      Your browser version isn't compatible. We recommend upgrading to a
      compatible version.
    </SectionMessage>
  );
};
