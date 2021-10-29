import { StoreActionApi } from 'react-sweet-state';

import { AccessGroupState } from './types';

export const setAccessGroupInfo = (update: Partial<AccessGroupState>) => ({
  setState,
}: StoreActionApi<AccessGroupState>) => {
  setState({ ...update });
};
