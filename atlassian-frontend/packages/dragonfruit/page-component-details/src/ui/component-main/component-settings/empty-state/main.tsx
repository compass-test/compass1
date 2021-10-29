import React from 'react';

import { useRouterActions } from 'react-resource-router';

import Button from '@atlaskit/button';
import EmptyState from '@atlaskit/empty-state';
import SectionMessage from '@atlaskit/section-message';
import { CONFIG_AS_CODE_DAC_LINK } from '@atlassian/dragonfruit-external-component-management/constants';
import { routes } from '@atlassian/dragonfruit-routes';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { default as Network } from '../../../../common/assets/Network.svg';

import messages from './messages';
import { NonAdminInfoContainer } from './styled';

export const ComponentSettingsEmptyState = () => {
  const { formatMessage } = useIntl();
  const { push } = useRouterActions();
  const { isAdmin: isAdministrator } = useTenantInfo();
  const isAdmin = isAdministrator();

  const adminButton = (
    <Button onClick={() => push(routes.APPS())} appearance="primary">
      {formatMessage(messages.installSCMPrompt)}
    </Button>
  );

  const userSectionMessage = (
    <NonAdminInfoContainer>
      <SectionMessage title={formatMessage(messages.sectionMessageHeading)}>
        <div>{formatMessage(messages.sectionMessageDescription)}</div>
      </SectionMessage>
    </NonAdminInfoContainer>
  );

  return (
    <>
      <EmptyState
        testId="dragonfruit-page-component-details.ui.settings.empty-state"
        header={formatMessage(messages.emptyStateHeading)}
        description={
          <>
            {formatMessage(messages.emptyStateDescription)}{' '}
            <a href={CONFIG_AS_CODE_DAC_LINK} target="_blank" rel="noopener">
              {formatMessage(messages.learnMore)}
            </a>
          </>
        }
        imageUrl={Network}
        primaryAction={isAdmin ? adminButton : undefined}
      />
      {!isAdmin && userSectionMessage}
    </>
  );
};
