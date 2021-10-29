import React from 'react';

import { ProgressCheck } from '../../../common/ui/progress-check';

import { CriteriaText } from './criteria-text';
import { Row, Weight } from './styled';
import { CriteriaRowProps } from './types';

export const CriteriaRow = ({
  testId,
  criteria,
  showWeight = false,
}: CriteriaRowProps) => {
  const score = criteria.scorecardCriteriaScore;
  const complete = score.score >= score.maxScore;

  const checkTestId = testId && `${testId}.check`;
  const textTestId = testId && `${testId}.text`;
  const weightTestId = testId && `${testId}.weight`;

  return (
    <Row data-testid={testId}>
      <ProgressCheck complete={complete} testId={checkTestId} />
      <CriteriaText criteria={criteria} testId={textTestId} />
      {showWeight && (
        <Weight data-testid={weightTestId}>{criteria.weight}%</Weight>
      )}
    </Row>
  );
};
