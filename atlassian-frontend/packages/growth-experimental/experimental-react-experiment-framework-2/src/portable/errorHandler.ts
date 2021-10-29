import {
  ExperimentCore,
  ExperimentError,
  ExperimentErrorType,
} from '../core/types';
import { markNotEnrolled } from '../helpers/markNotEnrolled';

export interface ExperimentErrorHandler {
  errorHandler: (error: ExperimentErrorType, pipeline: ExperimentCore) => void;
}

interface ErrorHandlerFunc<Upstream, HandlerResult> {
  (error: ExperimentErrorType, pipeline: Upstream): HandlerResult;
}
type RequiredUpstream = ExperimentCore & Partial<ExperimentError>;

export const usePluginSetErrorHandler = <
  Upstream extends RequiredUpstream,
  HandlerResult
>(
  errorHandler: ErrorHandlerFunc<Upstream, HandlerResult>,
) =>
  function useSetErrorHandler(pipeline: Upstream) {
    return {
      errorHandler,
    };
  };

export const usePluginAddErrorHandler = <
  Upstream extends RequiredUpstream,
  HandlerResult
>(
  addedErrorHandler: ErrorHandlerFunc<Upstream, HandlerResult>,
) =>
  function useAddErrorHandler(pipeline: Upstream) {
    return {
      ...pipeline,
      errorHandler(error: ExperimentErrorType, pipelineArg: Upstream) {
        const previousHandlerResult = pipeline.errorHandler
          ? pipeline.errorHandler!(error, pipelineArg as any)
          : {};
        const addedHandlerResult = addedErrorHandler(error, pipelineArg);
        return {
          ...previousHandlerResult,
          ...addedHandlerResult,
        };
      },
    };
  };

export const useHandlerUnenroll = <Upstream extends RequiredUpstream>({
  ineligibilityReason,
}: { ineligibilityReason?: string } = {}) => (
  error: ExperimentErrorType,
  pipeline: Upstream,
) =>
  markNotEnrolled(
    ineligibilityReason || error.safeMessage || 'error',
    pipeline,
  );
