import React from 'react';

import EmptyState from '@atlaskit/empty-state';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import { useIntl } from '@atlassian/dragonfruit-utils';

export function ListViewErrorBoundaryFallback() {
  const { formatMessage } = useIntl();

  return (
    <EmptyState
      header={formatMessage(CommonMessages.somethingWentWrongFullStop)}
      imageUrl={ErrorIcon}
    />
  );
}
