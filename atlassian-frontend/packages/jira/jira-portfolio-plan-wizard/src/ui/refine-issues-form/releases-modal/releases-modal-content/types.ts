import {
  Plan,
  Project,
  Release,
  ReleaseSelectionMode,
} from '../../../../common/types';
import { useIntl as useIntlDI } from '../../../../common/utils/intl';
export interface FieldValue {
  mode: ReleaseSelectionMode;
  selectedReleases: Plan['excludedVersions'];
}

export interface Props {
  plan: Plan;
  allProjects?: Project[];
  allReleases?: Release[];
  loading?: boolean;
  onChange?: (value: FieldValue) => void;
  onClose: () => void;
  defaultValue?: Plan['excludedVersions'];
  defaultMode?: ReleaseSelectionMode;
  useIntl?: typeof useIntlDI;
  isSettingsMode?: boolean;
}

export interface FormProps {
  refineIssuesExcludeReleases: string;
}

export type TableContentProject = { type: 'Project'; payload: Project };
export type TableContentRelease = { type: 'Release'; payload: Release };

export type TableContent = TableContentProject | TableContentRelease;

export type ReleaseTableItem = {
  id: Release['id'];
  content: TableContentRelease;
};

export interface ProjectTableItem {
  id: Project['id'];
  content: TableContentProject;
  hasChildren: boolean;
  children: ReleaseTableItem[];
}
