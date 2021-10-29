import React, { ReactElement } from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { TeamsCardError } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider locale="en">{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const TeamsCardErrorExample = () => {
  return <TeamsCardError description={'test error content'} />;
};
