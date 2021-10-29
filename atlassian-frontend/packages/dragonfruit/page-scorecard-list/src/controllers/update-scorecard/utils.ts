import {
  CompassLinkType,
  CompassScorecardCriteriaTypeName,
  DeleteCompassScorecardCriteriaInput,
  UpdateCompassHasDescriptionScorecardCriteriaInput,
  UpdateCompassHasFieldScorecardCriteriaInput,
  UpdateCompassHasLinkScorecardCriteriaInput,
  UpdateCompassHasOwnerScorecardCriteriaInput,
  UpdateCompassScorecardCriteriaInput,
} from '@atlassian/dragonfruit-graphql';

import { valueIsField, valueIsLink } from '../available-fields';

import { ExistingScorecard, UpdateFormData } from './index';

export type CriteriaInput = {
  weight: number;
  field: string;
  id: string;
};

export type SortedMutationInputs = {
  create: CriteriaInput[];
  update: CriteriaInput[];
  delete: DeleteCompassScorecardCriteriaInput[];
};

export const updateCriteriaInput = (criterias: CriteriaInput[]) => {
  let mutationInput: UpdateCompassScorecardCriteriaInput[] = [];
  criterias.forEach((c) => {
    if (c.field === 'DESCRIPTION') {
      const descriptionInput: UpdateCompassHasDescriptionScorecardCriteriaInput = {
        id: c.id,
        weight: c.weight ? c.weight : 0,
      };
      const input: UpdateCompassScorecardCriteriaInput = {
        hasDescription: descriptionInput,
      };
      mutationInput.push(input);
    } else if (c.field === 'OWNER') {
      const ownerInput: UpdateCompassHasOwnerScorecardCriteriaInput = {
        id: c.id,
        weight: c.weight ? c.weight : 0,
      };
      const input: UpdateCompassScorecardCriteriaInput = {
        hasOwner: ownerInput,
      };
      mutationInput.push(input);
    } else if (valueIsLink(c.field)) {
      const linkInput: UpdateCompassHasLinkScorecardCriteriaInput = {
        id: c.id,
        linkType: c.field as CompassLinkType,
        weight: c.weight ? c.weight : 0,
      };
      const input: UpdateCompassScorecardCriteriaInput = { hasLink: linkInput };
      mutationInput.push(input);
    } else if (valueIsField(c.field)) {
      const fieldInput: UpdateCompassHasFieldScorecardCriteriaInput = {
        id: c.id,
        // TODO COMPASS-1121: properly handle custom fields by passing the actual field definition id
        fieldDefinitionId: '1234',
        weight: c.weight ? c.weight : 0,
      };
      const input: UpdateCompassScorecardCriteriaInput = {
        hasField: fieldInput,
      };
      mutationInput.push(input);
    }
  });
  return mutationInput;
};

export function sortCriteriaMutations(
  formData: UpdateFormData,
  existingScorecard: ExistingScorecard,
): SortedMutationInputs {
  const mutationInputs: SortedMutationInputs = {
    create: [],
    update: [],
    delete: [],
  };
  const originalCriterias = existingScorecard?.criterias;
  const matchedCriterias: typeof originalCriterias = [];
  const criteriasToUpdate: CriteriaInput[] = [];
  const criteriasToCreate: CriteriaInput[] = [];
  formData?.criterias?.forEach((criteriaEntry) => {
    // Checking criterias from form data against existing criterias
    // Check for id match first
    const match = originalCriterias?.find(
      (originalCriteria) => originalCriteria.id === criteriaEntry?.id,
    );

    if (match) {
      // add to matched array which is in the format of originalCriterias
      // We could rely on the criteriasToUpdate but the type is slightly different
      // So the deicision is either hold another array OR have to do additional transformations
      matchedCriterias.push(match);
      // Check if types or weight are different
      if (
        match.__typename !== getTypenameFromField(criteriaEntry.field) ||
        match.weight !== criteriaEntry.weight
      ) {
        criteriasToUpdate.push(criteriaEntry);
      }
    } else {
      // If there was no match we are creating a criteria entry
      criteriasToCreate.push(criteriaEntry);
    }
  });
  // If an existing criteria has no analog in the form data, add it to the list to be deleted
  mutationInputs.delete = originalCriterias
    ?.filter((criteria) => !matchedCriterias.includes(criteria))
    .map(
      (criteria) =>
        <DeleteCompassScorecardCriteriaInput>{
          id: criteria.id,
        },
    );
  mutationInputs.create = criteriasToCreate;
  mutationInputs.update = criteriasToUpdate;

  return mutationInputs;
}

function getTypenameFromField(field: string) {
  switch (field) {
    case 'DESCRIPTION': {
      return CompassScorecardCriteriaTypeName.HAS_DESCRIPTION;
    }
    case 'OWNER': {
      return CompassScorecardCriteriaTypeName.HAS_OWNER;
    }
  }

  if (valueIsField(field)) {
    return CompassScorecardCriteriaTypeName.HAS_FIELD;
  }

  if (valueIsLink(field)) {
    return CompassScorecardCriteriaTypeName.HAS_LINK;
  }

  return undefined;
}
