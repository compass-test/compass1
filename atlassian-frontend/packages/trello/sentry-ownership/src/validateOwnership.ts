import { validate } from 'jsonschema';

const ownershipSchema = {
  type: 'object',
  patternProperties: {
    '^[a-z0-9-]+$': {
      type: 'array',
      items: {
        type: 'string',
      },
      uniqueItems: true,
    },
  },
  additionalProperties: false,
};

export interface OwnershipDefinition {
  [teamName: string]: string[];
}

export const validateOwnership = (
  ownershipDefinition: OwnershipDefinition,
  options?: { throwError: boolean },
) => {
  return validate(ownershipDefinition, ownershipSchema, {
    throwError: options ? options.throwError : true,
  });
};
