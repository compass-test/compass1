import { Project } from '../../../../../common/types';

export interface Props {
  loading?: boolean;
  projects: Project[] | undefined;
  selectedProjects: Project[];
  onProjectClick: (value: Project | SelectActions) => void;
}

export enum SelectActions {
  CLEAR_SELECTED = 'CLEAR_SELECTED',
  ALL_PROJECTS = 'ALL_PROJECTS',
}
