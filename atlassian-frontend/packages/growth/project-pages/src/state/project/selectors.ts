import { State } from '../types';
import { ProjectState } from './types';

export const getProject = (state: State): ProjectState => state.project;
export const getProjectKey = (state: State): string => state.project.key;
export const getProjectId = (state: State): number => state.project.id;
export const getProjectType = (state: State): string => state.project.type;
