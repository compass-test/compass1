import { useCreditCardState } from '../use-credit-card-state';
import { useElementsAreReady } from '../use-elements-state';

/**
 * Returns is CC form if is completely ready
 */
export const useCreditCardIsReady = () => {
  const state = useCreditCardState();
  const elementsReady = useElementsAreReady();

  return state === 'complete' && elementsReady;
};
