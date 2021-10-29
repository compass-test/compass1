import { TestCase } from '../../types';

export const atOne: TestCase = {
  initialADF: {
    type: 'doc',
    content: [{ type: 'paragraph', content: [] }],
  },
  steps: [
    {
      stepType: 'replace',
      from: 1,
      to: 1,
      slice: {
        content: [{ type: 'text', text: 'a' }],
      },
    },
  ],
};

export const atTwo: TestCase = {
  initialADF: {
    type: 'doc',
    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'a' }] }],
  },
  steps: [
    {
      stepType: 'replace',
      from: 2,
      to: 2,
      slice: { content: [{ type: 'text', text: 'b' }] },
    },
  ],
};

export const atThree: TestCase = {
  initialADF: {
    type: 'doc',
    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'ab' }] }],
  },
  steps: [
    {
      stepType: 'replace',
      from: 3,
      to: 3,
      slice: { content: [{ type: 'text', text: 'c' }] },
    },
  ],
};

export const afterEmptyParagraph: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      { type: 'paragraph' },
      { type: 'paragraph', content: [{ type: 'text', text: 'ab' }] },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 5,
      to: 5,
      slice: { content: [{ type: 'text', text: 'c' }] },
    },
  ],
};

export const atLastParagraph: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      { type: 'paragraph', content: [{ type: 'text', text: 'abc' }] },
      { type: 'paragraph', content: [] },
      { type: 'paragraph', content: [{ type: 'text', text: 'ab' }] },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 9,
      to: 9,
      slice: { content: [{ type: 'text', text: 'c' }] },
    },
  ],
};

export const pAtEol: TestCase = {
  initialADF: {
    type: 'doc',
    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'abc' }] }],
  },
  steps: [
    {
      stepType: 'replace',
      from: 5,
      to: 5,
      slice: { content: [{ type: 'paragraph' }] },
    },
  ],
};

export const between: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'ac',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [],
      },
      {
        type: 'paragraph',
        content: [],
      },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 2,
      to: 2,
      slice: {
        content: [
          {
            type: 'text',
            text: 'b',
          },
        ],
      },
    },
  ],
};

//#region nested

// #region expand
export const nestedExpand: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      {
        type: 'expand',
        content: [
          {
            type: 'paragraph',
            content: [],
          },
        ],
      },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 2,
      to: 2,
      slice: {
        content: [
          {
            type: 'text',
            text: 'b',
          },
        ],
      },
    },
  ],
};

export const appendToTextInExpand: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      {
        type: 'expand',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'b',
              },
            ],
          },
        ],
      },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 3,
      to: 3,
      slice: {
        content: [
          {
            type: 'text',
            text: 'a',
          },
        ],
      },
    },
  ],
};

export const textAfterEmptyParagraphInExpand: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      {
        type: 'expand',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'b',
              },
              {
                type: 'paragraph',
                content: [],
              },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        content: [],
      },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 8,
      to: 8,
      slice: {
        content: [{ type: 'text', text: 'a' }],
      },
    },
  ],
};

// #end expand region

// #region panel
export const nestedInfoPanel: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      {
        type: 'panel',

        content: [
          {
            type: 'paragraph',
            content: [],
          },
        ],
      },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 2,
      to: 2,
      slice: { content: [{ type: 'text', text: 'a' }] },
    },
  ],
};

export const appendToTextInPanel: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      {
        type: 'panel',

        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'a' }],
          },
        ],
      },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 3,
      to: 3,
      slice: { content: [{ type: 'text', text: 'b' }] },
    },
  ],
};

export const textAfterEmptyParagraphInPanel: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      {
        type: 'panel',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'a' }],
          },
        ],
      },
      {
        type: 'paragraph',
        content: [],
      },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 6,
      to: 6,
      slice: { content: [{ type: 'text', text: 'b' }] },
    },
  ],
};

// #end panel region
export const textInTableHeader: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      {
        type: 'table',
        attrs: {
          isNumberColumnEnabled: false,
          layout: 'default',
        },
        content: [
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableHeader',
                attrs: {},
                content: [
                  {
                    type: 'paragraph',
                    content: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableCell',
                attrs: {},
                content: [
                  {
                    type: 'paragraph',
                    content: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        content: [],
      },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 4,
      to: 4,
      slice: { content: [{ type: 'text', text: 'a' }] },
    },
  ],
};

export const textInTableRow: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      {
        type: 'table',
        attrs: {
          isNumberColumnEnabled: false,
          layout: 'default',
        },
        content: [
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableHeader',
                attrs: {},
                content: [
                  {
                    type: 'paragraph',
                    content: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableCell',
                attrs: {},
                content: [
                  {
                    type: 'paragraph',
                    content: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        content: [],
      },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 10,
      to: 10,
      slice: { content: [{ type: 'text', text: 'a' }] },
    },
  ],
};

export const textInInfoPanelNestedInTableRow: TestCase = {
  initialADF: {
    type: 'doc',
    content: [
      {
        type: 'table',
        attrs: {
          isNumberColumnEnabled: false,
          layout: 'default',
        },
        content: [
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableHeader',
                attrs: {},
                content: [
                  {
                    type: 'paragraph',
                    content: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableCell',
                attrs: {},
                content: [
                  {
                    type: 'panel',
                    attrs: {
                      panelType: 'info',
                    },
                    content: [
                      {
                        type: 'paragraph',
                        content: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        content: [],
      },
    ],
  },
  steps: [
    {
      stepType: 'replace',
      from: 11,
      to: 11,
      slice: { content: [{ type: 'text', text: 'a' }] },
    },
  ],
};
// #region table

// #end table region
// #end region
