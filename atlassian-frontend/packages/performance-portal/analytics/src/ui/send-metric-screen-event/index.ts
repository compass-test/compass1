import { useLayoutEffect } from 'react';

import { sendScreenEvent } from '../../utils/analytics-web-client';

type Props = {
  eventKey: string;
};

export const SendMetricScreenEvent = ({ eventKey }: Props) => {
  useLayoutEffect(() => {
    sendScreenEvent(`metricScreen`, { metric: eventKey });
  }, [eventKey]);
  return null;
};
