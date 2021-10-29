import { CompassScorecard } from '@atlassian/dragonfruit-graphql';

// sorts the given scorecards by the health/totalScore in ascending order, lowest first and highest last
export const getScorecardsSortedByHealth = (
  scorecards: CompassScorecard[],
): CompassScorecard[] => {
  return [...scorecards].sort((a, b) => {
    const aTotalScore = a?.scorecardScore?.totalScore ?? 0;
    const bTotalScore = b?.scorecardScore?.totalScore ?? 0;

    return aTotalScore - bTotalScore;
  });
};

// gets the count of UnHealthy scorecards, which are with totalScore < HEALTHY_SCORE
export const getUnHealthyScorecardsCount = (
  scorecards: CompassScorecard[],
): number => {
  const HEALTHY_SCORE = 81;

  return scorecards.reduce<number>(
    (accumulator, scorecard: CompassScorecard) => {
      const totalScore = scorecard?.scorecardScore?.totalScore ?? 0;

      if (totalScore < HEALTHY_SCORE) {
        accumulator++;
      }

      return accumulator;
    },
    0,
  );
};
