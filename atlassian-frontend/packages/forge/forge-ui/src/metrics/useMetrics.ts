import MetalClient, { UserMetric } from '@atlassiansox/metal-client';
import { useContext } from 'react';
import { MetalClientContext } from '../context';
import { useCallbackOne as useCallback } from 'use-memo-one';

export type SubmitMetric = (metric: UserMetric) => void;

const submitMetric = (
  client: Promise<MetalClient> | undefined,
  metric: UserMetric,
) => {
  if (client) {
    Promise.resolve(client).then((client) => client.metric.submit(metric));
  }
};

export const useMetrics = (): { submitMetric: SubmitMetric; page: string } => {
  const { metalClient, page } = useContext(MetalClientContext);

  return {
    submitMetric: useCallback(
      (metric: UserMetric) => submitMetric(metalClient, metric),
      [metalClient],
    ),
    page,
  };
};
