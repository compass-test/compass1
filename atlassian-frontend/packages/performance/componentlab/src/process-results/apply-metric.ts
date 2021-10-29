import { GenericMetrics } from '../../types';
import { MARKER_DELIMITER, MARKER_PREFIX } from '../constants';

export default function applyMetric<TValue>(
  metrics: GenericMetrics<TValue>,
  name: string,
  value: TValue,
) {
  const [testName, runnerId, iStr, event] = name
    .slice(MARKER_PREFIX.length)
    .split(MARKER_DELIMITER);

  if (metrics[testName] == null) {
    metrics[testName] = {};
  }

  if (metrics[testName][runnerId] == null) {
    metrics[testName][runnerId] = [];
  }

  const i = parseInt(iStr, 10);
  if (metrics[testName][runnerId][i] == null) {
    metrics[testName][runnerId][i] = {};
  }

  metrics[testName][runnerId][i][event] = value;
}
