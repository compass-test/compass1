/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useEffect, useRef, useState, Suspense, useCallback } from 'react';
import {
  AnalyticsWebClient,
  EnvironmentContext,
  ForgeErrorBoundary,
  RendererNext,
  makeAvatar,
  makeAvatarStack,
  makeUserPicker,
  useWebRuntime,
  Extension,
} from '@atlassian/forge-ui';
import {
  makeThreeLOPrompt,
  AkButton,
  useButton,
  RenderFn,
} from '@atlassian/forge-ui';
import { Iframe, getModalDimensions } from '@atlassian/forge-ui/iframe';
import { ForgeUIExtensionPointProvider } from '@atlassian/forge-ui/provider';
import {
  ExtensionConfiguration,
  ProductEnvironment,
  DispatchEffect,
  LegacyForgeContext,
  ForgeUIExtensionType,
  CoreData,
  ExtensionData,
} from '@atlassian/forge-ui-types';
import { ExtensionParams } from '@atlaskit/editor-common';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { MentionProvider } from '@atlaskit/mention';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import { getConfig } from './getForgeExtensionProviderNext';
import { ForgeUIExtensionAnalyticsContext } from '@atlassian/forge-ui';
import ApolloClient from 'apollo-client';
import { N0, N30A, N60A } from '@atlaskit/theme/colors';
import { gridSize, borderRadius } from '@atlaskit/theme/constants';
import deepEqual from 'fast-deep-equal';

export type ForgeExtensionParameters = {
  localId: string;
  extensionId: string;
  extension?: ForgeUIExtensionType;
  extensionTitle?: string;
  config?: ExtensionConfiguration;
  guestParams?: ExtensionConfiguration;
};

export type ForgeExtension = ExtensionParams<ForgeExtensionParameters>;

const APP_CONTAINER_PADDING = gridSize();

export interface ForgeUIExtensionWrapperProps {
  analyticsWebClient: AnalyticsWebClient | Promise<AnalyticsWebClient>;
  environment: ProductEnvironment;
  product: string;
  page: string;
  accountId: string;
  cloudId: string;
  apolloClient: ApolloClient<object>;
  contextIds: string[];
  extensionData: Record<string, any>;
  temporaryContext?: LegacyForgeContext;
  dataProviders: ProviderFactory;
  extension: ForgeExtension;
  isEditing: boolean;
  egressConsentFlowEnabled: boolean;
}
export interface ForgeExtensionProps {
  extension: ForgeExtension;
  config?: ExtensionConfiguration;
}

interface IframeRendererProps {
  accountId: string;
  apolloClient: ApolloClient<object>;
  contextIds: string[];
  environment: ProductEnvironment;
  extension: Extension;
  coreData: CoreData;
  extensionData: ExtensionData;
  egressConsentFlowEnabled: boolean;
}

interface CustomUIBridge {
  onClose?: (payload?: any) => boolean | undefined;
}

type ModalIframeRendererProps = IframeRendererProps & {
  size?: ModalOptions['size'];
  onTearDown?: () => void;
  bridge?: CustomUIBridge;
};

interface ModalOptions {
  resource?: string | null;
  onClose?: (payload: any) => any;
  size?: 'small' | 'medium' | 'large';
  context?: any;
}

interface ModalState {
  isOpen: boolean;
  opts: ModalOptions;
}

export function ButtonWithBackground(props: Parameters<RenderFn>[0]) {
  const { akButtonProps } = useButton(props);
  return (
    <div
      // The button background is needed to prevent any coloured
      // background behind an app from showing through the button.
      css={css`
        background-color: white;
        width: ${akButtonProps.shouldFitContainer ? '100%' : 'max-content'};
        border-radius: 3px;
      `}
    >
      <AkButton {...akButtonProps} />
    </div>
  );
}

function useMemoedExtensionData(
  extensionData: Record<string, any>,
): Record<string, any> {
  const ref = useRef(extensionData);
  if (!deepEqual(ref.current, extensionData)) {
    ref.current = extensionData;
  }
  return ref.current;
}

