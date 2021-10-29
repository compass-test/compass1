import {
  CompressedEvaluations,
  EvaluationAttributes,
  ExposureEvent,
} from './types';

export const canCompress = (event: ExposureEvent): boolean =>
  event.actionSubject === 'feature' &&
  event.action === 'exposed' &&
  event.eventType === 'operational' &&
  event.attributes &&
  event.tags &&
  event.tags.includes('measurement') &&
  event.tags.includes('autoExposure');

export const compressor = (
  events: ExposureEvent[],
  batchSize: number = 50,
): CompressedEvaluations[] => {
  if (!events || events.length <= 0) {
    return [];
  }

  if (batchSize <= 0) {
    throw new Error('Batch size must be greater than 0');
  }
  // Extract evaluations and reduce into a single array
  const flagEvaluations: EvaluationAttributes[] = events.map((currentEvent) => {
    const { flagKey, value, reason, ruleId } = currentEvent.attributes;

    return {
      key: flagKey,
      value,
      ...(reason && { reason }),
      ...(ruleId && { ruleId }),
    };
  });

  // Batch evaluations into specified batchSize
  return createBatches(flagEvaluations, batchSize);
};

const createBatches = (
  array: EvaluationAttributes[],
  batchSize: number,
): CompressedEvaluations[] => {
  let compressedEvaluations = [];

  for (let i = 0; i < array.length; i += batchSize) {
    let evaluationBatch = array.slice(i, i + batchSize);
    compressedEvaluations.push({
      actionSubject: 'features',
      action: 'exposed',
      eventType: 'operational',
      attributes: { evaluations: evaluationBatch },
      tags: ['measurement', 'autoExposure'],
      source: '@atlassian/exposure-events-compressor',
    });
  }
  return compressedEvaluations;
};

export const buildCompressionFunction = (batchSize?: number) => (
  events: ExposureEvent[],
): CompressedEvaluations[] => compressor(events, batchSize);
