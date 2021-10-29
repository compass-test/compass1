import React, { useState } from 'react';

import { di } from 'react-magnetic-di';

import { CompassComponent } from '@atlassian/dragonfruit-graphql';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import Loading from '../../common/ui/loading';
import { ScorecardFullView } from '../../common/ui/scorecard-full-view';
import { ScorecardQuickView } from '../../common/ui/scorecard-quick-view';
import { ScorecardFragment } from '../../common/ui/types';
import { useGetComponentScorecardsWithScores } from '../../services/get-component-scorecards-with-scores';

import { LoadFailure } from './load-failure';
import { NoScorecards } from './no-scorecards';
import { ScorecardQuickViewContainerProps } from './types';

function ScorecardQuickViewContainer({
  componentId,
}: ScorecardQuickViewContainerProps) {
  di(useGetComponentScorecardsWithScores);

  const [currentScorecardId, setCurrentScorecardId] = useState<string>('');
  const onScorecardFullViewOpen = (scorecardId: string) => {
    setCurrentScorecardId(scorecardId);
  };
  const onScorecardFullViewClose = () => {
    setCurrentScorecardId('');
  };

  // the useGetComponentScorecardsWithScores can return refetch if it's needed in future
  const { data, error, loading } = useGetComponentScorecardsWithScores(
    componentId,
  );

  if (loading) {
    return (
      <Loading
        spinnerSize={'medium'}
        testId={'dragonfruit-scorecard-quick-view-container-spinner'}
      />
    );
  }

  if (error) {
    return (
      <LoadFailure testId={'dragonfruit-scorecard-quick-view-load-failure'} />
    );
  }

  const component = data?.compass?.component as CompassComponent;
  const scorecards = component?.scorecards || [];

  if (scorecards.length === 0) {
    return <NoScorecards />;
  }

  return (
    <>
      {!!currentScorecardId && (
        <ScorecardFullView
          componentId={component.id}
          componentName={component.name}
          scorecardId={currentScorecardId}
          onClose={onScorecardFullViewClose}
        />
      )}
      {scorecards.map((scorecard, index) => (
        <ScorecardQuickView
          scorecard={scorecard as ScorecardFragment}
          componentId={componentId}
          onScorecardFullViewOpen={onScorecardFullViewOpen}
          testId={`scorecard-${index}`}
          key={index}
        />
      ))}
    </>
  );
}

export default withErrorBoundary(ScorecardQuickViewContainer, {
  Fallback: LoadFailure,
  // componentName is used by the default SimpleErrorFallback component which we are not using,
  // so it is not strictly necessary
  componentName: 'scorecardQuickViewContainer',
});