// a lot of ceremony to get a Promise<MentionProvider> from a ProviderFactory
function useMentionProvider(dataProviders: ProviderFactory) {
  const mentionPromiseState = useRef({
    done: false,
    resolve: (_: MentionProvider) => {},
  });
  const [mentionProvider, setMentionProvider] = useState<
    Promise<MentionProvider>
  >(
    new Promise((res) => {
      mentionPromiseState.current.resolve = res;
    }),
  );
  useEffect(() => {
    const providerHandler = (
      _: any,
      provider: Promise<MentionProvider> | undefined,
    ) => {
      if (provider) {
        if (!mentionPromiseState.current.done) {
          mentionPromiseState.current.done = true;
          provider.then(mentionPromiseState.current.resolve);
        } else {
          setMentionProvider(provider);
        }
      }
    };
    dataProviders.subscribe('mentionsProvider', providerHandler);
    return () => dataProviders.unsubscribe('mentionsProvider', providerHandler);
  }, [dataProviders]);
  return mentionProvider;
}

const IframeRenderer = (props: IframeRendererProps) => {
  type ViewportSizeType = 'small' | 'medium' | 'large' | 'xlarge';
  type ViewportSizeTypeWithDefault = ViewportSizeType | 'default';
  type ViewportSizeObjectType = {
    [size in ViewportSizeTypeWithDefault]: string;
  };

  const macroHeights: ViewportSizeObjectType = {
    small: '112px',
    medium: '262px',
    default: '262px',
    large: '524px',
    xlarge: '1048px',
  };

  const calculateHeight = (size?: ViewportSizeType) => {
    return macroHeights[size ?? 'default'];
  };

  const { environment, extension, extensionData } = props;
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    opts: {},
  });

  return (
    <EnvironmentContext.Provider value={environment}>
      <Iframe
        {...props}
        bridge={{
          openModal: (opts: any) => {
            setModalState({ isOpen: true, opts: opts.data });
            return true;
          },
        }}
        height={
          extension.properties.viewportSize
            ? calculateHeight(extension.properties.viewportSize)
            : undefined
        }
        isResizable={true}
      />
      {modalState.isOpen && (
        <ModalIframeRenderer
          {...props}
          extension={{
            ...extension,
            type: 'dynamic-modal',
            properties: {
              ...extension.properties,
              resource:
                modalState.opts.resource ?? extension.properties.resource,
            },
          }}
          extensionData={{
            ...extensionData,
            ...(modalState.opts.context
              ? { modal: modalState.opts.context }
              : {}),
          }}
          onTearDown={() => {
            setModalState((prevState: ModalState) => ({
              ...prevState,
              isOpen: false,
            }));
          }}
          bridge={{
            onClose: modalState.opts.onClose,
          }}
          size={modalState.opts.size}
        />
      )}
    </EnvironmentContext.Provider>
  );
};

const ModalIframeRenderer = ({
  size,
  onTearDown,
  bridge,
  extension,
  ...props
}: ModalIframeRendererProps) => {
  const [isOpen, setOpen] = useState(true);

  const modalSize = size ?? extension.properties.viewportSize ?? 'medium';
  const { height, minHeight } = getModalDimensions(modalSize);
  const akModalSize = modalSize === 'xlarge' ? 'x-large' : modalSize;

  return (
    <ModalTransition>
      {isOpen && (
        <Modal
          width={akModalSize}
          onClose={() => {
            if (bridge?.onClose) {
              bridge.onClose();
            }
            setOpen(false);
          }}
          onCloseComplete={onTearDown}
          testId="custom-ui-modal-dialog"
        >
          <div
            css={css`
              height: ${height};
              min-height: ${minHeight ?? height};
              background: ${N0};
              border-radius: ${borderRadius()}px;
              iframe {
                box-shadow: 0 0 0 1px ${N30A}, 0 2px 1px ${N30A},
                  0 0 20px -6px ${N60A};
                border-radius: ${borderRadius()}px;
                height: 100%;
              }
            `}
          >
            <Iframe
              {...props}
              extension={extension}
              bridge={{
                ...bridge,
                close: (payload?: any) => {
                  if (bridge?.onClose) {
                    bridge.onClose(payload?.data);
                  }
                  setOpen(false);
                  return true;
                },
              }}
              isResizable={false}
            />
          </div>
        </Modal>
      )}
    </ModalTransition>
  );
};

