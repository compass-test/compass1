import { useContext } from 'react';

import { RequestState } from '../../../common/utils/state/types';
import { formContext } from '../../context';

/**
 * returns current form state
 */
export const useCreditCardState = (): RequestState =>
  useContext(formContext).state;
