import { ExperimentCore, ExperimentError } from '../core/types';
import { ExperimentErrorHandler } from '../portable/errorHandler';
import { markError, toExperimentError } from './markError';

export const markAndHandleError = <
  Upstream extends ExperimentCore &
    Partial<ExperimentError> &
    Partial<ExperimentErrorHandler>
>(
  error: Error | null | undefined,
  pipeline: Upstream,
): Upstream & ExperimentError => {
  if (!error) {
    return markError(error, pipeline);
  }
  const experimentError = toExperimentError(error, pipeline);
  const markedPipeline = markError(experimentError, pipeline);
  const handlerResult =
    (pipeline.errorHandler &&
      pipeline.errorHandler(experimentError, markedPipeline)) ||
    {};
  experimentError.handled = true;
  return {
    ...markedPipeline,
    ...handlerResult,
  };
};
