import React from 'react';

import Button from '@atlaskit/button';
import EmptyState from '@atlaskit/empty-state';
import { Content, Main } from '@atlaskit/page-layout';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import { useIntl } from '@atlassian/dragonfruit-utils';

export function ErrorPage() {
  const { formatMessage } = useIntl();

  return (
    <Content>
      <Main>
        <EmptyState
          imageUrl={ErrorIcon}
          header={formatMessage(CommonMessages.somethingWentWrongFullStop)}
          primaryAction={
            <Button appearance="primary" onClick={() => location.reload()}>
              {formatMessage(CommonMessages.reload)}
            </Button>
          }
        />
      </Main>
    </Content>
  );
}

/**
 * This is a duplicate of the ErrorPage without the dependency on useIntl.
 * We wrap the App in this component as our final error boundary, it cannot
 * use useIntl as the IntlProvider won't exist at this level.
 *
 * There are many other layers that should catch an error before we get to this.
 */
export function FallbackErrorPage() {
  return (
    <EmptyState
      imageUrl={ErrorIcon}
      header="Error" // Copied from CommonMessages.error
      description="Something went wrong. Please try again." // Copied from CommonMessages.somethingWentWrongPleaseTryAgainFullStop
      primaryAction={
        <Button appearance="primary" onClick={() => location.reload()}>
          {/* Copied from CommonMessages.reload */}
          Reload
        </Button>
      }
    />
  );
}
