export type EnvironmentSelectItem = {
  label: string;
  value: string;
  uuid: string;
};

export type DeploymentEnvironment = {
  label: string;
  options: EnvironmentSelectItem[];
};
