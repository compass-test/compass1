import { ScorecardFragment } from './types';

export const MOCK_COMPONENT_ID =
  'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:component/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

export const mockScorecardsWithScoresNoScorecards: ScorecardFragment[] = [];

export const mockScorecardsWithScoresAllHealthy: ScorecardFragment[] = [
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-000000000000',
    name: 'Scorecard 1',
    scorecardScore: {
      totalScore: 100,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-111111111111',
    name: 'Scorecard 2',
    scorecardScore: {
      totalScore: 100,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-222222222222',
    name: 'Scorecard 3',
    scorecardScore: {
      totalScore: 100,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-333333333333',
    name: 'Scorecard 4',
    scorecardScore: {
      totalScore: 100,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-444444444444',
    name: 'Scorecard 5',
    scorecardScore: {
      totalScore: 100,
      maxTotalScore: 100,
    },
  },
];

export const mockScorecardsWithScoresAllUnHealthy: ScorecardFragment[] = [
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-000000000000',
    name: 'Scorecard 1',
    scorecardScore: {
      totalScore: 0,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-111111111111',
    name: 'Scorecard 2',
    scorecardScore: {
      totalScore: 35,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-222222222222',
    name: 'Scorecard 3',
    scorecardScore: {
      totalScore: 55,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-333333333333',
    name: 'Scorecard 4',
    scorecardScore: {
      totalScore: 65,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-444444444444',
    name: 'Scorecard 5',
    scorecardScore: {
      totalScore: 75,
      maxTotalScore: 100,
    },
  },
];

export const mockScorecardsWithScoresMixedHealthy: ScorecardFragment[] = [
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-000000000000',
    name: 'Scorecard 1',
    scorecardScore: {
      totalScore: 0,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-111111111111',
    name: 'Scorecard 2',
    scorecardScore: {
      totalScore: 35,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-222222222222',
    name: 'Scorecard 3',
    scorecardScore: {
      totalScore: 55,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-333333333333',
    name: 'Scorecard 4',
    scorecardScore: {
      totalScore: 75,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-444444444444',
    name: 'Scorecard 5',
    scorecardScore: {
      totalScore: 100,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-555555555555',
    name: 'Scorecard 6',
    scorecardScore: {
      totalScore: 100,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-666666666666',
    name: 'Scorecard 7',
    scorecardScore: {
      totalScore: 100,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-777777777777',
    name: 'Scorecard 8',
    scorecardScore: {
      totalScore: 100,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-888888888888',
    name: 'Scorecard 9',
    scorecardScore: {
      totalScore: 100,
      maxTotalScore: 100,
    },
  },
  {
    id:
      'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:scorecard/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-999999999999',
    name: 'Scorecard 10',
    scorecardScore: {
      totalScore: 100,
      maxTotalScore: 100,
    },
  },
];
