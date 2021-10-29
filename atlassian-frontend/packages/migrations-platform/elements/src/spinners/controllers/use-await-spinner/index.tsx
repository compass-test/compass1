import React, { useEffect, useState } from 'react';

import Spinner from '@atlaskit/spinner';
import { SpinnerProps } from '@atlaskit/spinner/types';

type Status = 'Loading' | 'Loaded';

type Props<V> = {
  value: V | Promise<V>;
  valueOnError: V;
  spinnerProps: SpinnerProps;
};

type State<Value> = {
  resolvedValue?: Value;
  status: Status;
};

const useAwaitSpinner = <V extends {}>({
  value,
  valueOnError,
  spinnerProps,
}: Props<V>): [V | undefined, JSX.Element | null] => {
  const [state, setState] = useState<State<V>>({ status: 'Loading' });
  const { resolvedValue, status } = state;

  useEffect(() => {
    if (value instanceof Promise) {
      value
        .then((result) => {
          setState({ resolvedValue: result, status: 'Loaded' });
        })
        .catch(() => {
          setState({ resolvedValue: valueOnError, status: 'Loaded' });
        });
    }
  }, [value, valueOnError]);

  // Value is a Promise then we need to wait for the status to change.
  if (value instanceof Promise) {
    if (status === 'Loading') {
      return [undefined, <Spinner delay={50} {...spinnerProps} />];
    }

    return [resolvedValue, null];
  }

  // Value is a primitive then we complete this spinner right away.
  return [value, null];
};

export default useAwaitSpinner;
