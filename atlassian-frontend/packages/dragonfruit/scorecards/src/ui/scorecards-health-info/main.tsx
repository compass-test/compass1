import React, { useState } from 'react';

import { di } from 'react-magnetic-di';
import { Link } from 'react-resource-router';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button, { LoadingButton } from '@atlaskit/button';
import InlineDialog from '@atlaskit/inline-dialog';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { CompassComponent } from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ScorecardFullView } from '../../common/ui/scorecard-full-view';
import { useGetComponentScorecardsWithScores } from '../../services/get-component-scorecards-with-scores';

import { ScorecardHealthIcon, ScorecardsHealthIcon } from './icons';
import messages from './messages';
import {
  ButtonWrapper,
  ContentWrapper,
  Divider,
  LinkWrapper,
  NoScorecards,
  Scorecard,
  ScorecardButtonWrapper,
  ScorecardName,
  Scorecards,
  ScorecardScore,
  Summary,
} from './styled';
import { ContentProps, ScorecardsHealthInfoProps } from './types';
import {
  getScorecardsSortedByHealth,
  getUnHealthyScorecardsCount,
} from './utils';

const TESTID_PREFIX = 'dragonfruit-scorecards.ui.scorecards-health-info';
const NUMBER_OF_SCORECARDS_TO_DISPLAY = 5;

function Content({
  testId = 'inline-dialog-content',
  componentId,
  summary,
  scorecards,
  onScorecardFullViewOpen,
}: ContentProps) {
  const { formatMessage } = useIntl();

  const scorecardsSortedByHealth = getScorecardsSortedByHealth(scorecards);

  return (
    <ContentWrapper>
      <Summary>{summary}</Summary>

      <Divider />

      <Scorecards>
        {scorecardsSortedByHealth
          .slice(0, NUMBER_OF_SCORECARDS_TO_DISPLAY)
          .map((scorecard, i) => {
            const totalScore = scorecard?.scorecardScore?.totalScore ?? 0;

            return (
              <React.Fragment key={scorecard.id}>
                <Scorecard data-testid={`${testId}-scorecard-${i}`}>
                  <ScorecardHealthIcon progress={totalScore} />
                  <ScorecardName>
                    <ScorecardButtonWrapper>
                      <Button
                        appearance="subtle-link"
                        spacing="compact"
                        onClick={() => onScorecardFullViewOpen(scorecard.id)}
                      >
                        {scorecard.name}
                      </Button>
                    </ScorecardButtonWrapper>
                  </ScorecardName>
                  <ScorecardScore>{totalScore}%</ScorecardScore>
                </Scorecard>
              </React.Fragment>
            );
          })}
      </Scorecards>

      {/*
        Display x more link, only when there are more than NUMBER_OF_SCORECARDS_TO_DISPLAY
      */}
      {scorecards.length > NUMBER_OF_SCORECARDS_TO_DISPLAY && (
        <LinkWrapper data-testid={`${testId}-more-link`}>
          <Link to={routes.COMPONENT_DETAILS(componentId)}>
            {formatMessage(messages.moreScorecards, {
              moreScorecardsCount:
                scorecards.length - NUMBER_OF_SCORECARDS_TO_DISPLAY,
            })}
          </Link>
        </LinkWrapper>
      )}
    </ContentWrapper>
  );
}

function ScorecardsHealthInfo({
  testId = TESTID_PREFIX,
  componentId,
}: ScorecardsHealthInfoProps) {
  di(useGetComponentScorecardsWithScores);

  const { formatMessage } = useIntl();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);

    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'button',
    });

    fireUIAnalytics(event, 'scorecardsHealthInfo', {
      componentId: componentId,
      summary: summary,
    });
  };

  // to keep track of the current scorecard name clicked which will be used to
  // conditionally display the ScorecardFullViewModal
  const [currentScorecardId, setCurrentScorecardId] = useState<string>('');
  const onScorecardFullViewOpen = (scorecardId: string) => {
    setCurrentScorecardId(scorecardId);

    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'button',
    });

    fireUIAnalytics(event, 'scorecardFullView', {
      componentId: componentId,
      scorecardId: scorecardId,
    });
  };
  const onScorecardFullViewClose = () => {
    setCurrentScorecardId('');
  };

  const { data, error, loading } = useGetComponentScorecardsWithScores(
    componentId,
  );

  if (loading) {
    return (
      <LoadingButton appearance="subtle" isLoading testId={`${testId}-loading`}>
        {formatMessage(CommonMessages.loadingWithEllipsis)}
      </LoadingButton>
    );
  }

  if (error) {
    return <div data-testid={`${testId}-error`} />;
  }

  const component = data?.compass?.component as CompassComponent;
  const componentName = component?.name;
  const scorecards = component?.scorecards || [];

  if (scorecards.length === 0) {
    return (
      <NoScorecards data-testid={`${testId}-no-scorecards`}>
        {formatMessage(messages.noScorecards)}
      </NoScorecards>
    );
  }

  const unHealthyScorecardsCount = getUnHealthyScorecardsCount(scorecards);
  const totalScorecardsCount = scorecards.length;
  const summary =
    unHealthyScorecardsCount > 0
      ? formatMessage(messages.summaryTextForUnhealthy, {
          unHealthyScorecardsCount: unHealthyScorecardsCount,
          totalScorecardsCount: totalScorecardsCount,
        })
      : formatMessage(messages.summaryTextForHealthy, {
          totalScorecardsCount: totalScorecardsCount,
        });

  return (
    <>
      <InlineDialog
        testId={`${testId}-scorecards`}
        onClose={closeDialog}
        content={
          <Content
            testId={`${testId}-inline-dialog-content`}
            componentId={componentId}
            summary={summary}
            scorecards={scorecards}
            onScorecardFullViewOpen={onScorecardFullViewOpen}
          />
        }
        isOpen={isDialogOpen}
      >
        <ButtonWrapper>
          <Button
            testId={`${testId}-scorecards-summary`}
            iconBefore={<ScorecardsHealthIcon scorecards={scorecards} />}
            appearance="subtle-link"
            spacing="compact"
            isSelected={false}
            onClick={toggleDialog}
          >
            {unHealthyScorecardsCount > 0
              ? formatMessage(messages.summaryTextForUnhealthyCompact, {
                  unHealthyScorecardsCount: unHealthyScorecardsCount,
                  totalScorecardsCount: totalScorecardsCount,
                })
              : formatMessage(messages.summaryTextForHealthyCompact, {
                  totalScorecardsCount: totalScorecardsCount,
                })}
          </Button>
        </ButtonWrapper>
      </InlineDialog>

      {!!currentScorecardId && (
        <ScorecardFullView
          key={currentScorecardId}
          componentId={componentId}
          componentName={componentName}
          scorecardId={currentScorecardId}
          onClose={onScorecardFullViewClose}
        />
      )}
    </>
  );
}

const ErrorBoundary = () => {
  return <div data-testid={`${TESTID_PREFIX}-error-boundary`} />;
};

export default withErrorBoundary(ScorecardsHealthInfo, {
  componentName: 'ScorecardsHealthInfo',
  Fallback: ErrorBoundary,
});
