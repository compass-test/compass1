import React, { FC, useEffect } from 'react';

import { render } from '@testing-library/react';
import userEvents from '@testing-library/user-event';

import {
  AnalyticsListener,
  AnalyticsScreenContext,
  ScreenViewEvent,
  useCallbackWithAnalyticsController,
} from '../../../src';
import type { TrackPayload, UIPayload } from '../../../src/common/types';
import {
  getSourceScreenFromContext,
  isMigrationPayload,
  Props,
} from '../../../src/ui/analytics-listener';

type AllScreen = 'ScreenA' | 'ScreenB' | 'ScreenC' | 'DefaultScreen';
type AllProps = Props<AllScreen>;

describe('<AnalyticsListener />', () => {
  let createScreenEvent: jest.MockedFunction<AllProps['createScreenEvent']>;
  let createTrackEvent: jest.MockedFunction<AllProps['createTrackEvent']>;
  let createUIEvent: jest.MockedFunction<AllProps['createUIEvent']>;

  beforeEach(() => {
    createScreenEvent = jest.fn();
    createTrackEvent = jest.fn();
    createUIEvent = jest.fn();
  });

  it('should handle the emitted screen event', () => {
    render(
      <AnalyticsListener<AllScreen>
        createScreenEvent={createScreenEvent}
        createTrackEvent={createTrackEvent}
        createUIEvent={createUIEvent}
        fallbackSourceScreen="DefaultScreen"
      >
        <AnalyticsScreenContext<AllScreen> name="ScreenA">
          <p>Screen A</p>
        </AnalyticsScreenContext>
      </AnalyticsListener>,
    );

    expect(createScreenEvent).toBeCalledTimes(1);
    expect(createTrackEvent).toBeCalledTimes(0);
    expect(createUIEvent).toBeCalledTimes(0);
    expect(createScreenEvent).toBeCalledWith(
      expect.objectContaining({
        name: 'ScreenA',
        timestamp: expect.any(Number),
      }),
    );
  });

  it('should handle the unrecognised screen event', () => {
    // Emit screen event without wrapping in a context
    render(
      <AnalyticsListener<AllScreen>
        createScreenEvent={createScreenEvent}
        createTrackEvent={createTrackEvent}
        createUIEvent={createUIEvent}
        fallbackSourceScreen="DefaultScreen"
      >
        <p>Screen Z</p>
        <ScreenViewEvent />
      </AnalyticsListener>,
    );

    expect(createScreenEvent).toBeCalledTimes(1);
    expect(createTrackEvent).toBeCalledTimes(0);
    expect(createUIEvent).toBeCalledTimes(0);
    expect(createScreenEvent).toBeCalledWith(
      expect.objectContaining({
        name: 'DefaultScreen',
        timestamp: expect.any(Number),
      }),
    );
  });

  it('should handle the ui event', () => {
    const callback = jest.fn();
    const payload: UIPayload = {
      eventType: 'UI',
      action: 'coolAction',
      actionSubject: 'coolSubject',
      actionSubjectId: 'coolSubjectId',
      attributes: { cool: 1234 },
    };
    const Component: FC = () => {
      const onClick = useCallbackWithAnalyticsController(callback, payload);

      return (
        <button onClick={onClick} data-testid="button">
          Click Me
        </button>
      );
    };
    const { getByTestId } = render(
      <AnalyticsListener<AllScreen>
        createScreenEvent={createScreenEvent}
        createTrackEvent={createTrackEvent}
        createUIEvent={createUIEvent}
        fallbackSourceScreen="DefaultScreen"
      >
        <Component />
      </AnalyticsListener>,
    );

    userEvents.click(getByTestId('button'));
    expect(callback).toBeCalledTimes(1);
    expect(createScreenEvent).toBeCalledTimes(0);
    expect(createTrackEvent).toBeCalledTimes(0);
    expect(createUIEvent).toBeCalledTimes(1);
    expect(createUIEvent).toBeCalledWith(
      expect.objectContaining({
        ...payload,
        timestamp: expect.any(Number),
      }),
    );
  });

  it('should handle the ui event, and map the planId attribute to container', () => {
    const callback = jest.fn();
    const payload: UIPayload = {
      eventType: 'UI',
      action: 'coolAction',
      actionSubject: 'coolSubject',
      actionSubjectId: 'coolSubjectId',
      attributes: { planId: 'plan-123', cool: 123 },
    };
    const Component: FC = () => {
      const onClick = useCallbackWithAnalyticsController(callback, payload);

      return (
        <button onClick={onClick} data-testid="button">
          Click Me
        </button>
      );
    };
    const { getByTestId } = render(
      <AnalyticsListener<AllScreen>
        createScreenEvent={createScreenEvent}
        createTrackEvent={createTrackEvent}
        createUIEvent={createUIEvent}
        fallbackSourceScreen="DefaultScreen"
      >
        <Component />
      </AnalyticsListener>,
    );

    userEvents.click(getByTestId('button'));
    expect(callback).toBeCalledTimes(1);
    expect(createScreenEvent).toBeCalledTimes(0);
    expect(createTrackEvent).toBeCalledTimes(0);
    expect(createUIEvent).toBeCalledTimes(1);
    expect(createUIEvent).toBeCalledWith(
      expect.objectContaining({
        ...payload,
        timestamp: expect.any(Number),
        container: { containerType: 'plan', containerId: 'plan-123' },
      }),
    );
  });

  it('should handle the track event', () => {
    const callback = jest.fn();
    const payload: TrackPayload = {
      eventType: 'TRACK',
      action: 'started',
      actionSubject: 'plan',
      actionSubjectId: 'coolSubjectId',
    };
    const Component: FC = () => {
      const onClick = useCallbackWithAnalyticsController(callback, payload);

      return (
        <button onClick={onClick} data-testid="button">
          Click Me
        </button>
      );
    };
    const { getByTestId } = render(
      <AnalyticsListener<AllScreen>
        createScreenEvent={createScreenEvent}
        createTrackEvent={createTrackEvent}
        createUIEvent={createUIEvent}
        fallbackSourceScreen="DefaultScreen"
      >
        <Component />
      </AnalyticsListener>,
    );

    userEvents.click(getByTestId('button'));
    expect(callback).toBeCalledTimes(1);
    expect(createScreenEvent).toBeCalledTimes(0);
    expect(createTrackEvent).toBeCalledTimes(1);
    expect(createUIEvent).toBeCalledTimes(0);
    expect(createTrackEvent).toBeCalledWith(
      expect.objectContaining({ ...payload, timestamp: expect.any(Number) }),
    );
  });

  it('should not re-render if props instances unchanged', () => {
    const callback = jest.fn();
    const ChildComponent: FC = () => {
      useEffect(callback, [callback]);

      return <p>Dummy Dummy</p>;
    };
    const WrapperComponent: FC = () => {
      return (
        <AnalyticsListener<AllScreen>
          createScreenEvent={createScreenEvent}
          createTrackEvent={createTrackEvent}
          createUIEvent={createUIEvent}
          fallbackSourceScreen="DefaultScreen"
        >
          <ChildComponent />
        </AnalyticsListener>
      );
    };
    const { rerender } = render(<WrapperComponent />);

    expect(callback).toBeCalledTimes(1);
    rerender(<WrapperComponent />);
    expect(callback).toBeCalledTimes(1);
  });
});

