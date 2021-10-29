import { useCallback } from 'react';

import type { LegacyUIPayload, UIPayload } from '../../common/types';
import useAnalyticsEventsController from '../use-analytics-events-controller';

type CreateUIEvent = (payload: LegacyUIPayload) => void;

/**
 * @deprecated
 * This hook exists for backward compatability reason.
 * You should not use this hook in your new component.
 * It accepts obseleted payload format and should not be continued.
 * Use `useAnalyticsEventsController` if you can.
 **/
const useCreateUIEventController = (): CreateUIEvent => {
  const createMigrationEvent = useAnalyticsEventsController();

  return useCallback<CreateUIEvent>(
    (payload) => {
      const mappedPayload: UIPayload = {
        eventType: 'UI',
        action: payload.action,
        actionSubject: payload.subject,
        actionSubjectId: payload.id,
        attributes: payload.attributes,
      };

      // Unlike `useAnalyticsEventsController`, this hook not only create the event but fire it right after the creation
      createMigrationEvent(mappedPayload).fire();
    },
    [createMigrationEvent],
  );
};

export default useCreateUIEventController;
