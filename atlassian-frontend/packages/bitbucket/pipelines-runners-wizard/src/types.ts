import { Runner } from '@atlassian/pipelines-models';
export type SelectOptions = {
  label: string;
  value: string;
  __isNew__?: boolean;
};

export type CreateRunner = (
  runnerName: string,
  runnerLabels: string[],
) => Promise<Runner>;

export type EditRunner = (
  runnerUuid: string,
  runnerName: string,
  runnerLabels: string[],
) => Promise<Runner>;

export type FetchRunner = (runnerUuid: string) => Promise<Runner>;

export enum RunnerAction {
  CREATE = 'create',
  EDIT = 'edit',
}
