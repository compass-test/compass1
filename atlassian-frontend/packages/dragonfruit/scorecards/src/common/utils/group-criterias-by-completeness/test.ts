import { CriteriaFragment } from '../../ui/types';

import groupCriteriasByCompleteness from './index';

describe('groupCriteriasByCompleteness', () => {
  describe('when there are no criterias', () => {
    it('should group criterias by completeness', () => {
      const criterias: CriteriaFragment[] = [];
      const { incomplete, complete } = groupCriteriasByCompleteness(criterias);

      expect(incomplete.length).toBe(0);
      expect(complete.length).toBe(0);
    });
  });

  describe('when all criterias are complete', () => {
    it('should group criterias by completeness', () => {
      const criterias: CriteriaFragment[] = [
        {
          __typename: 'CompassHasDescriptionScorecardCriteria',
          id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
          weight: 15,
          scorecardCriteriaScore: {
            score: 1,
            maxScore: 1,
          },
        },
        {
          __typename: 'CompassHasOwnerScorecardCriteria',
          id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
          weight: 15,
          scorecardCriteriaScore: {
            score: 1,
            maxScore: 1,
          },
        },
      ];
      const { incomplete, complete } = groupCriteriasByCompleteness(criterias);

      expect(incomplete.length).toBe(0);
      expect(complete.length).toBe(2);
    });
  });

  describe('when all criterias are incomplete', () => {
    it('should group criterias by completeness', () => {
      const criterias: CriteriaFragment[] = [
        {
          __typename: 'CompassHasDescriptionScorecardCriteria',
          id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
          weight: 15,
          scorecardCriteriaScore: {
            score: 0,
            maxScore: 1,
          },
        },
        {
          __typename: 'CompassHasOwnerScorecardCriteria',
          id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
          weight: 15,
          scorecardCriteriaScore: {
            score: 0,
            maxScore: 1,
          },
        },
      ];
      const { incomplete, complete } = groupCriteriasByCompleteness(criterias);

      expect(incomplete.length).toBe(2);
      expect(complete.length).toBe(0);
    });
  });

  describe('when all criterias are mixed complete', () => {
    it('should group criterias by completeness', () => {
      const criterias: CriteriaFragment[] = [
        {
          __typename: 'CompassHasDescriptionScorecardCriteria',
          id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
          weight: 15,
          scorecardCriteriaScore: {
            score: 0,
            maxScore: 1,
          },
        },
        {
          __typename: 'CompassHasOwnerScorecardCriteria',
          id: '29016b11-1bb5-4ce5-875c-b58ef6fc154e',
          weight: 15,
          scorecardCriteriaScore: {
            score: 1,
            maxScore: 1,
          },
        },
      ];
      const { incomplete, complete } = groupCriteriasByCompleteness(criterias);

      expect(incomplete.length).toBe(1);
      expect(complete.length).toBe(1);
    });
  });
});
