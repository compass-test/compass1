import React from 'react';

import { useLoadingValue } from '../../controllers';
import LoadingInlineValue from '../loading-inline-value';

/**
 * Presents useLoadingValue state with a spinner when needed
 * Loads/Reloads value from provider prop
 */
const ProviderInlineValue = <Data extends {} | null>({
  provider,
  reducer,
}: {
  provider: (...args: any[]) => Promise<Data>;
  reducer: (data?: Data) => React.ReactNode;
}): JSX.Element => {
  const [data, dataStatus] = useLoadingValue(provider);
  const value = reducer(data);
  return (
    <LoadingInlineValue isLoading={dataStatus !== 'loaded'}>
      {value}
    </LoadingInlineValue>
  );
};

export default ProviderInlineValue;
