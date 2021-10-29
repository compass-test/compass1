import React, { useCallback, useEffect, useMemo } from 'react';

import { useAggClient } from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import {
  ForgeUIExtensionAnalyticsContext,
  RendererNext,
  useWebRuntime,
} from '@atlassian/forge-ui';
import {
  CompassAdminPageExtensionContext,
  CompassComponentPageExtensionContext,
  CompassContextTypes,
} from '@atlassian/forge-ui-types';

export function ExtensionPoint(
  extensionId: string,
  extensionData?:
    | CompassComponentPageExtensionContext
    | CompassAdminPageExtensionContext,
) {
  const client = useAggClient();
  const { cloudId } = useTenantInfo();

  const webRuntimeProps = {
    apolloClient: client,
    contextIds: [`ari:cloud:compass::site/${cloudId}`],
    extensionId: extensionId,
    coreData: { localId: extensionId, cloudId },
    temporaryContext: {
      extensionContext: JSON.stringify({ ...extensionData }),
    },
  };

  const [dispatch, { forgeDoc, error, loading }] = useWebRuntime(
    // @ts-ignore apollo client is incompatible
    webRuntimeProps,
  );

  const dispatchWithData = useCallback(
    (effect) => {
      return dispatch({
        ...effect,
        extensionData: {
          ...extensionData,
        },
      });
    },
    [dispatch, extensionData],
  );

  useEffect(() => {
    dispatchWithData({ type: 'render' });
  }, [dispatchWithData]);

  return (
    <ForgeUIExtensionAnalyticsContext
      localId={extensionId}
      extensionId={extensionId}
    >
      <RendererNext
        forgeDoc={forgeDoc}
        loading={loading}
        error={error}
        dispatch={dispatchWithData}
      />
    </ForgeUIExtensionAnalyticsContext>
  );
}

type AdminPageExtensionPointProps = {
  extensionId: string;
  url: string;
};

function makeAdminPageContext(url: string): CompassAdminPageExtensionContext {
  return {
    type: CompassContextTypes.AdminPage,
    url: url,
  };
}

function makeComponentPageContext(
  componentId: string,
): CompassComponentPageExtensionContext {
  return {
    type: CompassContextTypes.ComponentPage,
    componentId: componentId,
  };
}

export function AdminPageExtensionPoint(props: AdminPageExtensionPointProps) {
  const { extensionId, url } = props;

  const extensionData = useMemo(() => makeAdminPageContext(url), [url]);

  return ExtensionPoint(extensionId, extensionData);
}

type ComponentPageProps = {
  extensionId: string;
  componentId: string;
};

export function ComponentPageExtensionPoint(props: ComponentPageProps) {
  const { extensionId, componentId } = props;

  const extensionData = useMemo(() => makeComponentPageContext(componentId), [
    componentId,
  ]);

  return ExtensionPoint(extensionId, extensionData);
}
