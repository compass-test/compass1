import React, { FC } from 'react';

import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvents from '@testing-library/user-event';

import Button from '@atlaskit/button';

import {
  AnalyticsListener,
  useCallbackWithAnalyticsController,
} from '../../../src';
import type { UIPayload } from '../../../src/common/types';

describe('useCallbackWithAnalyticsController()', () => {
  const payload: UIPayload = {
    eventType: 'UI',
    action: 'coolAction',
    actionSubject: 'coolSubject',
    actionSubjectId: 'coolSubjectId',
  };

  it('should fire the underneath method callback when executing the return callback', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => {
      return useCallbackWithAnalyticsController(callback, payload);
    });

    expect(callback).toBeCalledTimes(0);
    result.current('cool');
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('cool');
  });

  it('should emit the analytic event when click', () => {
    const createUIEvent = jest.fn();
    const Component: FC = () => {
      const onClick = useCallbackWithAnalyticsController(jest.fn, payload);

      return (
        <Button onClick={onClick} testId="button">
          Click Me
        </Button>
      );
    };
    const { getByTestId } = render(
      <AnalyticsListener
        createScreenEvent={jest.fn()}
        createTrackEvent={jest.fn()}
        createUIEvent={createUIEvent}
        fallbackSourceScreen="DefaultScreen"
      >
        <Component />
      </AnalyticsListener>,
    );

    userEvents.click(getByTestId('button'));
    expect(createUIEvent).toBeCalledTimes(1);
    expect(createUIEvent).toBeCalledWith(expect.objectContaining(payload));
  });
});
