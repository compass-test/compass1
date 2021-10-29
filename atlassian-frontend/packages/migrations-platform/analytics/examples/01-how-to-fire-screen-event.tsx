import React from 'react';

import { AnalyticsScreenContext } from '../src';

type AllPage = 'PageA' | 'PageB' | 'PageC';

export default () => {
  return (
    <AnalyticsScreenContext<AllPage> name="PageA">
      <p>
        This is Page A, by the time you see the content of the page, a
        ScreenEvent will be emitted.
      </p>
      <p>Click the source code button to learn more</p>
    </AnalyticsScreenContext>
  );
};
