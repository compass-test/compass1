import React from 'react';

import Button from '@atlaskit/button';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  EmptyStateBody,
  EmptyStateContainer,
  EmptyStateImage,
  EmptyStateTitle,
} from '../../../styled';

import messages from './messages';

type Props = {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
};

export default function NoCriteria({ testId }: Props) {
  const { formatMessage } = useIntl();

  return (
    <EmptyStateContainer data-testid={testId ?? 'no-criteria'}>
      <EmptyStateTitle>{formatMessage(messages.title)}</EmptyStateTitle>

      <EmptyStateImage src={ErrorIcon} data-testid="error-image" />

      <EmptyStateBody>{formatMessage(messages.body)}</EmptyStateBody>

      <Button
        shouldFitContainer
        appearance="default"
        href={routes.SCORECARD_LIST()}
        testId="dragonfruit-scorecards.ui.scorecard-quick-view.quick-view-details.no-criteria.callToAction-button"
      >
        {formatMessage(messages.callToActionText)}
      </Button>
    </EmptyStateContainer>
  );
}
