import { StoreActionApi } from 'react-sweet-state';

import { InContextState } from './types';

export const setInContextInfo = (update: Partial<InContextState>) => ({
  setState,
}: StoreActionApi<InContextState>) => {
  setState({ ...update });
};
