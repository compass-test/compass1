export interface RuleList {
  name?: string;
  message: string;
  pattern?: RegExp;
  disabled?: boolean;
}

export const ruleSchema = [
  {
    type: 'object',
    properties: {
      blockList: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
            pattern: {
              type: 'string',
            },
            disabled: {
              type: 'boolean',
            },
          },
        },
      },
      ensureRequired: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
            pattern: {
              type: 'string',
            },
            disabled: {
              type: 'boolean',
            },
          },
        },
      },
      ensureOptional: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
            pattern: {
              type: 'string',
            },
            disabled: {
              type: 'boolean',
            },
          },
        },
      },
    },
  },
];
