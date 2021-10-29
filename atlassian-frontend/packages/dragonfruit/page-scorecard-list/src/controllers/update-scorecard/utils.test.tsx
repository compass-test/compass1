import {
  CompassComponentType,
  CompassLinkType,
  CompassScorecardImportance,
  CreateCompassHasDescriptionScorecardCriteriaInput,
  CreateCompassHasLinkScorecardCriteriaInput,
  CreateCompassHasOwnerScorecardCriteriaInput,
  CreateCompassScorecardCriteriaInput,
  UpdateCompassHasDescriptionScorecardCriteriaInput,
  UpdateCompassHasLinkScorecardCriteriaInput,
  UpdateCompassHasOwnerScorecardCriteriaInput,
  UpdateCompassScorecardCriteriaInput,
} from '@atlassian/dragonfruit-graphql';

import { cleanScorecardUpdateInput, createCriteriaInput } from '../utils';

import {
  CriteriaInput,
  sortCriteriaMutations,
  SortedMutationInputs,
  updateCriteriaInput,
} from './utils';

import { ExistingScorecard, UpdateFormData } from './index';

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

// Update inputs
const hasOwnerInputUpdate: UpdateCompassHasOwnerScorecardCriteriaInput = {
  id: '1234',
  weight: 25,
};

const hasDescriptionInputUpdate: UpdateCompassHasDescriptionScorecardCriteriaInput = {
  id: '2134',
  weight: 25,
};

const hasLinkInputUpdate: UpdateCompassHasLinkScorecardCriteriaInput = {
  id: '3124',
  linkType: CompassLinkType.REPOSITORY,
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

describe('sortCriteriaMutations', () => {
  const existingScorecard: ExistingScorecard = {
    description: 'test',
    importance: CompassScorecardImportance.REQUIRED,
    componentType: CompassComponentType.SERVICE,
    criterias: [],
    name: 'test',
    owner: null,
  };

  it('should bucket everything in create if empty', () => {
    const expectedList: SortedMutationInputs = {
      create: [
        { weight: 25, field: 'OWNER', id: '1234' },
        { weight: 25, field: 'DESCRIPTION', id: '2134' },
        { weight: 25, field: 'REPOSITORY', id: '3124' },
      ],
      update: [],
      delete: [],
    };

    const input: UpdateFormData = {
      description: 'test2',
      name: 'test2',
      criterias: [
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
      ],
    };

    expect(sortCriteriaMutations(input, existingScorecard)).toEqual(
      expectedList,
    );
  });

  it('should bucket deletes if removed from from data', () => {
    const existingScorecard: ExistingScorecard = {
      description: 'test',
      importance: CompassScorecardImportance.REQUIRED,
      componentType: CompassComponentType.SERVICE,
      criterias: [
        {
          id: '2134',
          weight: 25,
          __typename: 'CompassHasDescriptionScorecardCriteria',
        },
        {
          id: '1234',
          weight: 25,
          __typename: 'CompassHasOwnerScorecardCriteria',
        },
      ],
      name: 'test',
      owner: null,
    };

    const input: UpdateFormData = {
      description: 'test2',
      name: 'test2',
      criterias: [
        {
          weight: 25,
          field: 'REPOSITORY',
          id: '3124',
        },
      ],
    };

    const expectedList: SortedMutationInputs = {
      create: [{ weight: 25, field: 'REPOSITORY', id: '3124' }],
      update: [],
      delete: [{ id: '2134' }, { id: '1234' }],
    };
    expect(sortCriteriaMutations(input, existingScorecard)).toEqual(
      expectedList,
    );
  });

  it('should bucket as updates if criteria exists in scorecard', () => {
    const existingScorecard: ExistingScorecard = {
      description: 'test',
      importance: CompassScorecardImportance.REQUIRED,
      componentType: CompassComponentType.SERVICE,
      criterias: [
        {
          id: '2134',
          weight: 25,
          __typename: 'CompassHasDescriptionScorecardCriteria',
        },
        {
          id: '1234',
          weight: 25,
          __typename: 'CompassHasOwnerScorecardCriteria',
        },
        {
          id: '3124',
          weight: 25,
          __typename: 'CompassHasLinkScorecardCriteria',
        },
      ],
      name: 'test',
      owner: null,
    };

    const input: UpdateFormData = {
      description: 'test2',
      name: 'test2',
      criterias: [
        {
          weight: 33,
          field: 'OWNER',
          id: '1234',
        },
        {
          weight: 33,
          field: 'DASHBOARD',
          id: '2134',
        },
        {
          weight: 33,
          field: 'REPOSITORY',
          id: '3124',
        },
      ],
    };

    const expectedList: SortedMutationInputs = {
      create: [],
      update: [
        // change to weight
        {
          weight: 33,
          field: 'OWNER',
          id: '1234',
        },
        // There is a change to the weight and type here
        // This should result in only 1 update entry
        {
          weight: 33,
          field: 'DASHBOARD',
          id: '2134',
        },
        // change to weight
        {
          weight: 33,
          field: 'REPOSITORY',
          id: '3124',
        },
      ],
      delete: [],
    };
    expect(sortCriteriaMutations(input, existingScorecard)).toEqual(
      expectedList,
    );
  });

  it('create update and delete all together', () => {
    const existingScorecard: ExistingScorecard = {
      description: 'test',
      importance: CompassScorecardImportance.REQUIRED,
      componentType: CompassComponentType.SERVICE,
      criterias: [
        {
          id: '2134',
          weight: 25,
          __typename: 'CompassHasDescriptionScorecardCriteria',
        },
        {
          id: '1234',
          weight: 25,
          __typename: 'CompassHasOwnerScorecardCriteria',
        },
      ],
      name: 'test',
      owner: null,
    };

    const input: UpdateFormData = {
      description: 'test2',
      name: 'test2',
      criterias: [
        {
          weight: 33,
          field: 'OWNER',
          id: '1234',
        },
        {
          weight: 33,
          field: 'REPOSITORY',
          id: '3124',
        },
      ],
    };

    const expectedList: SortedMutationInputs = {
      create: [{ weight: 33, field: 'REPOSITORY', id: '3124' }],
      update: [{ weight: 33, field: 'OWNER', id: '1234' }],
      delete: [{ id: '2134' }],
    };
    expect(sortCriteriaMutations(input, existingScorecard)).toEqual(
      expectedList,
    );
  });

  it('return empty if no criteria passed', () => {
    const input: UpdateFormData = {
      description: 'test2',
      name: 'test2',
      criterias: [],
    };
    expect(sortCriteriaMutations(input, existingScorecard)).toEqual({
      create: [],
      delete: [],
      update: [],
    });
  });
});

describe('updateCriteriaInput', () => {
  it('should match the expected outcome', () => {
    const expected: UpdateCompassScorecardCriteriaInput[] = [
      { hasOwner: hasOwnerInputUpdate },
      { hasDescription: hasDescriptionInputUpdate },
      { hasLink: hasLinkInputUpdate },
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
    expect(updateCriteriaInput(input)).toEqual(expected);
  });

  it('return empty if no criteria passed', () => {
    expect(updateCriteriaInput([])).toEqual([]);
  });
});

describe('cleanScorecardUpdateInput', () => {
  // Given an input with null or undefined values
  it('should clean those', () => {
    const obj = {
      name: null,
      description: undefined,
    };
    const expected = {};

    expect(cleanScorecardUpdateInput(obj)).toEqual(expected);
  });
});
