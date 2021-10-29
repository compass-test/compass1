import { useEffect, useMemo } from 'react';
import {
  SpaParentClient,
  SpaParentClientOptions,
} from '@atlassiansox/iframe-plugin';

export function useSpaHostClient(
  options: SpaParentClientOptions,
  deps: any[] = [options.src],
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const client = useMemo(() => new SpaParentClient(options), deps);

  useEffect(
    () => () => {
      return client.cleanup();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );
  return client;
}
