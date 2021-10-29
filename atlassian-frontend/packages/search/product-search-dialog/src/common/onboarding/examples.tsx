import React from 'react';
import { IntlProvider } from 'react-intl';
import InlineOnboarding from './inline-onboarding';

export const Basic = () => <InlineOnboarding onClose={() => null} />;

export default {
  title: 'Common Components/Inline Onboarding',
  decorators: [
    (story: () => React.ElementType) => (
      <IntlProvider locale="en">{story()}</IntlProvider>
    ),
  ],
};
