import React, { useMemo } from 'react';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { Disclosure } from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { CircularProgress } from '../circular-progress';

import { QuickViewDetails } from './quick-view-details';
import { ScorecardQuickViewProps } from './types';

const ScorecardQuickView = ({
  scorecard,
  expanded,
  onScorecardFullViewOpen,
  testId,
  componentId,
}: ScorecardQuickViewProps) => {
  const { formatMessage } = useIntl();

  const progress = Math.floor(
    (scorecard.scorecardScore.totalScore /
      scorecard.scorecardScore.maxTotalScore) *
      100,
  );

  const icon = useMemo(() => <CircularProgress progress={progress} />, [
    progress,
  ]);

  return (
    <Disclosure expanded={expanded} testId={testId}>
      <Disclosure.ExpandingCard
        heading={scorecard.name}
        secondaryText={formatMessage(CommonMessages.scorecard)}
        icon={icon}
        details={() => (
          <QuickViewDetails
            testId={testId}
            componentId={componentId}
            scorecardId={scorecard.id}
            scorecardName={scorecard.name}
            scorecardImportance={scorecard.importance}
            criterias={scorecard.criterias}
            onScorecardFullViewOpen={onScorecardFullViewOpen}
          />
        )}
        onToggle={(
          e,
          analyticsEvent: UIAnalyticsEvent,
          isExpanded: boolean,
        ) => {
          // Only fire the event if QuickView was expanded
          if (isExpanded) {
            fireUIAnalytics(analyticsEvent, 'scorecardExpand', {
              componentId: componentId,
              componentType: scorecard.componentType.toString(),
              scorecardName: scorecard.name,
              scorecardScore: scorecard.scorecardScore.totalScore,
            });
          }
        }}
      />
    </Disclosure>
  );
};

export default ScorecardQuickView;
