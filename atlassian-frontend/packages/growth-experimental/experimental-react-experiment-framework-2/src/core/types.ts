export interface ExperimentPlugin<
  Requires,
  Provides,
  Input extends ExperimentCore
> {
  (pipeline: Input): Provides;
}

export interface PipelineMeta {
  pipelineModeEnabled: boolean;
  currentPlugin: {
    index: number;
  };
}

export interface ExperimentCore {
  meta?: PipelineMeta;
  // TODO
  // experimentKey ?
  errorHandler?: (
    error: ExperimentErrorType,
    upstream: ExperimentCore & ExperimentError,
  ) => any | undefined;
}

export interface ExperimentLoading {
  loading: boolean;
}

export interface ExperimentError {
  error: null | ExperimentErrorType;
}

export interface ExperimentErrorType {
  rawError: Error;
  pluginIndex: number;
  safeMessage: string;
  handled: boolean;
}
