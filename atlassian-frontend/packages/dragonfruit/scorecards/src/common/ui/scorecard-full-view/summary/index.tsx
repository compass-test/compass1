import React from 'react';

import { CircularProgress } from '../../circular-progress';

import {
  ProgressWrapper,
  ScorecardDescription,
  ScorecardName,
  SummaryWrapper,
  TextWrapper,
} from './styled';

const Summary = ({
  scorecardName,
  scorecardDescription = '',
  progress,
  testId = 'scorecard-full-view-summary',
}: {
  scorecardName: string;
  scorecardDescription: string | null | undefined;
  progress: number;
  testId?: string;
}) => {
  return (
    <SummaryWrapper data-testid={testId}>
      <TextWrapper>
        <ScorecardName data-testid={`${testId}-scorecard-name`}>
          {scorecardName}
        </ScorecardName>
        <ScorecardDescription data-testid={`${testId}-scorecard-description`}>
          {scorecardDescription}
        </ScorecardDescription>
      </TextWrapper>
      <ProgressWrapper>
        <CircularProgress
          progress={progress}
          size="medium"
          testId={`${testId}-scorecard-progress`}
        />
      </ProgressWrapper>
    </SummaryWrapper>
  );
};

export default Summary;
