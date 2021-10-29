import React, { ReactElement, useState } from 'react';

import { IntlProvider } from 'react-intl';

import CircularProgress from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <IntlProvider locale="en">{storyFn()}</IntlProvider>
    ),
  ],
};

export const CircularProgressExample = () => (
  <div>
    {[...Array(11).keys()].map((i) => (
      <CircularProgress
        progress={10 * i}
        mediumThreshold={50}
        highThreshold={80}
      />
    ))}
  </div>
);

export const CircularProgressInteractiveExample = () => {
  const [progress, setProgress] = useState<number>(50);
  const increaseProgress = () => setProgress(Math.min(progress + 10, 100));
  const decreaseProgress = () => setProgress(Math.max(progress - 10, 0));
  return (
    <div>
      <CircularProgress
        progress={progress}
        mediumThreshold={50}
        highThreshold={80}
      />
      <button onClick={increaseProgress}>+ Increase progress</button>
      <button onClick={decreaseProgress}>- Decrease progress</button>
    </div>
  );
};
