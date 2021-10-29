import { catalog } from '@atlassiansox/metal-client';
import { SubmitMetric } from '../metrics';

type Feature = (payload: any) => Promise<any>;
type Features = { [key: string]: Feature };

const BRIDGE_TASK = 'bridge';

const wrapFeatureWithMetrics = (
  feature: Feature,
  submitMetric: SubmitMetric,
  page: string,
  bridgeMethod: string,
): Feature => async (payload) => {
  try {
    const start = performance.now();
    const result = await feature(payload);
    const end = performance.now();

    if (bridgeMethod === 'invoke') {
      submitMetric({
        task: BRIDGE_TASK,
        taskId: bridgeMethod,
        page,
        value: end - start,
        name: catalog.userInteraction.TASK_DURATION,
      });
    }
    submitMetric({
      task: BRIDGE_TASK,
      taskId: bridgeMethod,
      page,
      name: catalog.userInteraction.TASK_SUCCESS,
    });

    return result;
  } catch (err) {
    submitMetric({
      task: BRIDGE_TASK,
      taskId: bridgeMethod,
      page,
      name: catalog.userInteraction.TASK_FAILURE,
    });

    throw err;
  }
};

export const withMetrics = (
  features: Features,
  submitMetric: SubmitMetric,
  page: string,
): Features =>
  Object.entries(features).reduce<Features>(
    (acc, [key, feature]) => ({
      ...acc,
      [key]: wrapFeatureWithMetrics(feature, submitMetric, page, key),
    }),
    {},
  );
