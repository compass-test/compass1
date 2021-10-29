import React from 'react';

import { CompassScorecard } from '@atlassian/dragonfruit-graphql';

import {
  HighestHealthyIcon,
  HighHealthyIcon,
  LowestHealthyIcon,
  LowHealthyIcon,
  MediumHealthyIcon,
} from '../../../common/assets';

// Icon to display next to x of y on the Components List Table, under scorecards column
export const ScorecardsHealthIcon = ({
  scorecards,
}: {
  scorecards: CompassScorecard[];
}) => {
  const totalScores = scorecards.map(
    (scorecard) => scorecard?.scorecardScore?.totalScore ?? 0,
  );

  if (totalScores.some((totalScore) => totalScore === 0)) {
    return <LowestHealthyIcon />;
  } else if (
    totalScores.some((totalScore) => totalScore > 0 && totalScore <= 40)
  ) {
    return <LowHealthyIcon />;
  } else if (
    totalScores.some((totalScore) => totalScore > 40 && totalScore <= 60)
  ) {
    return <MediumHealthyIcon />;
  } else if (
    totalScores.some((totalScore) => totalScore > 60 && totalScore <= 80)
  ) {
    return <HighHealthyIcon />;
  } else if (
    totalScores.some((totalScore) => totalScore > 80 && totalScore <= 100)
  ) {
    return <HighestHealthyIcon />;
  } else {
    return null;
  }
};

// Icon to display next to the Scorecard Name within the Inline Dialog
export const ScorecardHealthIcon = ({ progress }: { progress: number }) => {
  if (progress === 0) {
    return <LowestHealthyIcon />;
  } else if (progress > 0 && progress <= 40) {
    return <LowHealthyIcon />;
  } else if (progress > 40 && progress <= 60) {
    return <MediumHealthyIcon />;
  } else if (progress > 60 && progress <= 80) {
    return <HighHealthyIcon />;
  } else if (progress > 80 && progress <= 100) {
    return <HighestHealthyIcon />;
  } else {
    return null;
  }
};
