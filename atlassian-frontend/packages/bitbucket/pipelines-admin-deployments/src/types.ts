import { Environment } from '@atlassian/pipelines-models';

export type ReorderEnvironments = (
  type: string,
  environmentTypeOrder: { uuid: string }[],
) => void;

export type FetchBranches = (
  name: string,
) => Promise<{ values: { name: string }[] }>;

export type CreateBranchRestriction = (
  environmentUuid: string,
  pattern: string,
) => void;

export type DeleteBranchRestriction = (
  environmentUuid: string,
  restrictionUuid: string,
) => void;

export type CreateEnvironment = (
  environmentName: string,
  environmentType: string,
) => void;

export type UpdateEnvironment = (environmentUuid: string, change: any) => void;

export type DeleteEnvironment = (environmentUuid: string) => void;

export type RenderVariableList = (environment: Environment) => React.ReactNode;
