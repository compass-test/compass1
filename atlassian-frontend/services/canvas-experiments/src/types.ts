export interface ExperimentRunOptions {
  element: Element;
}

export interface Experiment {
  run: (options: ExperimentRunOptions) => void;
  dispose: (options: ExperimentRunOptions) => void;
}
