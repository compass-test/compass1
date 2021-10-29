import React from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { useModalControls } from '@atlassian/dragonfruit-common-ui';
import { CompassScorecardImportance } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { RemoveScorecardModal } from '../../../../ui/remove-scorecard-modal';
import Criterias from '../../criterias';

import messages from './messages';
import { NoCriteria } from './no-criteria';
import { Actions, ButtonGroup } from './styled';
import { QuickViewDetailsProps } from './types';

export const QuickViewDetails: React.FC<QuickViewDetailsProps> = ({
  testId,
  componentId,
  scorecardId,
  scorecardName,
  scorecardImportance,
  criterias = [],
  onScorecardFullViewOpen,
}: QuickViewDetailsProps) => {
  const { formatMessage } = useIntl();

  const [
    { isOpen: isRemoveScorecardModalOpen },
    { open, close: closeRemoveScorecardModal },
  ] = useModalControls();

  const { createAnalyticsEvent } = useAnalyticsEvents();

  const openRemoveScorecardModal = () => {
    open();

    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'button',
    });

    fireUIAnalytics(event, 'removeScorecard', {
      componentId: componentId,
      scorecardId: scorecardId,
      scorecardName: scorecardName,
      scorecardImportance: scorecardImportance.toString(),
    });
  };

  // Only show the `Remove` button for non required scorecards
  const showRemoveScorecardButton =
    scorecardImportance.toLowerCase() !==
    CompassScorecardImportance.REQUIRED.toLowerCase();

  if (criterias.length === 0) {
    return <NoCriteria />;
  }

  const detailsTestId = testId && `${testId}.details`;
  return (
    <>
      <div data-testid={detailsTestId}>
        <Criterias criterias={criterias} testId={testId} showWeight={false} />

        <Actions>
          <ButtonGroup>
            {showRemoveScorecardButton && (
              <Button
                testId="quick-view-details-remove-button"
                shouldFitContainer
                onClick={openRemoveScorecardModal}
              >
                {formatMessage(CommonMessages.remove)}
              </Button>
            )}

            <Button
              testId="quick-view-details-view-scorecard-button"
              shouldFitContainer
              onClick={() => onScorecardFullViewOpen(scorecardId)}
            >
              {showRemoveScorecardButton
                ? formatMessage(CommonMessages.view)
                : formatMessage(messages.viewScorecard)}
            </Button>
          </ButtonGroup>
        </Actions>
      </div>

      {isRemoveScorecardModalOpen && (
        <RemoveScorecardModal
          onCancel={closeRemoveScorecardModal}
          onClose={closeRemoveScorecardModal}
          componentId={componentId}
          scorecardId={scorecardId}
          scorecardName={scorecardName}
        />
      )}
    </>
  );
};