describe('isMigrationPayload()', () => {
  it('should recognise the migration paylod', () => {
    expect(isMigrationPayload({ eventType: 'SCREEN' })).toBeTruthy();
    expect(isMigrationPayload({ eventType: 'UI' })).toBeTruthy();
    expect(isMigrationPayload({ eventType: 'TRACK' })).toBeTruthy();
  });

  it('should not recognise other kinds of payload', () => {
    expect(isMigrationPayload({ eventType: 'unknown' })).toBeFalsy();
  });
});

describe('getSourceScreenFromContext()', () => {
  it('should extract the source property from the contexts', () => {
    expect(
      getSourceScreenFromContext<AllScreen>(
        [{ source: 'ScreenA' }, { random: 'property' }],
        'DefaultScreen',
      ),
    ).toBe('ScreenA');
  });

  it('should extract the last source property from the contexts', () => {
    expect(
      getSourceScreenFromContext<AllScreen>(
        [{ source: 'ScreenA' }, { source: 'ScreenB' }],
        'DefaultScreen',
      ),
    ).toBe('ScreenB');
  });

  it('should return the default property if no source found', () => {
    expect(
      getSourceScreenFromContext<AllScreen>(
        [{ whatever: 'propertyA' }, { whatever: 'propertyB' }],
        'DefaultScreen',
      ),
    ).toBe('DefaultScreen');
  });
});
