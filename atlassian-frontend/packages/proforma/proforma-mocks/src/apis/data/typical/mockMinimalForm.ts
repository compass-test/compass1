import { TemplateForm } from '@atlassian/proforma-common-core/form-system-models';

/**
 * A blank form where the publish settings are undefined. This will be the case for a brand
 * new form which has just been created.
 */
export const mockMinimalForm: TemplateForm = {
  id: 98,
  updated: '2021-09-27T08:07:45Z',
  design: {
    settings: {
      templateId: 98,
      name: 'Absolute minimal `TemplateForm`',
      submit: {
        lock: false,
        pdf: false,
      },
    },
    layout: [],
    conditions: {},
    sections: {},
    questions: {},
  },
  state: undefined,
};
