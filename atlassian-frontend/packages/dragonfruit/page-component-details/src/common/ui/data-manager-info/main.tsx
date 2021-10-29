import React from 'react';

import { FormattedMessage } from 'react-intl';

import ErrorIcon from '@atlaskit/icon/glyph/error';
import { CONFIG_AS_CODE_FILE_NAME } from '@atlassian/dragonfruit-external-component-management/constants';
import { useGetAppByEcosystemId } from '@atlassian/dragonfruit-forge';
import {
  CompassComponent,
  CompassComponentDataManager,
  ComponentSyncEventStatus,
} from '@atlassian/dragonfruit-graphql';
import {
  ComponentDetailPageUrlParam,
  routes,
} from '@atlassian/dragonfruit-routes';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';

import messages from './messages';
import { ErrorLink, ErrorTextWrapper, TextWrapper } from './styled';

interface Props {
  componentId: CompassComponent['id'];
  dataManager: CompassComponentDataManager;
  canDisplayErrors?: boolean;
}

const DataManagerInfo: React.FC<Props> = ({
  componentId,
  dataManager,
  canDisplayErrors,
}) => {
  const { cloudId } = useTenantInfo();
  const { ecosystemAppId, lastSyncEvent } = dataManager;
  const { data } = useGetAppByEcosystemId(cloudId, ecosystemAppId);

  const syncedMessage = (
    <TextWrapper
      href={routes.COMPONENT_DETAILS(
        componentId,
        ComponentDetailPageUrlParam.SETTINGS,
      )}
      data-testid="component-header.data-manager-info"
    >
      <FormattedMessage
        {...messages.appInfo}
        values={{
          configAsCodeFileName: CONFIG_AS_CODE_FILE_NAME,
          forgeAppName: data?.metadata?.name,
        }}
      />
    </TextWrapper>
  );

  const errorMessage = (
    <ErrorTextWrapper>
      <ErrorIcon label={'error'} size={'small'} />
      <ErrorLink
        href={routes.COMPONENT_DETAILS(
          componentId,
          ComponentDetailPageUrlParam.SETTINGS,
        )}
        data-testid={'component-header.data-manager-error'}
      >
        <FormattedMessage
          {...messages.syncFailed}
          values={{ configAsCodeFileName: CONFIG_AS_CODE_FILE_NAME }}
        />
      </ErrorLink>
    </ErrorTextWrapper>
  );

  const hasError =
    lastSyncEvent && lastSyncEvent.status !== ComponentSyncEventStatus.SUCCESS;

  return (
    <>{data && (hasError && canDisplayErrors ? errorMessage : syncedMessage)}</>
  );
};

export default DataManagerInfo;
