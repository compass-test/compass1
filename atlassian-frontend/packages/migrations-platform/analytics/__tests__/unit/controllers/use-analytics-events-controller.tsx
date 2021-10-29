import React from 'react';

import { renderHook } from '@testing-library/react-hooks';

import { AnalyticsListener, useAnalyticsEventsController } from '../../../src';
import type { UIPayload } from '../../../src/common/types';

describe('useAnalyticsEventsController()', () => {
  const payload: UIPayload = {
    eventType: 'UI',
    action: 'coolAction',
    actionSubject: 'coolSubject',
    actionSubjectId: 'coolSubjectId',
  };

  it('should be able to create migration event', () => {
    const {
      result: { current: createAnalyticsEvent },
    } = renderHook(() => {
      return useAnalyticsEventsController();
    });
    const event = createAnalyticsEvent(payload);

    expect(event.payload).toEqual(payload);
  });

  it('should be able to fire the migration event on the correct channel', () => {
    const createUIEvent = jest.fn();
    const {
      result: { current: createAnalyticsEvent },
    } = renderHook(
      () => {
        return useAnalyticsEventsController();
      },
      {
        wrapper: ({ children }) => {
          return (
            <AnalyticsListener
              createScreenEvent={jest.fn()}
              createTrackEvent={jest.fn()}
              createUIEvent={createUIEvent}
              fallbackSourceScreen="DefaultScreen"
            >
              {children}
            </AnalyticsListener>
          );
        },
      },
    );
    const event = createAnalyticsEvent(payload);

    event.fire();
    expect(createUIEvent).toBeCalledTimes(1);
    expect(createUIEvent).toBeCalledWith(expect.objectContaining(payload));
  });
});
