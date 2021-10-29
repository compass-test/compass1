import {
  CompassLinkType,
  CreateCompassHasDescriptionScorecardCriteriaInput,
  CreateCompassHasFieldScorecardCriteriaInput,
  CreateCompassHasLinkScorecardCriteriaInput,
  CreateCompassHasOwnerScorecardCriteriaInput,
  CreateCompassScorecardCriteriaInput,
} from '@atlassian/dragonfruit-graphql';

import { valueIsField, valueIsLink } from './available-fields';

export type CriteriaInput = {
  weight: number;
  field: string;
  id: string;
};

export const createCriteriaInput = (criterias: CriteriaInput[]) => {
  let mutationInput: CreateCompassScorecardCriteriaInput[] = [];

  criterias.forEach((c) => {
    if (c.field === 'DESCRIPTION') {
      const descriptionInput: CreateCompassHasDescriptionScorecardCriteriaInput = {
        weight: c.weight ? c.weight : 0,
      };
      const input: CreateCompassScorecardCriteriaInput = {
        hasDescription: descriptionInput,
      };
      mutationInput.push(input);
    } else if (c.field === 'OWNER') {
      const ownerInput: CreateCompassHasOwnerScorecardCriteriaInput = {
        weight: c.weight ? c.weight : 0,
      };
      const input: CreateCompassScorecardCriteriaInput = {
        hasOwner: ownerInput,
      };
      mutationInput.push(input);
    } else if (valueIsLink(c.field)) {
      const linkInput: CreateCompassHasLinkScorecardCriteriaInput = {
        linkType: c.field as CompassLinkType,
        weight: c.weight ? c.weight : 0,
      };
      const input: CreateCompassScorecardCriteriaInput = {
        hasLink: linkInput,
      };
      mutationInput.push(input);
    } else if (valueIsField(c.field)) {
      const fieldInput: CreateCompassHasFieldScorecardCriteriaInput = {
        // TODO COMPASS-1121: properly handle custom fields by passing the actual field definition id
        fieldDefinitionId: '1234',
        weight: c.weight ? c.weight : 0,
      };
      const input: CreateCompassScorecardCriteriaInput = {
        hasField: fieldInput,
      };
      mutationInput.push(input);
    }
  });

  return mutationInput;
};

export function cleanScorecardUpdateInput(obj: any) {
  for (let property in obj) {
    if (obj[property] === null || obj[property] === undefined) {
      delete obj[property];
    }
  }

  return obj;
}
