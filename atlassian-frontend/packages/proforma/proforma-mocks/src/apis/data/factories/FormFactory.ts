import { each, makeFactory, Sync } from 'factory.ts';
import faker from 'faker';

import {
  FormDesign,
  FormLayout,
  FormSettings,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';

import { mockFormDesignSimple } from './mockObjects/mockFormDesignSimple';

export const formSettingsFactory = Sync.makeFactory<FormSettings>({
  templateId: each(i => i),
  name: each(i => `Template ${i}`),
  submit: {
    lock: false,
    pdf: false,
  },
});

export const formLayoutFactory = Sync.makeFactory<FormLayout>({
  version: 1,
  type: 'doc',
  content: [],
});

export const formDesignFactory = Sync.makeFactory<FormDesign>({
  settings: each(() => formSettingsFactory.build()),
  layout: [formLayoutFactory.build()],
  conditions: {},
  sections: {},
  questions: {},
});

export const templateFormFactory: Sync.Factory<TemplateForm> = makeFactory({
  id: each(i => i),
  updated: faker.date.recent(10).toISOString(),
  design: each(() => formDesignFactory.build()),
  state: undefined,
});

export const templateFormWithBasicDesignFactory = templateFormFactory.extend({
  design: each(() =>
    formDesignFactory.build({
      layout: mockFormDesignSimple.layout,
      questions: mockFormDesignSimple.questions,
    }),
  ),
});
