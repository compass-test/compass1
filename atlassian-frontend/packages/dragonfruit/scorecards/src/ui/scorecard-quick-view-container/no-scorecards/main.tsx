import React from 'react';

import Button from '@atlaskit/button';
import { Card, CardBody } from '@atlassian/dragonfruit-common-ui';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  EmptyStateBody,
  EmptyStateContainer,
  EmptyStateTitle,
} from '../../../common/ui/styled';

import messages from './messages';

type Props = {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
};

export default function NoScorecards({ testId }: Props) {
  const { formatMessage } = useIntl();

  return (
    <Card>
      <CardBody>
        <EmptyStateContainer data-testid={testId ?? 'no-scorecards'}>
          <EmptyStateTitle>{formatMessage(messages.title)}</EmptyStateTitle>

          <EmptyStateBody>{formatMessage(messages.body)}</EmptyStateBody>
          <Button
            shouldFitContainer
            appearance="default"
            href={routes.SCORECARD_LIST()}
            testId="page-scorecard-templates.ui.scorecard-summary.edit-button"
          >
            {formatMessage(messages.callToActionText)}
          </Button>
        </EmptyStateContainer>
      </CardBody>
    </Card>
  );
}
