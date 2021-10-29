import { TemplateForm } from '@atlassian/proforma-common-core/form-system-models';

export const mockNoQuestionForm: TemplateForm = {
  id: 4,
  updated: '2019-11-07T01:23:45Z',
  design: {
    settings: {
      name: 'No Questions form',
      submit: {
        lock: false,
        pdf: false,
      },
      templateId: 4,
    },
    conditions: {},
    questions: {},
    layout: [
      {
        version: 1,
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: {
              level: 1,
            },
            content: [
              {
                type: 'text',
                text:
                  'This is a Form with only ADF content, no ProForma questions.',
              },
            ],
          },
          {
            type: 'orderedList',
            content: [
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'One',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Two',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Three',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Four',
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
                    attrs: {
                      colwidth: [340],
                    },
                    content: [
                      {
                        type: 'paragraph',
                        content: [
                          {
                            type: 'text',
                            text: 'Hello ',
                            marks: [
                              {
                                type: 'strong',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'tableHeader',
                    attrs: {
                      colwidth: [340],
                    },
                    content: [
                      {
                        type: 'paragraph',
                        content: [
                          {
                            type: 'text',
                            text: 'John',
                            marks: [
                              {
                                type: 'strong',
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
                type: 'tableRow',
                content: [
                  {
                    type: 'tableCell',
                    attrs: {
                      colwidth: [340],
                    },
                    content: [
                      {
                        type: 'paragraph',
                        content: [
                          {
                            type: 'text',
                            text: 'World',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'tableCell',
                    attrs: {
                      colwidth: [340],
                    },
                    content: [
                      {
                        type: 'paragraph',
                        content: [
                          {
                            type: 'text',
                            text: 'Doe',
                          },
                        ],
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
                    attrs: {
                      colwidth: [340],
                    },
                    content: [
                      {
                        type: 'paragraph',
                        content: [],
                      },
                    ],
                  },
                  {
                    type: 'tableCell',
                    attrs: {
                      colwidth: [340],
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
          {
            type: 'paragraph',
            content: [],
          },
        ],
      },
    ],
    sections: {},
  },
  state: undefined,
};
