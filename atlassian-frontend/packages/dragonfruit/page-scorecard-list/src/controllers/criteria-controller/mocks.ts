import { Criteria } from './types';

// Simulates an empty list of criteria which is most pertinent for newly created
// scorecards.
export const mockEmptyCriteriaList: Criteria[] = [];

// Simulates a list of criteria that have been retrieved from the backend. No
// new criteria have been added in the frontend.
export const mockExistingCriteriaList: Criteria[] = [
  {
    id:
      'ari:cloud:compass:c0eae290-e478-488a-af42-f4a55ab39176:scorecard-criteria/dc29a473-a138-4cbb-a495-aece7b323261/test-scorecard-criteria',
    field: 'owner',
    weight: '50',
  },
  {
    id:
      'ari:cloud:compass:c0eae290-e478-488a-af42-f4a55ab39177:scorecard-criteria/dc29a473-a138-4cbb-a495-aece7b323262/test-scorecard-criteria',
    field: 'documentation',
    weight: '50',
  },
];

// Simulates a list of new criteria that have been added in the frontend but not
// yet saved.
export const mockNewCriteriaList: Criteria[] = [
  {
    id: '189d2ff2-a376-48d8-8498-f5cfc2f4f489',
  },
  {
    id: 'a56429ac-145f-4bcf-92f3-3b7e112a0342',
  },
];

// Simulates a list of criteria two of which have been retrieved from the
// backend and two of which have been added in the frontend but not yet
// persisted.
export const mockMixedCriteriaList: Criteria[] = [
  {
    id:
      'ari:cloud:compass:c0eae290-e478-488a-af42-f4a55ab39176:scorecard-criteria/dc29a473-a138-4cbb-a495-aece7b323261/test-scorecard-criteria',
    field: 'owner',
    weight: '25',
  },
  {
    id:
      'ari:cloud:compass:c0eae290-e478-488a-af42-f4a55ab39177:scorecard-criteria/dc29a473-a138-4cbb-a495-aece7b323262/test-scorecard-criteria',
    field: 'documentation',
    weight: '25',
  },
  {
    id: '9960ae47-8f17-4e68-b792-afce372e2974',
  },
  {
    id: '8f7ae6db-9cb4-4f47-a805-c5bf259d380d',
  },
];
