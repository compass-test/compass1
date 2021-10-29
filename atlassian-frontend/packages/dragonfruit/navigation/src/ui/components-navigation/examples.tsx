import React, { ReactElement } from 'react';

import { CompassIntlProvider } from '@atlassian/dragonfruit-utils';

import { ComponentsNavigation } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassIntlProvider locale="en">{storyFn()}</CompassIntlProvider>
    ),
  ],
};

export const ComponentsNavigationExample = () => {
  return <ComponentsNavigation />;
};
