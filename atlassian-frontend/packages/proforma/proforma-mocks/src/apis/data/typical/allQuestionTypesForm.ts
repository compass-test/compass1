import {
  FormQuestionType,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';

export const allQuestionTypesForm = (): TemplateForm => ({
  id: 2,
  updated: '2019-11-07T01:23:45Z',
  design: {
    settings: {
      name: 'All Question Types',
      submit: {
        lock: false,
        pdf: false,
      },
      templateId: 2,
    },
    conditions: {},
    questions: {
      '12': {
        type: FormQuestionType.TextShort,
        label: 'Short text question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
      },
      '13': {
        type: FormQuestionType.TextLong,
        label: 'Long Text Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
      },
      '14': {
        type: FormQuestionType.TextParagraph,
        label: 'Paragraph Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
      },
      '16': {
        type: FormQuestionType.TextEmail,
        label: 'Email Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
      },
      '17': {
        type: FormQuestionType.TextUrl,
        label: 'URL Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
      },
      '18': {
        type: FormQuestionType.ChoiceSingle,
        label: 'Single Choice Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [
          {
            id: '1',
            label: 'a',
          },
          {
            id: '2',
            label: 'b',
          },
          {
            id: '3',
            label: 'c',
          },
          {
            id: '4',
            label: 'd',
          },
          {
            id: '0',
            label: 'Other...',
            other: true,
          },
        ],
      },
      '19': {
        type: FormQuestionType.ChoiceMultiple,
        label: 'Multiple Choice Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [
          {
            id: '1',
            label: 'a',
          },
          {
            id: '2',
            label: 'b',
          },
          {
            id: '3',
            label: 'c',
          },
          {
            id: '4',
            label: 'd',
          },
          {
            id: '0',
            label: 'Other...',
            other: true,
          },
        ],
      },
      '20': {
        type: FormQuestionType.ChoiceDropdown,
        label: 'Dropdown Choice Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [
          {
            id: '1',
            label: 'a',
          },
          {
            id: '2',
            label: 'b',
          },
          {
            id: '3',
            label: 'c',
          },
          {
            id: '4',
            label: 'd',
          },
          {
            id: '0',
            label: 'Other...',
            other: true,
          },
        ],
      },
      '21': {
        type: FormQuestionType.Date,
        label: 'Date Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
      },
      '22': {
        type: FormQuestionType.DateTime,
        label: 'Datetime question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
      },
      '23': {
        type: FormQuestionType.Time,
        label: 'Time Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
      },
      '24': {
        type: FormQuestionType.Number,
        label: 'Numeric Question',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
      },
      '25': {
        type: FormQuestionType.UserSingle,
        label: 'Single User',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
      },
      '26': {
        type: FormQuestionType.UserMultiple,
        label: 'Multiple Users',
        validation: {
          rq: false,
        },
        description: '',
        choices: [],
      },
      '27': {
        type: FormQuestionType.ChoiceDropdownMultiple,
        label: 'Multi dropdown',
        validation: {
          rq: true,
        },
        description: '',
        choices: [
          {
            id: '1',
            label: 'Choice A',
          },
          {
            id: '2',
            label: 'Choice B',
          },
          {
            id: '3',
            label: 'Choice C',
          },
          {
            id: '4',
            label: 'Choice D',
          },
          {
            id: '0',
            label: 'Other...',
            other: true,
          },
        ],
      },
    },
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
                text: 'All Question Types:',
              },
            ],
          },
          {
            type: 'heading',
            attrs: {
              level: 2,
            },
            content: [
              {
                type: 'text',
                text: 'Text Questions',
              },
            ],
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 12,
              },
              layout: 'default',
            },
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 13,
              },
              layout: 'default',
            },
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 14,
              },
              layout: 'default',
            },
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 16,
              },
              layout: 'default',
            },
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 17,
              },
              layout: 'default',
            },
          },
          {
            type: 'heading',
            attrs: {
              level: 2,
            },
            content: [
              {
                type: 'text',
                text: 'Choice Questions:',
              },
            ],
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 18,
              },
              layout: 'default',
            },
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 19,
              },
              layout: 'default',
            },
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 20,
              },
              layout: 'default',
            },
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 27,
              },
              layout: 'default',
            },
          },
          {
            type: 'heading',
            attrs: {
              level: 2,
            },
            content: [
              {
                type: 'text',
                text: 'Datetime questions:',
              },
            ],
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 21,
              },
              layout: 'default',
            },
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 22,
              },
              layout: 'default',
            },
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 23,
              },
              layout: 'default',
            },
          },
          {
            type: 'paragraph',
            content: [],
          },
          {
            type: 'heading',
            attrs: {
              level: 2,
            },
            content: [
              {
                type: 'text',
                text: 'Numeric Questions:',
              },
            ],
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 24,
              },
              layout: 'default',
            },
          },
          {
            type: 'heading',
            attrs: {
              level: 2,
            },
            content: [
              {
                type: 'text',
                text: 'User Picker Questions:',
              },
            ],
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 25,
              },
              layout: 'default',
            },
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 26,
              },
              layout: 'default',
            },
          },
        ],
      },
    ],
    sections: {},
  },
  state: undefined,
});
