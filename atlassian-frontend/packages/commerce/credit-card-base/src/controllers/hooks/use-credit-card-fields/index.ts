import { useCallback, useContext } from 'react';

import { formStateContext } from '../../context';

export const useCardFieldUpdate = <T>(
  name: string,
  transformer: (e: T) => string,
) => {
  const [, setState] = useContext(formStateContext);
  return useCallback(
    (value: T) => setState(name, transformer(value)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, setState], // do not put transformer into deps
  );
};

export const useCardFields = () => {
  const [state] = useContext(formStateContext);
  return state;
};
