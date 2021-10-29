import React from 'react';

import { renderHook } from '@testing-library/react-hooks';

import { AnalyticsListener, useCreateUIEvent } from '../../../src';

describe('useCreateUIEvent()', () => {
  it('should be able to create and fire the migration event on the correct channel', () => {
    const createUIEvent = jest.fn();
    const {
      result: { current: createAnalyticsEvent },
    } = renderHook(
      () => {
        return useCreateUIEvent();
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
    createAnalyticsEvent({
      action: 'coolAction',
      subject: 'coolSubject',
      id: 'coolSubjectId',
    });

    expect(createUIEvent).toBeCalledTimes(1);
    expect(createUIEvent).toBeCalledWith(
      expect.objectContaining({
        eventType: 'UI',
        action: 'coolAction',
        actionSubject: 'coolSubject',
        actionSubjectId: 'coolSubjectId',
      }),
    );
  });
});
