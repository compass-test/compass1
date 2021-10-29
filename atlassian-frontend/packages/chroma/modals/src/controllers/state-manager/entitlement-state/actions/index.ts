import { StoreActionApi } from 'react-sweet-state';

import { EntitlementState } from './types';

export const setEntitlementInfo = (update: Partial<EntitlementState>) => ({
  setState,
}: StoreActionApi<EntitlementState>) => {
  setState({ ...update });
};
