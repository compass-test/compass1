import React, { ReactElement, useState } from 'react';

import ProgressBar from './index';

export default {
  decorators: [(storyFn: () => ReactElement) => storyFn()],
};

export const ProgressBarExample = () => (
  <>
    <div>
      {[...Array(11).keys()].map((i) => (
        <ProgressBar progress={10 * i} />
      ))}
    </div>

    <br />

    <div>
      {[...Array(11).keys()].map((i) => (
        <ProgressBar progress={10 * i} size={'medium'} />
      ))}
    </div>
  </>
);

export const ProgressBarInteractiveExample = () => {
  const [progress, setProgress] = useState<number>(50);
  const increaseProgress = () => setProgress(Math.min(progress + 10, 100));
  const decreaseProgress = () => setProgress(Math.max(progress - 10, 0));
  return (
    <div>
      <ProgressBar progress={progress} />
      <ProgressBar progress={progress} size={'medium'} />
      <br />
      <br />
      <button onClick={increaseProgress}>+ Increase progress</button>
      <button onClick={decreaseProgress}>- Decrease progress</button>
    </div>
  );
};
