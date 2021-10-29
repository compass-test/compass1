import { CompassScorecard } from '@atlassian/dragonfruit-graphql';

import {
  getScorecardsSortedByHealth,
  getUnHealthyScorecardsCount,
} from './main';

describe('utils', () => {
  describe('getScorecardsSortedByHealth', () => {
    describe('when no scorecards are given', () => {
      const scorecards: CompassScorecard[] = [];

      it('should return an empty []', () => {
        expect(getScorecardsSortedByHealth(scorecards)).toEqual([]);
      });
    });

    describe('when unsorted scorecards are given', () => {
      const scorecards: CompassScorecard[] = [
        {
          id:
            'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e',
          name: 'Scorecard 1',
          scorecardScore: {
            totalScore: 100,
            maxTotalScore: 100,
          },
        } as CompassScorecard,
        {
          id:
            'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e',
          name: 'Scorecard 2',
          scorecardScore: {
            totalScore: 35,
            maxTotalScore: 100,
          },
        } as CompassScorecard,
        {
          id:
            'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e',
          name: 'Scorecard 3',
          scorecardScore: {
            totalScore: 55,
            maxTotalScore: 100,
          },
        } as CompassScorecard,
      ];
      const sortedScorecards: CompassScorecard[] = [
        {
          id:
            'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e',
          name: 'Scorecard 2',
          scorecardScore: {
            totalScore: 35,
            maxTotalScore: 100,
          },
        } as CompassScorecard,
        {
          id:
            'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e',
          name: 'Scorecard 3',
          scorecardScore: {
            totalScore: 55,
            maxTotalScore: 100,
          },
        } as CompassScorecard,
        {
          id:
            'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e',
          name: 'Scorecard 1',
          scorecardScore: {
            totalScore: 100,
            maxTotalScore: 100,
          },
        } as CompassScorecard,
      ];

      it('should return the scorecards sorted by health', () => {
        expect(getScorecardsSortedByHealth(scorecards)).toEqual(
          sortedScorecards,
        );
      });
    });
  });

  describe('getUnHealthyScorecardsCount', () => {
    describe('when no scorecards are given', () => {
      const scorecards: CompassScorecard[] = [];

      it('should return 0', () => {
        expect(getUnHealthyScorecardsCount(scorecards)).toEqual(0);
      });
    });

    describe('when scorecards are given', () => {
      const scorecards: CompassScorecard[] = [
        {
          id:
            'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e',
          name: 'Scorecard 1',
          scorecardScore: {
            totalScore: 100,
            maxTotalScore: 100,
          },
        } as CompassScorecard,
        {
          id:
            'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e',
          name: 'Scorecard 1',
          scorecardScore: {
            totalScore: 81,
            maxTotalScore: 100,
          },
        } as CompassScorecard,
        {
          id:
            'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e',
          name: 'Scorecard 2',
          scorecardScore: {
            totalScore: 35,
            maxTotalScore: 100,
          },
        } as CompassScorecard,
        {
          id:
            'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e',
          name: 'Scorecard 3',
          scorecardScore: {
            totalScore: 55,
            maxTotalScore: 100,
          },
        } as CompassScorecard,
      ];

      it('should return the count of unhealthy scorecards', () => {
        expect(getUnHealthyScorecardsCount(scorecards)).toEqual(2);
      });
    });
  });
});
