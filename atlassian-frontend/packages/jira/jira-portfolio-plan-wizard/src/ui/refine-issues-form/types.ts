import {
  IssueStatusType,
  IssueType,
  Plan,
  Project,
  Release,
  ReleaseSelectionMode,
} from '../../common/types';
import { usePlan } from '../../controllers/plan';
import { usePlanMeta } from '../../controllers/plan-meta';

export type ModalValue = { mode: ReleaseSelectionMode; value: Release['id'][] };
export type ModalProps = {
  plan: Plan;
  allProjects?: Project[];
  allReleases?: Release[];
  isOpen: boolean;
  loading?: boolean;
  onChange: (value: ModalValue) => void;
  defaultValue?: ModalValue;
};

export type Props = {
  usePlan?: typeof usePlan;
  usePlanMeta?: typeof usePlanMeta;
  renderHeader?: (header: string) => JSX.Element;
  renderDescription?: (description: string) => JSX.Element;
  isSettingsMode?: boolean;
};

export type FormProps = {
  excludeDays: number;
  excludeIssueTypes: IssueType['id'][];
  excludeStatusTypes: IssueStatusType['id'][];
};

export type ExcludesionRulesPlanUpdate = {
  id: Plan['id'];
  excludeDays: Plan['excludeDays'];
  excludeIssueTypes?: Plan['excludedIssueTypes'];
  excludeStatusTypes?: Plan['excludedStatuses'];
  excludeStatusCategories?: Plan['excludedStatusCategories'];
  excludedVersions?: Plan['excludedVersions'];
};

export type SetExclusionRulesProps = {
  usePlan?: typeof usePlan;
  planId: NonNullable<Plan['id']>;
  issueSources: Plan['issueSources'];
  excludeDays: number;
  onChange?: (plan: ExcludesionRulesPlanUpdate) => Promise<void>;
  renderLoadingSpinner?: () => JSX.Element;
  renderHeader?: (header: string) => JSX.Element;
  renderDescription?: (description: string) => JSX.Element;
};

export type ArchivedReleasesMap = { [releaseId: string]: boolean | undefined };
