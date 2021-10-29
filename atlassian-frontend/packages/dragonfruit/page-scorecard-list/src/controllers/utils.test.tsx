import {
  CompassLinkType,
  CreateCompassHasDescriptionScorecardCriteriaInput,
  CreateCompassHasLinkScorecardCriteriaInput,
  CreateCompassHasOwnerScorecardCriteriaInput,
  CreateCompassScorecardCriteriaInput,
} from '@atlassian/dragonfruit-graphql';

import { createCriteriaInput, CriteriaInput } from './utils';

// Create inputs
const hasDescriptionInput: CreateCompassHasDescriptionScorecardCriteriaInput = {
  weight: 25,
};

const hasLinkInput: CreateCompassHasLinkScorecardCriteriaInput = {
  linkType: CompassLinkType.REPOSITORY,
  weight: 25,
};

const hasOwnerInput: CreateCompassHasOwnerScorecardCriteriaInput = {
  weight: 25,
};

describe('createCriteriaInput', () => {
  it('should match the expected outcome', () => {
    const expected: CreateCompassScorecardCriteriaInput[] = [
      { hasOwner: hasOwnerInput },
      { hasDescription: hasDescriptionInput },
      { hasLink: hasLinkInput },
    ];

    const input: CriteriaInput[] = [
      {
        weight: 25,
        field: 'OWNER',
        id: '1234',
      },
      {
        weight: 25,
        field: 'DESCRIPTION',
        id: '2134',
      },
      {
        weight: 25,
        field: 'REPOSITORY',
        id: '3124',
      },
    ];
    expect(createCriteriaInput(input)).toEqual(expected);
  });

  it('return empty if no criteria passed', () => {
    expect(createCriteriaInput([])).toEqual([]);
  });
});