const ForgeUIExtensionWrapper = ({
  apolloClient,
  contextIds,
  cloudId,
  environment,
  extensionData,
  temporaryContext,
  accountId,
  dataProviders,
  extension,
  isEditing,
  egressConsentFlowEnabled,
}: ForgeUIExtensionWrapperProps) => {
  const {
    localId,
    extension: gqlExtension,
    extensionId,
    extensionTitle,
    // If `parameters` is missing, we'll let that bubble up to the extension's error boundary.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = extension.parameters!;
  const config = getConfig(extension.parameters!);

  const isHostedResource = Boolean(gqlExtension?.properties?.resource);

  const coreData = { localId, cloudId };

  const memoedExtensionData = useMemoedExtensionData(extensionData);

  const [dispatch, { forgeDoc, error, loading }] = useWebRuntime({
    apolloClient,
    contextIds,
    extensionId,
    coreData,
    temporaryContext: {
      ...temporaryContext,
      config,
      isConfig: false,
    },
  });

  const curriedDispatch = useCallback(
    (effect: DispatchEffect) => {
      return dispatch({
        ...effect,
        extensionData: {
          ...effect.extensionData,
          ...memoedExtensionData,
          config,
          isConfig: false,
        },
      });
    },
    [dispatch, config, memoedExtensionData],
  );

  useEffect(() => {
    if (!isHostedResource) {
      curriedDispatch({
        type: 'render',
        extensionData: {},
      });
    }
  }, [curriedDispatch, isHostedResource]);

  const mentionProvider = useMentionProvider(dataProviders);

  return (
    <div
      data-testid="ForgeExtensionContainer"
      css={css`
        background: ${isEditing ? 'white' : 'transparent'};
        padding: ${isEditing ? `${APP_CONTAINER_PADDING}px` : 0};
        position: relative;
      `}
    >
      {isHostedResource ? (
        <IframeRenderer
          accountId={accountId}
          apolloClient={apolloClient}
          contextIds={contextIds}
          environment={environment}
          extension={
            // null-checked via isHostedResource
            // TODO sort out ForgeUIExtension/GQLExtension type differences
            gqlExtension as Parameters<typeof Iframe>[0]['extension']
          }
          coreData={coreData}
          extensionData={{
            ...extensionData,
            config,
          }}
          egressConsentFlowEnabled={egressConsentFlowEnabled}
        />
      ) : (
        <RendererNext
          forgeDoc={forgeDoc}
          loading={loading}
          error={error}
          dispatch={curriedDispatch}
          components={(defaultComponents) => ({
            ...defaultComponents,
            Button: (args) => <ButtonWithBackground {...args} />,
            Avatar: makeAvatar({ client: apolloClient }),
            AvatarStack: makeAvatarStack({ client: apolloClient }),
            ThreeLOPrompt: makeThreeLOPrompt({ appName: extensionTitle }),
            UserPicker: makeUserPicker({
              client: apolloClient,
              mentionProvider: mentionProvider,
              accountId: accountId,
              cloudId: cloudId,
              productKey: 'confluence',
            }),
          })}
        />
      )}
      {isEditing && (
        <div
          data-testid="GlassPane"
          css={css`
            background: transparent;
            cursor: not-allowed;
            left: 0;
            position: absolute;
            height: 100%;
            top: 0;
            width: 100%;
            z-index: 1;
          `}
        />
      )}
    </div>
  );
};

const ForgeUIExtensionWrapperWithBoundary = (
  props: ForgeUIExtensionWrapperProps,
) => {
  const { extension, product, environment, page, analyticsWebClient } = props;

  const children = (
    <ForgeErrorBoundary>
      <ForgeUIExtensionWrapper {...props} />
    </ForgeErrorBoundary>
  );

  return (
    // This Suspense fallback is for the ForgeErrorBoundary
    <Suspense fallback={null}>
      <ForgeUIExtensionPointProvider
        analyticsWebClient={analyticsWebClient}
        product={product}
        environment={environment}
        page={page}
      >
        {extension.parameters ? (
          <ForgeUIExtensionAnalyticsContext
            localId={extension.parameters.localId}
            extensionId={extension.parameters.extensionId}
          >
            {children}
          </ForgeUIExtensionAnalyticsContext>
        ) : (
          children
        )}
      </ForgeUIExtensionPointProvider>
    </Suspense>
  );
};

export default ForgeUIExtensionWrapperWithBoundary;
