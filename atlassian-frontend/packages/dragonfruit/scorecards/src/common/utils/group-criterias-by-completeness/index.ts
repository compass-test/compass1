import { CriteriaFragment } from '../../ui/types';

const groupCriteriasByCompleteness = (criterias: CriteriaFragment[]) => {
  criterias = criterias || [];

  const incomplete: CriteriaFragment[] = [];
  const complete: CriteriaFragment[] = [];

  criterias.forEach((criteria: CriteriaFragment) => {
    if (
      criteria.scorecardCriteriaScore.score ===
      criteria.scorecardCriteriaScore.maxScore
    ) {
      complete.push(criteria);
    } else {
      incomplete.push(criteria);
    }
  });

  return {
    incomplete,
    complete,
  };
};

export default groupCriteriasByCompleteness;
