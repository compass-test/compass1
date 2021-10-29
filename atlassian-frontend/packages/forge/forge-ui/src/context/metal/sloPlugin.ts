import MetalClient, {
  catalog,
  MetricPayload,
} from '@atlassiansox/metal-client';
import {
  MetricName,
  PerformanceMetricName,
} from '@atlassiansox/metal-client/dist/client/es/catalog';

type CoreType = Parameters<MetalClient['addEventHook']>[0];

type SupportedMetric =
  | typeof catalog.performance.COMPONENT_READY
  | typeof catalog.performance.REQUEST_TIMING
  | typeof catalog.performance.TIME_TO_INTERACTIVE;

const mapSLOToMetric: { [key in SupportedMetric]: PerformanceMetricName } = {
  [catalog.performance.COMPONENT_READY]:
    catalog.performance.COMPONENT_READY_SLO,
  [catalog.performance.REQUEST_TIMING]: catalog.performance.REQUEST_TIMING_SLO,
  [catalog.performance.TIME_TO_INTERACTIVE]:
    catalog.performance.TIME_TO_INTERACTIVE_SLO,
};

const FILTER_PROPERTIES = {
  page: 'page',
  component: 'component',
};
type MetricOption = {
  target: number;
} & Partial<typeof FILTER_PROPERTIES>;

type SLOPluginOptions = {
  [key in SupportedMetric]?: number | MetricOption[];
};

const isSupportedMetric = (metric: MetricName): metric is SupportedMetric =>
  metric in mapSLOToMetric;

export const getSLOFromMetric = (metric: SupportedMetric) => {
  return mapSLOToMetric[metric];
};

/**
 * Tags are filtered from the metric payload and formatted as  "tagname:value"
 * See https://bitbucket.org/observability/metal-client/src/master/src/core/metric/index.ts
 */
export const getPropertiesFromTags = (
  tags?: string[],
): Partial<typeof FILTER_PROPERTIES> => {
  if (!tags) {
    return {};
  }

  return tags.reduce((prev, curr) => {
    const toSplit = curr.indexOf(':');
    const property =
      toSplit > 0
        ? { [curr.substring(0, toSplit)]: curr.substring(toSplit + 1) }
        : {};
    return {
      ...prev,
      ...property,
    };
  }, {});
};

const findTargetForMatchingProperty = (
  filter: Partial<typeof FILTER_PROPERTIES>,
  options: MetricOption[],
): number | undefined => {
  const match = options.find((o) => {
    const { page, component } = filter;
    return (
      (!o.page || o.page === page) &&
      (!o.component || o.component === component)
    );
  });

  if (match) {
    return match.target;
  }
};

export default class SLOPlugin {
  client?: MetalClient;
  options: SLOPluginOptions = {};
  constructor(options: SLOPluginOptions) {
    this.options = options;
  }
  install(client: MetalClient) {
    this.client = client;
    client.addEventHook('metric' as CoreType, (data: MetricPayload) => {
      if (data && data.name in this.options && isSupportedMetric(data.name)) {
        const config = this.options[data.name];
        const sloName = getSLOFromMetric(data.name);
        const tagProperties = getPropertiesFromTags(data.tags);

        const target = Array.isArray(config)
          ? findTargetForMatchingProperty(tagProperties, config)
          : config;

        if (target) {
          // @ts-ignore incorrect types, no value should be provided for SLOs. See http://http://go/j/OBSCL-429
          client.metric.submit({
            ...tagProperties,
            name: sloName,
            success: data.value! < target,
          });
        }
      }
    });
  }
}
