import { useContext } from 'react';

import { formStateRefs } from '../../context';

export const useElementsAreReady = () => {
  const [state] = useContext(formStateRefs);
  const values = Object.values(state);
  if (values.length <= 0) {
    return false;
  }

  return values.every((ref) => ref !== undefined && ref.ready);
};

export const useElementsDidFail = () => {
  const [state] = useContext(formStateRefs);
  const values = Object.values(state);
  if (values.length <= 0) {
    return false;
  }

  return values.some((ref) => ref !== undefined && ref.failed);
};
