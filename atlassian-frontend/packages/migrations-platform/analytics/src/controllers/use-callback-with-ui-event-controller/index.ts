import { useCallback } from 'react';

import { isUIAnalyticsEvent } from '@atlaskit/analytics-next';

import { MPT_ANALYTICS_CHANNEL } from '../../common/constants';
import type { AllMigrationPayload } from '../../common/types';

type AnyFunction = (...args: any[]) => void;

const useCallbackWithUIEventController = (
  method: AnyFunction,
  payload?: Partial<AllMigrationPayload>,
): AnyFunction => {
  return useCallback<AnyFunction>(
    (...args) => {
      if (args.length > 0) {
        const clonedArgs = [...args];

        // Extracting assumed pass-through analytic event from AK
        const analyticsEvent = clonedArgs.splice(clonedArgs.length - 1, 1)[0];

        // Verifying the assumed pass-through analytic event
        if (isUIAnalyticsEvent(analyticsEvent)) {
          // Update the analytic event with payload
          if (payload) {
            analyticsEvent.update(payload);
          }

          // Update the payload to eventType ui
          analyticsEvent.update({ eventType: 'UI' });

          // Clone the analytic event before fire
          const clonedAnalyticsEvent = analyticsEvent.clone();

          // Fire on the MPT channel
          analyticsEvent.fire(MPT_ANALYTICS_CHANNEL);

          // Reinvoke the method and pass the cloned analytic event
          method(...clonedArgs, clonedAnalyticsEvent);
          return;
        }
      }
      // Last arg is not an event, or no arg, leads to noop
      method(...args);
    },
    [method, payload],
  );
};

export default useCallbackWithUIEventController;
