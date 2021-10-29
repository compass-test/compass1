import React from 'react';

import {
  MockBrowserUtils,
  MockErrorUtils,
  typicalForm,
} from '@af/proforma-mocks';
import {
  AsyncIntlProvider,
  DEFAULT_LOCALE,
} from '@atlassian/proforma-translations';

import { RenderForm } from '../src/form-system';
import { FormStatus, FormVisibility } from '../src/form-system/models';
import { FormStore } from '../src/form-system/stores';
import {
  PfErrorUtilsProvider,
  PfFlagsProvider,
} from '../src/jira-common/context';

export default function RenderATypicalFormViewExample() {
  const locale = DEFAULT_LOCALE;
  const mockBrowserUtils = new MockBrowserUtils(locale);
  const mockErrorUtils = new MockErrorUtils(mockBrowserUtils);
  const formStore = new FormStore(
    () => () => Promise.resolve(),
    () => () => Promise.resolve(),
    () => Promise.resolve([]),
    {
      ...typicalForm,
      state: {
        visibility: FormVisibility.Internal,
        status: FormStatus.Open,
        answers: {},
      },
    },
  );

  return (
    <div data-testid="proforma-render-a-typical-form-view">
      <AsyncIntlProvider locale={locale}>
        <PfErrorUtilsProvider errorUtils={mockErrorUtils}>
          <PfFlagsProvider flags={{}}>
            <RenderForm
              formStore={formStore}
              revisionToken={formStore.revisionToken}
              view
            />
          </PfFlagsProvider>
        </PfErrorUtilsProvider>
      </AsyncIntlProvider>
    </div>
  );
}
