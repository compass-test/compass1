import { MAX_NUMBER_OF_CUSTOM_LABELS } from '@atlassian/pipelines-models';

export const MAX_LENGTH_OF_NAME = 50;
export const RUNNER_LABEL_WITH_SPACES_REGEXP = new RegExp(
  '^[a-z0-9 ]+(\\.?[a-z0-9 ])*$',
);

export const RUNNER_LABEL_VALIDATION_MESSAGES = {
  maxLabel: `You have reached the ${MAX_NUMBER_OF_CUSTOM_LABELS} custom label limit for this runner`,
  reservedNamespace: `.* is a reserved namespace`,
  reservedLabel: ` is a reserved label`,
  characterLimit: `You have reached character limit of ${MAX_LENGTH_OF_NAME} for a label`,
  invalidCharacters: `Runner labels can only contain lowercase alphanumeric characters and dots that are not at the start or end of the label`,
  removeDefaultLabels: ` is a default label which cannot be removed`,
  removeAllDefaultLabels: `These are default labels which cannot be removed`,
  duplicateLabel: `Label already exists`,
  normalisedLabel: `The label was normalised`,
};

export const RUNNER_NAME_VALIDATION_MESSAGES = {
  characterLimit: `Runner name must be up to ${MAX_LENGTH_OF_NAME} characters long`,
};

export const CREATE_RUNNER_MODAL_HEADING = 'Runner installation';
export const EDIT_RUNNER_MODAL_HEADING = 'Edit runner';

export const LINUX_SYSTEM_OPTION = { label: 'Linux', value: 'linux' };
export const WINDOWS_SYSTEM_OPTION = { label: 'Windows', value: 'windows' };
export const LINUX_ARCH_OPTIONS = { label: 'x86_64', value: 'x86_64' };
export const WINDOWS_ARCH_OPTIONS = { label: '64bit', value: '64bit' };

type StringToSelectOptionMapType = {
  [key: string]: { label: string; value: string };
};

export const SystemMap: StringToSelectOptionMapType = {
  linux: LINUX_SYSTEM_OPTION,
  windows: WINDOWS_SYSTEM_OPTION,
};

export const SystemToArchMap: StringToSelectOptionMapType = {
  linux: LINUX_ARCH_OPTIONS,
  windows: WINDOWS_ARCH_OPTIONS,
};

type EnvironmentMap = {
  [key: string]: string;
};

export const EnvironmentImage: EnvironmentMap = {
  PRODUCTION:
    'docker-public.packages.atlassian.com/sox/atlassian/bitbucket-pipelines-runner:1',
  STAGING:
    'docker-public.packages.atlassian.com/sox/atlassian/bitbucket-pipelines-runner:stg-stable',
  DEV:
    'docker-public.packages.atlassian.com/atlassian/bitbucket-pipelines-runner:ddev-stable',
};

export const RUNS_ON_CODE_BLOCK = `# Example
pipelines:
  default:
      - step:
          runs-on: self.hosted
          script:`;
