export type Metric = {
  timestamp: string;
  values: {
    build: number;
    [key: string]: number;
  };
};

export type Limits = {
  build: number;
  [key: string]: number;
};

export enum ContainerState {
  'ok' = 'ok',
  'warning' = 'warning',
  'error' = 'error',
}

export type ContainerStates = {
  [key: string]: ContainerState;
};
