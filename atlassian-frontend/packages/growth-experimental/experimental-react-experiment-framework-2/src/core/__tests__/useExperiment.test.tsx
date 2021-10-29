import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useExperiment } from '../useExperiment';
import {
  ProductEnvProvider,
  ProductEnvProps,
} from '../../../examples/_support/mock-product/support/productEnv';
import { usePluginAnalytics } from '../../../examples/_support/mock-product/analytics';
import { usePluginMultivariateFeatureFlag } from '../../../examples/_support/mock-product/multivariateFeatureFlag';
import { markPipelineEndListener } from '../../helpers/markPipelineEndListener';
import { usePluginExtend } from '../../portable/extend';

const FLAG_NAME = 'myproduct.myflag';

const createWrapper = (props: ProductEnvProps) => {
  const Wrapper: React.FC<{}> = ({ children }) => (
    <ProductEnvProvider {...props}>{children}</ProductEnvProvider>
  );
  return Wrapper;
};

const mockAnalyticsAPI = { analytics: 'analytics API here' };
const mockLocaleAPI = { locale: 'locale API here' };

const mockPluginProviding = <Provides,>(provides: Provides) => {
  const useProvideMockSpy = jest.fn().mockReturnValue(provides);
  const usePluginProvideMock = <Upstream,>() =>
    function useProvideMock(pipeline: Upstream) {
      return useProvideMockSpy(pipeline) as Provides;
    };
  return [usePluginProvideMock, useProvideMockSpy];
};

test('applies a single plugin', () => {
  const [usePluginAnalyticsMock] = mockPluginProviding(mockAnalyticsAPI);
  const { result } = renderHook(() => useExperiment(usePluginAnalyticsMock()));

  expect(result.current).toMatchObject(mockAnalyticsAPI);
});

test('plugin sees data from another plugin upstream', () => {
  const [usePluginAnalyticsMock, useAnalyticsMock] = mockPluginProviding(
    mockAnalyticsAPI,
  );
  const [usePluginLocaleMock, useLocaleMock] = mockPluginProviding(
    mockLocaleAPI,
  );
  const { result } = renderHook(() =>
    useExperiment(usePluginAnalyticsMock(), usePluginLocaleMock()),
  );

  expect(useAnalyticsMock).toHaveBeenCalled();
  expect(useLocaleMock).toHaveBeenCalledWith(
    expect.objectContaining(mockAnalyticsAPI),
  );

  expect(result.current).toEqual(expect.objectContaining(mockAnalyticsAPI));
  expect(result.current).toEqual(expect.objectContaining(mockLocaleAPI));
});

describe('meta data', () => {
  test('plugins receive meta information', () => {
    const [usePluginFirstMock, usePluginFirst] = mockPluginProviding(
      mockAnalyticsAPI,
    );
    const [usePluginSecondMock, usePluginSecond] = mockPluginProviding(
      mockLocaleAPI,
    );
    renderHook(() =>
      useExperiment(usePluginFirstMock(), usePluginSecondMock()),
    );

    expect(usePluginFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: {
          pipelineModeEnabled: true,
          currentPlugin: {
            index: 0,
          },
        },
      }),
    );
    expect(usePluginSecond).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: {
          pipelineModeEnabled: true,
          currentPlugin: {
            index: 1,
          },
        },
      }),
    );
  });
});

