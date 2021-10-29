import React, { useCallback } from 'react';

import { timeDurationSync } from '../src';

// For testing this example
export const BUTTON_TEST_ID = 'my-button';

const Button = () => {
  const aCallbackThatTakesAlongTime = useCallback(() => {
    let sum = 0;

    for (let i = 0; i < 100000; i++) {
      sum += Math.random();
    }

    return sum;
  }, []);

  const onClickCallback = useCallback(() => {
    console.log('timed', timeDurationSync(aCallbackThatTakesAlongTime));
  }, [aCallbackThatTakesAlongTime]);

  return (
    <button data-testId={BUTTON_TEST_ID} onClick={onClickCallback}>
      Emit an event
    </button>
  );
};

const Example = () => <Button />;

export default Example;
