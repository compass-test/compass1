import { Plan } from '../../common/types';
import { usePlan as usePlanDI } from '../../controllers/plan';
import { usePlanMeta as usePlanMetaDI } from '../../controllers/plan-meta';

export type FormProps = {
  name: Plan['name'];
  permission: Plan['permission'];
  issueSources: Plan['issueSources'];
};

export type ProjectLimitFormProps = {};

export type OnChangeIssueSources = (plan: {
  id: Plan['id'];
  issueSources: Plan['issueSources'];
  excludedVersions: Plan['excludedVersions'];
}) => Promise<void>;

export type IssueSourcesSettingsPageProps = {
  usePlan?: typeof usePlanDI;
  usePlanMeta?: typeof usePlanMetaDI;
  planId: NonNullable<Plan['id']>;
  excludeDays: number;
  onChange?: OnChangeIssueSources;
  toggleIssueLimitWarningFlag: (mode: boolean) => void;
  toggleNextGenWarningFlag: (mode: boolean) => void;
  renderLoadingSpinner?: () => JSX.Element;
  renderHeader?: (header: string) => JSX.Element;
  renderDescription?: (description: string | JSX.Element) => JSX.Element;
};

export type ProjectOverLimitPageProps = {
  usePlan?: typeof usePlanDI;
  usePlanMeta?: typeof usePlanMetaDI;
  planId: NonNullable<Plan['id']>;
  onChange?: OnChangeIssueSources;
  renderLoadingSpinner?: () => JSX.Element;
};

export type ErrorAppearance = 'warning' | 'error';

export enum OverLimitErrorType {
  OnlyIssueLimitError = 'OnlyIssueLimitError',
  OnlyProjectLimitError = 'OnlyProjectLimitError',
  ProjectLimitAndErrorLimitError = 'ProjectLimitAndErrorLimitError',
}