describe('pipeline end listeners', () => {
  const mockPluginEndListener = <Provides,>(provides: Provides) => {
    const onEndSpy = jest.fn();
    const useEndListenerSpy = jest.fn((pipeline) => ({
      ...provides,
      ...markPipelineEndListener(onEndSpy, pipeline),
    }));
    const usePluginEndListener = <Upstream,>() =>
      function useEndListener(pipeline: Upstream) {
        return useEndListenerSpy(pipeline) as Provides;
      };
    return [usePluginEndListener, useEndListenerSpy, onEndSpy];
  };

  test('plugins can listen to the end-state of the pipeline', () => {
    const [
      usePluginEndListener1,
      useEndListener1,
      onEnd1,
    ] = mockPluginEndListener({
      endListener1: true,
    });
    const [usePluginEndListener2, , onEnd2] = mockPluginEndListener({
      endListener2: true,
    });
    const { result } = renderHook(() =>
      useExperiment(
        (pipeline) => ({
          ...pipeline,
          cohort: 'initial-cohort-value',
        }),
        usePluginEndListener1(),
        usePluginEndListener2(),
        (pipeline) => ({
          ...pipeline,
          cohort: 'final-cohort-value',
        }),
      ),
    );

    const expectedFinalPipeline = {
      endListener1: true,
      endListener2: true,
      cohort: 'final-cohort-value',
      pipelineEndListeners: [onEnd1, onEnd2],
    };

    expect(useEndListener1).toHaveBeenCalledWith(
      expect.objectContaining({
        cohort: 'initial-cohort-value',
      }),
    );
    expect(result.current).toMatchObject(expectedFinalPipeline);
    expect(onEnd1).toHaveBeenCalledWith(
      expect.objectContaining(expectedFinalPipeline),
    );
    expect(onEnd2).toHaveBeenCalledWith(
      expect.objectContaining(expectedFinalPipeline),
    );
  });

  test('in nested pipelines, parent listeners are called for each pipeline', () => {
    const [usePluginAnalyticsMock] = mockPluginProviding(mockAnalyticsAPI);
    const [usePluginParentEndListener, , onParentEnd] = mockPluginEndListener({
      parentEndListener: true,
    });
    const [usePluginChildEndListener, , onChildEnd] = mockPluginEndListener({
      childEndListener: true,
    });
    const useBaseExperiment = () =>
      useExperiment(
        usePluginAnalyticsMock(),
        usePluginParentEndListener(),
        (pipeline) => ({ cohort: 'parent-cohort' }),
      );

    const { result } = renderHook(() =>
      useExperiment(
        usePluginExtend(useBaseExperiment()),
        usePluginChildEndListener(),
        (pipeline) => ({
          cohort: 'child-cohort',
        }),
      ),
    );
    expect(onParentEnd).toHaveBeenCalledTimes(2);
    expect(onParentEnd).toHaveBeenCalledWith(
      expect.objectContaining({
        cohort: 'parent-cohort',
      }),
    );
    expect(onParentEnd).toHaveBeenCalledWith(
      expect.objectContaining({
        cohort: 'child-cohort',
      }),
    );
    expect(onChildEnd).toHaveBeenCalledTimes(1);
    expect(result.current).toMatchObject({
      analytics: mockAnalyticsAPI.analytics,
      cohort: 'child-cohort',
      pipelineEndListeners: [onParentEnd, onChildEnd],
      parentEndListener: true,
      childEndListener: true,
    });
  });

  test('in standalone mode, listeners are called immediately', () => {
    const [, useEndListener, onEnd] = mockPluginEndListener({
      endListener: true,
    });
    const upstreamPipeline = { foo: 42 };

    const { result } = renderHook(() => useEndListener(upstreamPipeline));

    expect(onEnd).toHaveBeenCalledWith(upstreamPipeline);
    expect(result.current).toEqual({
      endListener: true,
      foo: 42,
    });
  });
});

describe('with real plugins', () => {
  test('featureFlag + analytics', () => {
    const { result } = renderHook(
      () =>
        useExperiment(
          usePluginMultivariateFeatureFlag(
            FLAG_NAME,
            [
              'experiment' as const,
              'not-enrolled' as const,
              'control' as const,
            ],
            'experiment',
          ),
          usePluginAnalytics(),
        ),
      {
        wrapper: createWrapper({ flags: { [FLAG_NAME]: 'experiment' } }),
      },
    );

    expect(result.current.cohort).toEqual('experiment');
    expect(result.current.analytics).toEqual(expect.any(Object));
  });
});

describe('error handling', () => {
  test('should rethrow error', async () => {
    const useFailedExperiment = () => {
      useExperiment(
        usePluginExtend(() => {
          throw new Error('some error');
        }),
      );
    };
    expect(useFailedExperiment).toThrow(Error);
  });

  test('should call error handler', async () => {
    const errorHandler = jest.fn();
    const someError = new Error('some error');

    const useExperimentWithError = () => {
      useExperiment(
        () => ({
          errorHandler,
        }),
        usePluginExtend(() => {
          throw someError;
        }),
      );
    };

    expect(useExperimentWithError).not.toThrow(Error);

    const expectedError = expect.objectContaining({
      rawError: someError,
      pluginIndex: 1,
    });
    expect(errorHandler).toHaveBeenCalledWith(
      expectedError,
      expect.objectContaining({
        errorHandler: expect.any(Function),
      }),
    );
  });
});
