import { useContext } from 'react';

import { AppProvidersContext } from '../../../index';
import { AppProviders } from '../../types';

type UseProviders = <K extends keyof AppProviders>(
  keys: K[],
) => Array<AppProviders[K]>;

export const useProviders: UseProviders = keys => {
  const appProviders = useContext(AppProvidersContext) as AppProviders;
  return keys.map(key => appProviders[key]);
};
