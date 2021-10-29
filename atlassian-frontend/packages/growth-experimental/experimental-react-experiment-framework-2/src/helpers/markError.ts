import {
  ExperimentCore,
  ExperimentError,
  ExperimentErrorType,
} from '../core/types';
import { mark } from './mark';

export const markError = <
  Upstream extends ExperimentCore & Partial<ExperimentError>
>(
  error: Error | ExperimentErrorType | null | undefined,
  pipeline: Upstream,
): Upstream & ExperimentError =>
  mark(
    {
      error:
        pipeline.error || error ? toExperimentError(error!, pipeline) : null,
    },
    pipeline,
  );

export function toExperimentError(
  error: Error | ExperimentErrorType,
  pipeline: ExperimentCore,
): ExperimentErrorType {
  if (isExperimentError(error)) {
    return error as ExperimentErrorType;
  }
  const currentPlugin = (pipeline &&
    pipeline.meta &&
    pipeline.meta.currentPlugin) || { index: 0 };
  return {
    rawError: error as Error,
    pluginIndex: currentPlugin.index,
    safeMessage:
      ((error && (error as Error).name) || 'UnknownError') +
      ` at plugin ${currentPlugin.index}`,
    handled: false,
  };
}

export function isExperimentError(error: Error | ExperimentErrorType) {
  return error && 'rawError' in error;
}
