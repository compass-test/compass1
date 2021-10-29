import { validate } from 'jsonschema';

const teamsSchema = {
  type: 'object',
  patternProperties: {
    '^[a-z0-9-]+$': {
      type: 'object',
      properties: {
        contributors: {
          type: 'array',
          required: true,
          items: {
            type: 'string',
          },
          minItems: 1,
        },
        'directly-responsible-individual': {
          type: 'string',
          required: true,
        },
        slack: {
          type: 'string',
          required: true,
        },
        project: {
          type: 'string',
          required: true,
        },
      },
    },
  },
  additionalProperties: false,
};

export interface TeamDefinition {
  contributors: string[];
  'directly-responsible-individual': string;
  slack: string;
  project: string;
}

export interface TeamsDefinition {
  [teamName: string]: TeamDefinition;
}

export const validateTeams = (
  teamsDefinition: TeamsDefinition,
  options?: { throwError: boolean },
) => {
  return validate(teamsDefinition, teamsSchema, {
    throwError: options ? options.throwError : true,
  });
};
