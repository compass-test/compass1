import {
  BaseMetricDataWithStartAndStop,
  BasePageLoadMetricDataWithStartAndStop,
  PageLoadPerformanceEventConfig,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

const cacheableTypes = ['script', 'link'];
const resourceTypes = ['fetch', 'xmlhttprequest'];
const CACHE_NETWORK = 'network';
const CACHE_MEMORY = 'memory';
const CACHE_DISK = 'disk';

const calculateTransferType = (
  type: string,
  duration: number,
  size: number | undefined,
) => {
  if (!cacheableTypes.includes(type)) {
    return CACHE_NETWORK;
  }

  if ((size === undefined || size === 0) && duration === 0) {
    return CACHE_MEMORY;
  }
  if (size === 0 && duration > 0) {
    return CACHE_DISK;
  }
  if (size === undefined) {
    return null;
  }

  return CACHE_NETWORK;
};

const hasAccessToResourceSize = (
  url: string,
  type: string,
  hasTimingHeaders: (url: string) => boolean,
) => {
  return (
    !cacheableTypes.includes(type) ||
    url.includes('localhost') ||
    url.includes(window.location.hostname) ||
    hasTimingHeaders(url)
  );
};

interface BasicResourceTiming {
  startTime: number;
  duration: number;
  type: string;
  workerStart: number;
  fetchStart: number;
}

interface CacheableResourceTiming extends BasicResourceTiming {
  transferType: string;
  ttfb?: number;
}

interface NonCacheableResourceTiming extends BasicResourceTiming {
  size: number;
  ttfb: number;
}

export type ResourceTiming =
  | BasicResourceTiming
  | NonCacheableResourceTiming
  | CacheableResourceTiming;

const getReportedInitiatorTypes = (xhrEnabled: boolean) => {
  if (xhrEnabled) {
    return ['script', 'link', 'fetch', 'xmlhttprequest'];
  }
  return ['script', 'link', 'fetch'];
};

const withoutHeaders = () => false;

const evaluateAccessToResourceTimings = (entry: PerformanceResourceTiming) => {
  if (entry.responseStart === 0 && entry.startTime > entry.responseStart) {
    return false;
  }

  return true;
};

const getEvaluatedTimingHeader = (
  entry: PerformanceResourceTiming,
  enabled: boolean = false,
  hasTimingHeaders: (url: string) => boolean = withoutHeaders,
) => {
  if (!enabled) {
    return null;
  }

  const manualResolution =
    entry.name.includes('localhost') ||
    entry.name.includes(window.location.hostname) ||
    hasTimingHeaders(entry.name);

  const autoResolution = evaluateAccessToResourceTimings(entry);

  return {
    m_h: manualResolution,
    a_h: autoResolution,
  };
};

const getSizeObject = (size?: number) => (size !== undefined ? { size } : null);

const getNetworkData = (
  item: PerformanceResourceTiming,
  eventStart: number,
  hasTimingHeaders: (url: string) => boolean = withoutHeaders,
) => {
  const {
    name,
    duration,
    transferSize: size,
    initiatorType: type,
    responseStart,
  } = item;

  const ttfb = Math.round(responseStart - eventStart);

  if (!hasAccessToResourceSize(name, type, hasTimingHeaders)) {
    return {};
  }

  if (cacheableTypes.includes(type)) {
    const transferType = calculateTransferType(type, duration, size);

    if (!transferType) {
      return { ttfb, ...getSizeObject(size) };
    }

    if (transferType !== CACHE_NETWORK) {
      return { transferType };
    }

    return { ttfb, transferType, ...getSizeObject(size) };
  }

  return { ttfb, ...getSizeObject(size) };
};

export const resourceTimings = (
  config: PerformanceEventConfig | PageLoadPerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop | BasePageLoadMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
  performance = window.performance,
) => {
  if (data.start === null) {
    return null;
  }

  const resources = performance
    .getEntriesByType('resource')
    .filter(
      (entry) => entry.startTime >= data.start,
    ) as PerformanceResourceTiming[];

  if (!resources.length) {
    return null;
  }

  const resourceTiming: { [key: string]: ResourceTiming } = {};
  const { xhrFilter } = globalConfig.resourceTimings;
  const reportedInitiatorTypes = getReportedInitiatorTypes(!!xhrFilter);

  resources.forEach((item) => {
    if (!reportedInitiatorTypes.includes(item.initiatorType)) {
      return;
    }

    const {
      name,
      startTime,
      duration,
      workerStart,
      fetchStart,
      initiatorType: type,
    } = item;

    if (!name) {
      return;
    }

    if (
      type === 'xmlhttprequest' &&
      (xhrFilter === undefined || xhrFilter(name) === false)
    ) {
      return;
    }

    const url = resourceTypes.includes(type)
      ? globalConfig.resourceTimings.sanitiseEndpoints(name)
      : globalConfig.resourceTimings.mapResources(name);

    if (resourceTiming[url]) {
      return;
    }

    resourceTiming[url] = {
      startTime: Math.round(startTime - data.start),
      duration: Math.round(duration),
      workerStart: Math.max(Math.round(workerStart - data.start), 0),
      fetchStart: Math.max(Math.round(fetchStart - data.start), 0),
      type,
      ...getNetworkData(
        item,
        data.start,
        globalConfig.resourceTimings.hasTimingHeaders,
      ),
      ...getEvaluatedTimingHeader(
        item,
        globalConfig.resourceTimings.experimental__reportEvaluatedTimingHeaders,
        globalConfig.resourceTimings.hasTimingHeaders,
      ),
    } as ResourceTiming;
  });

  return {
    'timings:resource': resourceTiming,
  };
};
