import { useContext } from 'react';

import { formErrorContext } from '../../context';

export const useCreditCardFailure = () => useContext(formErrorContext)[0];

export const useSetCreditCardFailure = () => useContext(formErrorContext)[1];
