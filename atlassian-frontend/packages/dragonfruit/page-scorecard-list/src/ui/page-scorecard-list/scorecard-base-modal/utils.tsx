import {
  Criteria,
  CriteriaType,
} from '../../../controllers/criteria-controller/types';

export const getInitialCriteriaData = (data: Array<CriteriaType>) => {
  let initialClaims: string[] = [];
  let criteriaAllInfo: Criteria[] = [];

  if (data) {
    data.forEach((criteria) => {
      let hasA;

      switch (criteria.__typename) {
        case 'CompassHasOwnerScorecardCriteria':
          hasA = 'OWNER';
          break;
        case 'CompassHasDescriptionScorecardCriteria':
          hasA = 'DESCRIPTION';
          break;
        case 'CompassHasLinkScorecardCriteria':
          hasA = criteria.linkType;
          break;
        default:
          hasA = null;
      }

      if (hasA) {
        initialClaims.push(hasA);
        criteriaAllInfo.push({
          id: criteria.id,
          weight: criteria.weight.toString(),
          field: hasA,
        });
      }
    });
  }

  return { initialClaims, criteriaAllInfo };
};
