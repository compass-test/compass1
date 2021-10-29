import React, { PropsWithChildren } from 'react';

import { IntlProvider } from 'react-intl';

import ChoiceButton, { Props } from './index';

export const ChoiceButtonPrimary = (
  props: Partial<PropsWithChildren<Props>>,
) => {
  return (
    <IntlProvider locale="en">
      <ChoiceButton
        appearance="default"
        destination="projects"
        getUrl={async () => {
          return 'dummy-url';
        }}
        {...props}
      />
    </IntlProvider>
  );
};
