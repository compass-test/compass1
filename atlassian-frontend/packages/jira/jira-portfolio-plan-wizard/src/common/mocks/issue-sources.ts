import { IssueSource } from '../types';

import { boards } from './boards';
import { filters } from './filters';
import { projectOptions } from './projects';

const boardSources: IssueSource[] = boards.map((board, index) => ({
  id: index,
  title: board.name,
  type: 'Board',
  value: String(board.id),
  hasNextGenProjects: board.hasNextGenProjects,
}));

const filterSources: IssueSource[] = filters.map((filter, index) => ({
  id: index,
  title: filter.name,
  type: 'Filter',
  value: String(filter.id),
  hasNextGenProjects: filter.hasNextGenProjects,
}));

const projectSources: IssueSource[] = projectOptions.map((project, index) => ({
  id: index,
  title: project.name,
  type: 'Project',
  value: String(project.id),
  hasNextGenProjects: project.hasNextGenProjects,
}));

export const issueSources: IssueSource[] = [
  ...boardSources,
  ...filterSources,
  ...projectSources,
].map((source, index) => ({ ...source, id: index }));
