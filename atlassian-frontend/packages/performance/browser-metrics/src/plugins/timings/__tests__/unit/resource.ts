import { PageLoadMetric } from '../../../../metric/page-load-metric';
import {
  pageLoadMetricMock,
  pageLoadPerformanceConfigMock,
  shareableGlobalConfigMock,
} from '../../../../mocks';
import {
  mockPerformance,
  mockPerformanceResourceTiming,
} from '../../../../mocks/performance';
import { BasePageLoadMetricDataWithStartAndStop } from '../../../../types';
import { resourceTimings } from '../../resource';

const mockEntries = (entries: Array<Partial<PerformanceResourceTiming>>) =>
  mockPerformance({
    getEntriesByType: () => entries.map(mockPerformanceResourceTiming),
  });

const mapUrlToLastPart = (url: string) => {
  return new URL(url).pathname.split('/').pop() || '';
};

describe('resource timings plugin', () => {
  let metric: PageLoadMetric;
  const resourceTimingsConfig = {
    mapResources: mapUrlToLastPart,
    sanitiseEndpoints: (url: string) => '/' + mapUrlToLastPart(url),
    hasTimingHeaders: () => true,
  };

  const shareableConfig = shareableGlobalConfigMock({
    resourceTimings: resourceTimingsConfig,
  });

  beforeEach(() => {
    metric = pageLoadMetricMock();
    metric.startPageLoad({ startTime: 0, isInitial: false });
    metric.stop({ stopTime: 8000 });
  });

  test('should return an object containing resource metrics', () => {
    const mockData = [
      {
        name:
          'http://jira-frontend-static-some-random-resource-url/fileName.js',
        duration: 1028,
        transferSize: 381675,
        startTime: 3875,
        initiatorType: 'script',
        responseStart: 3879,
        workerStart: 4129,
        fetchStart: 4109,
      },
    ];

    const expected = {
      'fileName.js': {
        startTime: 3875,
        duration: 1028,
        workerStart: 4129,
        fetchStart: 4109,
        type: 'script',
        transferType: 'network',
        ttfb: 3879,
        size: 381675,
      },
    };

    expect(
      resourceTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableConfig,
        mockEntries(mockData),
      ),
    ).toStrictEqual({
      'timings:resource': expected,
    });
  });

  test('should return an object containing resource metrics including first entry (Safari reports both prefetch and script)', () => {
    const mockData = [
      {
        name:
          'http://jira-frontend-static-some-random-resource-url/fileName.js',
        duration: 1,
        transferSize: undefined,
        startTime: 1875,
        initiatorType: 'link',
        responseStart: 1875,
        workerStart: 4129,
        fetchStart: 4109,
      },
      {
        name:
          'http://jira-frontend-static-some-random-resource-url/fileName.js',
        duration: 1028,
        transferSize: undefined,
        startTime: 3875,
        initiatorType: 'script',
        responseStart: 3879,
        workerStart: 4129,
        fetchStart: 4109,
      },
    ];

    const expected = {
      'fileName.js': {
        startTime: 1875,
        duration: 1,
        workerStart: 4129,
        fetchStart: 4109,
        type: 'link',
        ttfb: 1875,
      },
    };

    expect(
      resourceTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableConfig,
        mockEntries(mockData),
      ),
    ).toStrictEqual({
      'timings:resource': expected,
    });
  });

  test('should return only script, link, fetch items from resources when xhrFilter not defined', () => {
    const mockData = [
      {
        name:
          'http://jira-frontend-static-some-random-resource-url/fileName.js',
        duration: 1028,
        transferSize: 381675,
        startTime: 3875,
        initiatorType: 'script',
        responseStart: 3879,
        workerStart: 4129,
        fetchStart: 4109,
      },
      {
        name:
          'http://jira-frontend-static-some-random-resource-url/fileName2.js',
        duration: 1028,
        transferSize: 381675,
        startTime: 3875,
        initiatorType: 'link',
        responseStart: 3879,
        workerStart: 4129,
        fetchStart: 4109,
      },
      {
        name:
          'https://some.fetch-resource.com/in-product-messages?product=jira',
        duration: 373,
        transferSize: 220,
        startTime: 7551,
        initiatorType: 'fetch',
        responseStart: 7555,
        workerStart: 4129,
        fetchStart: 4109,
      },
      {
        name: 'https://some.xhr-resource.com/path/to/randomProperty?_=key',
        duration: 305,
        transferSize: 139,
        startTime: 8413,
        responseStart: 8416,
        initiatorType: 'xmlhttprequest',
        workerStart: 4129,
        fetchStart: 4109,
      },
    ];

    const expected = {
      'fileName.js': {
        startTime: 3875,
        duration: 1028,
        workerStart: 4129,
        fetchStart: 4109,
        type: 'script',
        transferType: 'network',
        ttfb: 3879,
        size: 381675,
      },
      'fileName2.js': {
        startTime: 3875,
        duration: 1028,
        workerStart: 4129,
        fetchStart: 4109,
        type: 'link',
        transferType: 'network',
        ttfb: 3879,
        size: 381675,
      },
      '/in-product-messages': {
        startTime: 7551,
        duration: 373,
        workerStart: 4129,
        fetchStart: 4109,
        size: 220,
        type: 'fetch',
        ttfb: 7555,
      },
    };
    expect(
      resourceTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableConfig,
        mockEntries(mockData),
      ),
    ).toStrictEqual({
      'timings:resource': expected,
    });
  });

  test('should return xhr items from resources when xhrFilter defined and filter returns true', () => {
    const mockData = [
      {
        name: 'https://some.xhr-resource.com/path/to/randomProperty?_=key',
        duration: 305,
        transferSize: 139,
        startTime: 8413,
        responseStart: 8416,
        initiatorType: 'xmlhttprequest',
        workerStart: 8516,
        fetchStart: 8413,
      },
    ];

    const expected = {
      '/randomProperty': {
        startTime: 8413,
        duration: 305,
        workerStart: 8516,
        fetchStart: 8413,
        size: 139,
        type: 'xmlhttprequest',
        ttfb: 8416,
      },
    };

    const shareableConfig = shareableGlobalConfigMock({
      resourceTimings: { ...resourceTimingsConfig, xhrFilter: () => true },
    });

    expect(
      resourceTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableConfig,
        mockEntries(mockData),
      ),
    ).toStrictEqual({
      'timings:resource': expected,
    });
  });

  test('should not return xhr items from resources when xhrFilter defined and filter returns false', () => {
    const mockData = [
      {
        name: 'https://some.xhr-resource.com/path/to/randomProperty?_=key',
        duration: 305,
        transferSize: 139,
        startTime: 8413,
        responseStart: 8416,
        initiatorType: 'xmlhttprequest',
        workerStart: 8512,
        fetchStart: 8413,
      },
    ];

    const expected = {};

    const shareableConfig = shareableGlobalConfigMock({
      resourceTimings: { ...resourceTimingsConfig, xhrFilter: () => false },
    });

    expect(
      resourceTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableConfig,
        mockEntries(mockData),
      ),
    ).toStrictEqual({
      'timings:resource': expected,
    });
  });

  test('should apply resource mapping method and remove all query', () => {
    const mockData = [
      {
        name:
          'http://jira-frontend-static-some-random-resource-url/vendor.js?foo=bar#bar',
        duration: 1028,
        transferSize: 381675,
        startTime: 3875,
        initiatorType: 'script',
        responseStart: 3879,
        workerStart: 4963,
        fetchStart: 4109,
      },
      {
        name:
          'http://jira-frontend-static-some-random-resource-url/commons.this.is.not.included.js',
        duration: 1028,
        transferSize: 381675,
        startTime: 3875,
        initiatorType: 'script',
        responseStart: 3879,
        workerStart: 4963,
        fetchStart: 4109,
      },
      {
        name:
          'http://jira-frontend-static-some-random-resource-url/async-jira-spa.this.is.not.included.js?bust=cache',
        duration: 1028,
        transferSize: 381675,
        startTime: 3875,
        initiatorType: 'link',
        responseStart: 3879,
        workerStart: 4963,
        fetchStart: 4109,
      },
      {
        name:
          'https://some.fetch-resource.com/in-product-messages/pii/ugc/?product=jira',
        duration: 373,
        transferSize: 220,
        startTime: 7551,
        initiatorType: 'fetch',
        responseStart: 7555,
        workerStart: 8663,
        fetchStart: 7666,
      },
    ];

    const expected = {
      'vendor.js': {
        startTime: 3875,
        duration: 1028,
        workerStart: 4963,
        fetchStart: 4109,
        type: 'script',
        transferType: 'network',
        ttfb: 3879,
        size: 381675,
      },
      'commons.js': {
        startTime: 3875,
        duration: 1028,
        workerStart: 4963,
        fetchStart: 4109,
        type: 'script',
        transferType: 'network',
        ttfb: 3879,
        size: 381675,
      },
      'async-jira-spa.js': {
        startTime: 3875,
        duration: 1028,
        workerStart: 4963,
        fetchStart: 4109,
        type: 'link',
        transferType: 'network',
        ttfb: 3879,
        size: 381675,
      },
      '/in-product-messages/[masked]/[masked]/': {
        startTime: 7551,
        duration: 373,
        workerStart: 8663,
        fetchStart: 7666,
        size: 220,
        type: 'fetch',
        ttfb: 7555,
      },
    };

    expect(
      resourceTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock({
          resourceTimings: {
            mapResources: (url) => {
              const parts = mapUrlToLastPart(url).split('.');
              return parts[0] + '.' + parts[parts.length - 1];
            },
            sanitiseEndpoints: (url) => {
              const newUrl = new URL(url).pathname;
              return newUrl
                .replace(/ugc/gi, '[masked]')
                .replace(/pii/gi, '[masked]');
            },
            hasTimingHeaders: () => true,
          },
        }),
        mockEntries(mockData),
      ),
    ).toStrictEqual({
      'timings:resource': expected,
    });
  });

  describe('transfer type property', () => {
    test('is set to memory when size is 0 and duration is 0 for script or link', () => {
      const mockData = [
        {
          name:
            'http://jira-frontend-static-some-random-resource-url/fileName.js',
          duration: 0,
          size: 0,
          startTime: 3875,
          initiatorType: 'script',
          responseStart: 0,
          workerStart: 4963,
          fetchStart: 4109,
        },
      ];

      const expected = {
        'fileName.js': {
          startTime: 3875,
          duration: 0,
          workerStart: 4963,
          fetchStart: 4109,
          type: 'script',
          transferType: 'memory',
        },
      };

      expect(
        resourceTimings(
          pageLoadPerformanceConfigMock(),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableConfig,
          mockEntries(mockData),
        ),
      ).toStrictEqual({
        'timings:resource': expected,
      });
    });

    test('is set to memory when size is undefined and duration is 0 for script or link - Safari', () => {
      const mockData = [
        {
          name:
            'http://jira-frontend-static-some-random-resource-url/fileName.js',
          duration: 0,
          size: undefined,
          startTime: 3875,
          initiatorType: 'script',
          responseStart: 0,
          workerStart: 4963,
          fetchStart: 4109,
        },
      ];

      const expected = {
        'fileName.js': {
          startTime: 3875,
          duration: 0,
          workerStart: 4963,
          fetchStart: 4109,
          type: 'script',
          transferType: 'memory',
        },
      };

      expect(
        resourceTimings(
          pageLoadPerformanceConfigMock(),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableConfig,
          mockEntries(mockData),
        ),
      ).toStrictEqual({
        'timings:resource': expected,
      });
    });

    test('is set to disk when size is 0 and duration is not 0 for script or link', () => {
      const mockData = [
        {
          name:
            'http://jira-frontend-static-some-random-resource-url/fileName.js',
          duration: 1,
          transferSize: 0,
          startTime: 3875,
          initiatorType: 'script',
          responseStart: 0,
          workerStart: 4963,
          fetchStart: 4109,
        },
      ];

      const expected = {
        'fileName.js': {
          startTime: 3875,
          duration: 1,
          workerStart: 4963,
          fetchStart: 4109,
          type: 'script',
          transferType: 'disk',
        },
      };

      expect(
        resourceTimings(
          pageLoadPerformanceConfigMock(),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableConfig,
          mockEntries(mockData),
        ),
      ).toStrictEqual({
        'timings:resource': expected,
      });
    });

    test('is set to network when size and duration are not 0', () => {
      const mockData = [
        {
          name:
            'http://jira-frontend-static-some-random-resource-url/fileName.js',
          duration: 1,
          transferSize: 20,
          startTime: 3875,
          workerStart: 4963,
          fetchStart: 4109,
          initiatorType: 'script',
          responseStart: 3876,
        },
      ];

      const expected = {
        'fileName.js': {
          startTime: 3875,
          duration: 1,
          workerStart: 4963,
          fetchStart: 4109,
          type: 'script',
          transferType: 'network',
          ttfb: 3876,
          size: 20,
        },
      };

      expect(
        resourceTimings(
          pageLoadPerformanceConfigMock(),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableConfig,
          mockEntries(mockData),
        ),
      ).toStrictEqual({
        'timings:resource': expected,
      });
    });

    test('is set to network always for other than script or link', () => {
      const mockData = [
        {
          name: 'http://some-random-resource-url/api',
          duration: 2,
          transferSize: 0,
          startTime: 3875,
          workerStart: 4963,
          fetchStart: 4109,
          responseStart: 3876,
          initiatorType: 'fetch',
        },
      ];

      const expected = {
        '/api': {
          startTime: 3875,
          duration: 2,
          workerStart: 4963,
          fetchStart: 4109,
          size: 0,
          type: 'fetch',
          ttfb: 3876,
        },
      };

      expect(
        resourceTimings(
          pageLoadPerformanceConfigMock(),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableConfig,
          mockEntries(mockData),
        ),
      ).toStrictEqual({
        'timings:resource': expected,
      });
    });

    test('includes information about transferType if contains hostname or CDN supports header', () => {
      const oldLocation = window.location;
      delete window.location;
      window.location = { ...oldLocation, hostname: 'biniek.jira-dev.com' };

      const mockData = [
        {
          name:
            'https://d25s903c0x7s6j.cloudfront.net/biniek.jira-dev.com/s/d41d8cd98f00b204e9800998ecf8427e-CDN/-l129dr/b/3/c5b3c912742602c493efdefaa995c56d/_/download/contextbatch/js/jira.heritage/batch.js?jag=true&locale=pl-PL',
          duration: 245,
          transferSize: 870562,
          startTime: 4270,
          workerStart: 4963,
          fetchStart: 4109,
          responseStart: 4280,
          initiatorType: 'script',
        },
      ];

      const expected = {
        'batch.js': {
          startTime: 4270,
          size: 870562,
          duration: 245,
          workerStart: 4963,
          fetchStart: 4109,
          type: 'script',
          transferType: 'network',
          ttfb: 4280,
        },
      };

      const result = resourceTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableConfig,
        mockEntries(mockData),
      );

      window.location = oldLocation;

      expect(result).toStrictEqual({
        'timings:resource': expected,
      });
    });

    test('excludes information about transferType if not CDN with headers or same domain', () => {
      const mockData = [
        {
          name: 'http://some-random-resource-url/fileName.js',
          duration: 1,
          transferSize: 20,
          startTime: 3875,
          workerStart: 3963,
          fetchStart: 4109,
          initiatorType: 'script',
        },
      ];

      const expected = {
        'fileName.js': {
          startTime: 3875,
          duration: 1,
          workerStart: 3963,
          fetchStart: 4109,
          type: 'script',
        },
      };

      const resourceTimingsConfig = {
        mapResources: mapUrlToLastPart,
        sanitiseEndpoints: mapUrlToLastPart,
        hasTimingHeaders: () => false,
      };

      const nonHeaderShareableConfig = shareableGlobalConfigMock({
        resourceTimings: resourceTimingsConfig,
      });

      expect(
        resourceTimings(
          pageLoadPerformanceConfigMock(),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          nonHeaderShareableConfig,
          mockEntries(mockData),
        ),
      ).toStrictEqual({
        'timings:resource': expected,
      });
    });

    test('excludes information about transferType if size is undefined and duration is bigger than 0', () => {
      const mockData = [
        {
          name: 'http://some-random-resource-url/fileName.js',
          duration: 1,
          transferSize: undefined,
          startTime: 3875,
          workerStart: 3963,
          fetchStart: 4109,
          initiatorType: 'script',
        },
      ];

      const expected = {
        'fileName.js': {
          startTime: 3875,
          duration: 1,
          workerStart: 3963,
          fetchStart: 4109,
          type: 'script',
        },
      };

      const resourceTimingsConfig = {
        mapResources: mapUrlToLastPart,
        sanitiseEndpoints: mapUrlToLastPart,
        hasTimingHeaders: () => false,
      };

      const nonHeaderShareableConfig = shareableGlobalConfigMock({
        resourceTimings: resourceTimingsConfig,
      });

      expect(
        resourceTimings(
          pageLoadPerformanceConfigMock(),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          nonHeaderShareableConfig,
          mockEntries(mockData),
        ),
      ).toStrictEqual({
        'timings:resource': expected,
      });
    });
  });

  test('should ignore all resources loaded before the event', () => {
    metric.startPageLoad({ isInitial: false, startTime: 8000 });
    metric.stop({ stopTime: 10000 });

    const mockData = [
      {
        name:
          'http://jira-frontend-static-some-random-resource-url/fileName.js',
        duration: 50,
        transferSize: 381675,
        startTime: 10,
        workerStart: 13,
        fetchStart: 10,
        initiatorType: 'script',
        responseStart: 12,
      },
    ];

    expect(
      resourceTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableConfig,
        mockEntries(mockData),
      ),
    ).toBe(null);
  });

  test('should make startTime of the bundle relative to report.start', () => {
    metric.startPageLoad({ startTime: 8000, isInitial: false });
    metric.stop({ stopTime: 10000 });

    const mockData = [
      {
        name:
          'http://jira-frontend-static-some-random-resource-url/fileName.js',
        duration: 1028,
        transferSize: 381675,
        startTime: 8875,
        initiatorType: 'script',
        responseStart: 8878,
        workerStart: 8974,
        fetchStart: 8413,
      },
    ];

    const expected = {
      'fileName.js': {
        startTime: 875,
        duration: 1028,
        workerStart: 974,
        fetchStart: 413,
        type: 'script',
        transferType: 'network',
        ttfb: 878,
        size: 381675,
      },
    };

    expect(
      resourceTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableConfig,
        mockEntries(mockData),
      ),
    ).toStrictEqual({
      'timings:resource': expected,
    });
  });

  describe('experimental auto detection of timings header', () => {
    test('autodetects header based on available responseStart and startTime', () => {
      metric.startPageLoad({ isInitial: true });
      metric.stop({ stopTime: 10000 });

      const mockData = [
        {
          name:
            'http://jira-frontend-static-some-random-resource-url/fileName.js',
          duration: 1028,
          transferSize: 381675,
          startTime: 875,
          initiatorType: 'script',
          responseStart: 878,
          workerStart: 1123,
          fetchStart: 875,
        },
        {
          name:
            'http://jira-frontend-static-some-random-resource-url/fileName2.js',
          duration: 1028,
          transferSize: 0,
          startTime: 875,
          initiatorType: 'script',
          responseStart: 0,
          workerStart: 1123,
          fetchStart: 875,
        },
      ];

      const expected = {
        'fileName.js': {
          startTime: 875,
          duration: 1028,
          workerStart: 1123,
          fetchStart: 875,
          type: 'script',
          transferType: 'network',
          ttfb: 878,
          size: 381675,
          m_h: true,
          a_h: true,
        },
        'fileName2.js': {
          startTime: 875,
          duration: 1028,
          workerStart: 1123,
          fetchStart: 875,
          type: 'script',
          transferType: 'disk',
          m_h: true,
          a_h: false,
        },
      };

      const shareableConfig = shareableGlobalConfigMock({
        resourceTimings: {
          ...resourceTimingsConfig,
          experimental__reportEvaluatedTimingHeaders: true,
        },
      });

      expect(
        resourceTimings(
          pageLoadPerformanceConfigMock(),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableConfig,
          mockEntries(mockData),
        ),
      ).toStrictEqual({
        'timings:resource': expected,
      });
    });
  });
});
