import React, { useCallback } from 'react';

import { timeDuration } from '../src';

// For testing this example
export const BUTTON_TEST_ID = 'my-button';

const Button = () => {
  const anAsyncCallbackThatTakesAlongTime = useCallback(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('My timed payload :D');
        }, 1000);
      }),
    [],
  );

  const onClickCallback = useCallback(async () => {
    console.log('timed', await timeDuration(anAsyncCallbackThatTakesAlongTime));
  }, [anAsyncCallbackThatTakesAlongTime]);

  return (
    <button data-testId={BUTTON_TEST_ID} onClick={onClickCallback}>
      Emit an event
    </button>
  );
};

const Example = () => <Button />;

export default Example;
