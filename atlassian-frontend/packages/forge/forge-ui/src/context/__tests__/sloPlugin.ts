import MetalClient, { catalog } from '@atlassiansox/metal-client';
import SLOPlugin from '../metal/sloPlugin';
import { getPropertiesFromTags, getSLOFromMetric } from '../metal/sloPlugin';

describe('SLOPlugin', () => {
  it('registers a metric listener when being installed', () => {
    const plugin = new SLOPlugin({});
    // @ts-ignore mocking metalClient
    const mockClient = { addEventHook: jest.fn() } as MetalClient;
    plugin.install(mockClient);
    expect(mockClient.addEventHook).toHaveBeenCalledWith(
      'metric',
      expect.any(Function),
    );
  });

  it('sends the correct SLO metric when the metric event is fired', () => {
    const plugin = new SLOPlugin({
      [catalog.performance.COMPONENT_READY]: 1000,
    });
    let callback: Function;
    // @ts-ignore mocking metalClient
    const mockClient = {
      metric: {
        submit: jest.fn(),
      },
      addEventHook: (_, cb) => {
        callback = cb;
      },
    } as MetalClient;

    plugin.install(mockClient);
    callback!({
      type: 'timing',
      name: 'fe.perf.component.time_to_ready',
      tags: ['component:useExtensionList', 'page:confluence:macroEditor'],
      value: 164.49500003363937,
      sampleRate: 1,
    });

    expect(mockClient.metric.submit).toHaveBeenCalledWith({
      component: 'useExtensionList',
      name: 'fe.perf.component.time_to_ready.slo',
      page: 'confluence:macroEditor',
      success: true,
    });

    callback!({
      type: 'timing',
      name: 'fe.perf.component.time_to_ready',
      tags: ['component:useExtensionList', 'page:confluence:macroEditor'],
      value: 999999,
      sampleRate: 1,
    });

    expect(mockClient.metric.submit).toHaveBeenCalledWith({
      component: 'useExtensionList',
      name: 'fe.perf.component.time_to_ready.slo',
      page: 'confluence:macroEditor',
      success: false,
    });
  });

  it('sends SLO metrics only if the filter options match', () => {
    const plugin = new SLOPlugin({
      [catalog.performance.COMPONENT_READY]: [
        {
          component: 'useExtensionList',
          target: 1000,
        },
      ],
    });
    let callback: Function;
    // @ts-ignore mocking metalClient
    const mockClient = {
      metric: {
        submit: jest.fn(),
      },
      addEventHook: (_, cb) => {
        callback = cb;
      },
    } as MetalClient;

    plugin.install(mockClient);
    callback!({
      type: 'timing',
      name: 'fe.perf.component.time_to_ready',
      tags: ['component:DoNotListen', 'page:confluence:macroEditor'],
      value: 164.49500003363937,
      sampleRate: 1,
    });

    callback!({
      type: 'timing',
      name: 'fe.perf.component.time_to_ready',
      tags: ['component:useExtensionList', 'page:confluence:macroEditor'],
      value: 999999,
      sampleRate: 1,
    });

    expect(mockClient.metric.submit).toHaveBeenCalledTimes(1);
    expect(mockClient.metric.submit).toHaveBeenCalledWith({
      component: 'useExtensionList',
      name: 'fe.perf.component.time_to_ready.slo',
      page: 'confluence:macroEditor',
      success: false,
    });
  });

  it('uses the correct target for different component tags specified in options', () => {
    const plugin = new SLOPlugin({
      [catalog.performance.COMPONENT_READY]: [
        {
          component: 'useNewHook',
          page: 'confluence:macroEditor',
          target: 10,
        },
        {
          component: 'useExtensionList',
          target: 1000,
        },
      ],
    });
    let callback: Function;
    // @ts-ignore mocking metalClient
    const mockClient = {
      metric: {
        submit: jest.fn(),
      },
      addEventHook: (_, cb) => {
        callback = cb;
      },
    } as MetalClient;

    plugin.install(mockClient);

    callback!({
      type: 'timing',
      name: 'fe.perf.component.time_to_ready',
      tags: ['component:useNewHook'],
      value: 100,
      sampleRate: 1,
    });

    expect(mockClient.metric.submit).not.toHaveBeenCalled();

    callback!({
      type: 'timing',
      name: 'fe.perf.component.time_to_ready',
      tags: ['component:useNewHook', 'page:confluence:macroEditor'],
      value: 1,
      sampleRate: 1,
    });

    expect(mockClient.metric.submit).toHaveBeenCalledWith({
      component: 'useNewHook',
      name: 'fe.perf.component.time_to_ready.slo',
      page: 'confluence:macroEditor',
      success: true,
    });

    callback!({
      type: 'timing',
      name: 'fe.perf.component.time_to_ready',
      tags: ['component:useExtensionList', 'page:confluence:macroEditor'],
      value: 100,
      sampleRate: 1,
    });

    expect(mockClient.metric.submit).toHaveBeenCalledWith({
      component: 'useExtensionList',
      name: 'fe.perf.component.time_to_ready.slo',
      page: 'confluence:macroEditor',
      success: true,
    });
  });

  describe('getPropertiesFromTags', () => {
    it('returns an empty object for undefined tags', () => {
      expect(getPropertiesFromTags()).toStrictEqual({});
    });
    it('returns an object of properties and values from the tags', () => {
      expect(
        getPropertiesFromTags([
          'component:useExtensionList',
          'page:confluence:macroEditor',
        ]),
      ).toStrictEqual({
        component: 'useExtensionList',
        page: 'confluence:macroEditor',
      });

      expect(
        getPropertiesFromTags([
          'component:name:with:many:colons',
          'page:somePage',
        ]),
      ).toStrictEqual({
        component: 'name:with:many:colons',
        page: 'somePage',
      });
    });
    it('handles empty tag values', () => {
      expect(
        getPropertiesFromTags(['component:useExtensionList', 'page:']),
      ).toStrictEqual({
        component: 'useExtensionList',
        page: '',
      });
    });
    it('ignores malformed tags', () => {
      expect(getPropertiesFromTags(['invalid'])).toStrictEqual({});
    });
  });

  describe('getSLOFromMetric', () => {
    it('returns the corresponding SLO metric', () => {
      expect(getSLOFromMetric(catalog.performance.COMPONENT_READY)).toBe(
        catalog.performance.COMPONENT_READY_SLO,
      );
    });
    it('returns undefined for an unsupported metric', () => {
      expect(getSLOFromMetric('unsupported' as any)).toBe(undefined);
    });
  });
});
