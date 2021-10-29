import { TemplateForm } from '@atlassian/proforma-common-core/form-system-models';

export const mockBlankForm: TemplateForm = {
  id: 99,
  updated: '2019-11-07T01:23:45Z',
  design: {
    settings: {
      name: 'Blank Form',
      submit: {
        lock: false,
        pdf: false,
      },
      templateId: 3,
    },
    conditions: {},
    questions: {},
    layout: [
      {
        version: 1,
        type: 'doc',
        content: [],
      },
    ],
    sections: {},
  },
  state: undefined,
};
