import {
  FormDesign,
  FormQuestionType,
} from '@atlassian/proforma-common-core/form-system-models';

export const mockFormDesignSimple: FormDesign = {
  settings: {
    templateId: 1,
    name: 'A Simple Form',
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
              text: 'A simple form',
            },
          ],
        },
        {
          type: 'extension',
          attrs: {
            extensionType: 'com.thinktilt.proforma',
            extensionKey: 'question',
            parameters: {
              id: 1,
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
              id: 2,
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
              id: 3,
            },
            layout: 'default',
          },
        },
        {
          type: 'paragraph',
          content: [],
        },
      ],
    },
  ],
  conditions: {},
  sections: {},
  questions: {
    '1': {
      type: FormQuestionType.TextLong,
      label: 'Summary',
      description: '',
      validation: {
        rq: true,
      },
      jiraField: 'summary',
      questionKey: '',
    },
    '2': {
      type: FormQuestionType.ChoiceSingle,
      label: 'Choose one',
      description: '',
      validation: {
        rq: true,
      },
      choices: [
        {
          id: '1',
          label: 'α: Alpha',
          other: false,
        },
        {
          id: '2',
          label: 'β: Beta',
          other: false,
        },
        {
          id: '3',
          label: 'γ: Gamma',
          other: false,
        },
      ],
      questionKey: '',
    },
    '3': {
      type: FormQuestionType.ChoiceMultiple,
      label: 'Choose several',
      description: '',
      validation: {
        rq: true,
      },
      choices: [
        {
          id: '1',
          label: 'δ: Delta',
          other: false,
        },
        {
          id: '2',
          label: 'ε: Epsilon',
          other: false,
        },
        {
          id: '3',
          label: 'ζ: Zeta',
          other: false,
        },
        {
          id: '4',
          label: 'η: Eta',
          other: false,
        },
        {
          id: '5',
          label: 'θ: Theta',
          other: false,
        },
        {
          id: '6',
          label: 'ι: Iota',
          other: false,
        },
      ],
      questionKey: '',
    },
  },
};
