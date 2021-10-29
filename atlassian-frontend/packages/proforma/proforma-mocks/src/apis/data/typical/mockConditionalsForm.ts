import {
  FormConditionType,
  FormQuestionType,
  FormSectionType,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';

export const mockConditionalsForm: TemplateForm = {
  id: 34,
  updated: '2020-01-07T05:14:42.353Z',
  design: {
    settings: {
      templateId: 1,
      name: 'Conditional sections',
      submit: {
        lock: false,
        pdf: false,
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
                text: 'Conditional test',
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
                text: 'Visible section',
              },
            ],
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 3,
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
                id: 4,
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
                id: 8,
              },
              layout: 'default',
            },
          },
        ],
      },
      {
        version: 1,
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: {
              level: 2,
            },
            content: [
              {
                type: 'text',
                text: 'Hidden section',
              },
            ],
          },
          {
            type: 'extension',
            attrs: {
              extensionType: 'com.thinktilt.proforma',
              extensionKey: 'question',
              parameters: {
                id: 6,
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
                id: 7,
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
        ],
      },
      {
        version: 1,
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: {
              level: 2,
            },
            content: [
              {
                type: 'text',
                text: 'Hidden Section 2',
              },
            ],
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
        ],
      },
      {
        version: 1,
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: {
              level: 2,
            },
            content: [
              {
                type: 'text',
                text: 'Hidden section 3',
              },
            ],
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
        ],
      },
    ],
    conditions: {
      '12': {
        t: FormConditionType.Show,
        i: {
          co: {
            cIds: {
              '8': ['9'],
            },
          },
        },
        o: {
          sIds: ['1'],
        },
      },
      '24': {
        t: FormConditionType.Show,
        i: {
          co: {
            cIds: {
              '13': ['14'],
            },
          },
        },
        o: {
          sIds: ['2'],
        },
      },
      '25': {
        t: FormConditionType.Show,
        i: {
          co: {
            cIds: {
              '18': ['19', '21'],
            },
          },
        },
        o: {
          sIds: ['3'],
        },
      },
    },
    sections: {
      '1': {
        type: FormSectionType.Block,
        name: 'Hidden section',
        conditions: ['12'],
      },
      '2': {
        type: FormSectionType.Block,
        name: 'Hidden Section 2',
        conditions: ['24', '12'],
      },
      '3': {
        type: FormSectionType.Block,
        name: 'Hidden section 3',
        conditions: ['25', '24', '12'],
      },
    },
    questions: {
      '8': {
        type: FormQuestionType.ChoiceSingle,
        label: 'Choice question ',
        validation: {},
        choices: [
          {
            id: '9',
            label: 'Show section',
          },
          {
            id: '10',
            label: 'Hide Section',
          },
        ],
      },
      '23': {
        type: FormQuestionType.TextLong,
        label: 'Hello world',
        validation: {},
      },
      '4': {
        type: FormQuestionType.TextLong,
        label: 'Hello world 2',
        validation: {},
      },
      '13': {
        type: FormQuestionType.ChoiceSingle,
        label: 'Show hidden section 2',
        validation: {},
        choices: [
          {
            id: '14',
            label: 'true',
          },
          {
            id: '15',
            label: 'false',
          },
        ],
      },
      '6': {
        type: FormQuestionType.TextLong,
        label: 'Hidden Question 1',
        validation: {
          rq: true,
        },
      },
      '17': {
        type: FormQuestionType.TextLong,
        label: 'Hello World',
        validation: {},
      },
      '18': {
        type: FormQuestionType.ChoiceMultiple,
        label: 'Show hidden section 3',
        validation: {},
        choices: [
          {
            id: '19',
            label: 'true',
          },
          {
            id: '20',
            label: 'false',
          },
          {
            id: '21',
            label: 'also true',
          },
        ],
      },
      '7': {
        type: FormQuestionType.TextLong,
        label: 'Hidden Question 2',
        validation: {},
      },
      '3': {
        type: FormQuestionType.TextLong,
        label: 'Helo world',
        validation: {},
      },
    },
  },
  state: undefined,
};
