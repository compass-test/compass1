import {
  useHandlerUnenroll,
  usePluginSetErrorHandler,
  usePluginAddErrorHandler,
} from '../errorHandler';
import { useExperiment } from '../../core';
import { usePluginExtend } from '../extend';
import { ExperimentAnalytics } from '../../abstract/analytics';

const mockPipeline: ExperimentAnalytics = {
  analytics: {
    sendTrackEvent: jest.fn(),
    sendUIEvent: jest.fn(),
    sendScreenEvent: jest.fn(),
    sendOperationalEvent: jest.fn(),
    fireExperimentError: jest.fn(),
  },
};
beforeEach(() => {
  jest.clearAllMocks();
});

describe('usePluginSetErrorHandler', () => {
  test('runs the handler func on error', () => {
    const myEvent = {
      action: 'error',
      actionSubject: 'experiment',
    };
    const someError = new Error('some error');

    const pipeline = useExperiment(
      usePluginExtend(mockPipeline),
      usePluginSetErrorHandler((error, pipeline) => {
        pipeline.analytics.sendOperationalEvent(myEvent);
      }),
      usePluginExtend((): {} => {
        throw someError;
      }),
    );

    expect(pipeline.analytics.sendOperationalEvent).toHaveBeenCalledWith(
      myEvent,
    );
    expect(pipeline.error).toEqual(
      expect.objectContaining({
        rawError: someError,
        pluginIndex: 2,
      }),
    );
  });

  test('replaces the previously-set handler', () => {
    const oldHandler = jest.fn();
    const newHandler = jest.fn();

    const pipeline = useExperiment(
      usePluginExtend(mockPipeline),
      usePluginExtend({
        errorHandler: oldHandler,
      }),
      usePluginSetErrorHandler(newHandler),
      usePluginExtend((): {} => {
        throw new Error('some error');
      }),
    );

    expect(pipeline.error).toBeTruthy();
    expect(oldHandler).not.toHaveBeenCalled();
    expect(newHandler).toHaveBeenCalled();
  });

  test('does not call the handler if no errors were thrown', () => {
    const mockHandler = jest.fn();
    const pipeline = useExperiment(
      usePluginExtend(mockPipeline),
      usePluginSetErrorHandler(mockHandler),
      usePluginExtend(() => ({
        success: true,
      })),
    );

    expect(pipeline).toMatchObject({ success: true });
    expect(mockHandler).not.toHaveBeenCalled();
  });
});

describe('usePluginAddErrorHandler', () => {
  test('adds a handler to be run on error after the previously-set handler', () => {
    const handlersCalled: string[] = [];
    const someError = new Error('some error');

    const pipeline = useExperiment(
      usePluginExtend(mockPipeline),
      usePluginSetErrorHandler((error, pipeline) => {
        handlersCalled.push('first handler');
      }),
      usePluginAddErrorHandler((error, pipeline) => {
        handlersCalled.push('second handler');
      }),
      usePluginExtend((): {} => {
        throw new Error('some error');
      }),
    );

    expect(pipeline.error).toEqual(
      expect.objectContaining({
        rawError: someError,
        pluginIndex: 3,
      }),
    );
    expect(handlersCalled).toEqual(['first handler', 'second handler']);
  });

  test('does not call the handler if no errors were thrown', () => {
    const mockHandler = jest.fn();
    const pipeline = useExperiment(
      usePluginExtend(mockPipeline),
      usePluginSetErrorHandler(() => {}), // The default handler throws, override
      usePluginAddErrorHandler(mockHandler),
      usePluginExtend(() => ({
        success: true,
      })),
    );

    expect(pipeline).toMatchObject({ success: true });
    expect(mockHandler).not.toHaveBeenCalled();
  });
});

describe('error handler: useHandlerUnenroll()', () => {
  test('marks cohort as not enrolled on error', () => {
    const mockError = new Error('error message');
    const pipeline = useExperiment(
      usePluginExtend(mockPipeline),
      usePluginSetErrorHandler(
        useHandlerUnenroll({
          ineligibilityReason: 'customIneligibilityReason',
        }),
      ),
      usePluginExtend((): {} => {
        throw mockError;
      }),
    );

    expect(pipeline).toMatchObject({
      error: expect.objectContaining({
        rawError: mockError,
      }),
      cohort: 'not-enrolled',
      ineligibilityReasons: ['customIneligibilityReason'],
    });
  });

  test('returns unchanged pipeline if no error thrown', () => {
    const pipeline = useExperiment(
      usePluginExtend(mockPipeline),
      usePluginSetErrorHandler(
        useHandlerUnenroll({
          ineligibilityReason: 'customIneligibilityReason',
        }),
      ),
      usePluginExtend(() => ({
        success: true,
      })),
    );

    expect(pipeline).toMatchObject({ success: true });
  });
});
