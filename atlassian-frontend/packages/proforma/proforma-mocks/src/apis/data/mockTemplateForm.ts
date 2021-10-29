import {
  FormConditions,
  FormConditionType,
  FormDesign,
  FormLayout,
  FormPublishing,
  FormQuestions,
  FormQuestionType,
  FormSections,
  FormSectionType,
  FormSettings,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';

const mockFormPublishing: FormPublishing = {
  jira: {
    issueRequestTypeIds: [1],
    newIssueIssueTypeIds: [1],
    newIssueRequestTypeIds: [1],
    submitOnCreate: true,
    validateOnCreate: true,
  },
  portal: {
    portalRequestTypeIds: [1],
    submitOnCreate: true,
    validateOnCreate: true,
  },
};

const mockFormSettings: FormSettings = {
  templateId: 1,
  name: 'Sample template form',
  submit: {
    lock: false,
    pdf: false,
  },
};

const mockFormLayout: FormLayout[] = [
  {
    version: 1,
    type: 'doc',
    content: [
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
    ],
  },
  {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'extension',
        attrs: {
          extensionType: 'com.thinktilt.proforma',
          extensionKey: 'question',
          parameters: {
            id: 5,
          },
          layout: 'default',
        },
      },
    ],
  },
];

const mockFormConditions: FormConditions = {
  '3': {
    t: FormConditionType.Show,
    i: {
      co: {
        cIds: {
          '2': ['1'],
        },
      },
    },
    o: {
      sIds: ['1'],
    },
  },
};

const mockFormSections: FormSections = {
  '1': {
    name: 'Conditional section',
    conditions: ['3'],
    type: FormSectionType.Block,
  },
};

const mockFormQuestions: FormQuestions = {
  '1': {
    type: FormQuestionType.ChoiceSingle,
    label: 'Radio',
    description: '',
    validation: {
      rq: false,
    },
    choices: [
      {
        id: '1',
        label: 'Radio 1',
        other: false,
      },
      {
        id: '2',
        label: 'Radio 2',
        other: false,
      },
      {
        id: '3',
        label: 'Radio 3',
        other: false,
      },
      {
        id: '4',
        label: 'Radio 4',
        other: false,
      },
    ],
    questionKey: '',
  },
  '2': {
    type: FormQuestionType.ChoiceMultiple,
    label: 'Checkbox',
    description: '',
    validation: {
      rq: false,
    },
    choices: [
      {
        id: '1',
        label: 'Show next section',
        other: false,
      },
      {
        id: '2',
        label: 'Choice B',
        other: false,
      },
      {
        id: '3',
        label: 'Choice C',
        other: false,
      },
    ],
    questionKey: '',
  },
  '5': {
    type: FormQuestionType.Date,
    label: 'Pick a date',
    description: '',
    validation: {
      rq: false,
    },
    choices: [],
    questionKey: '',
  },
};

const mockFormDesign: FormDesign = {
  settings: mockFormSettings,
  layout: mockFormLayout,
  conditions: mockFormConditions,
  sections: mockFormSections,
  questions: mockFormQuestions,
};

export const mockTemplateForm: TemplateForm = {
  id: 1,
  state: undefined,
  updated: '2021-07-22T06:47:16.361Z',
  publish: mockFormPublishing,
  design: mockFormDesign,
};
