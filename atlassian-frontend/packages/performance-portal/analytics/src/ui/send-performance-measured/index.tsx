import { memo } from 'react';

type Props = {
  metric: { stop: () => void };
  nextEventLoop?: boolean;
};

export const SendPerformanceMeasured = memo(({ metric }: Props) => {
  metric.stop();
  return null;
});
