import { FC, useEffect } from 'react';

import useAnalyticsEventsController from '../../../controllers/use-analytics-events-controller';

const ScreenViewEvent: FC = () => {
  const createAnalyticsEvent = useAnalyticsEventsController();

  useEffect(() => {
    createAnalyticsEvent({ eventType: 'SCREEN' }).fire();
  }, [createAnalyticsEvent]);
  return null;
};

export default ScreenViewEvent;
