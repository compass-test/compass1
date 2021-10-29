import {
  Project,
  Release,
  ReleaseSelectionMode,
} from '../../../../common/types';

import { ProjectTableItem } from './types';

export const mergeProjectsAndReleases = (
  projects?: Project[],
  releases?: Release[],
): ProjectTableItem[] =>
  projects && releases
    ? projects
        .map((project) => {
          const projectsReleases = releases.filter(
            (release) => release.projectId === project.id,
          );

          const result: ProjectTableItem = {
            id: project.id,
            content: { type: 'Project', payload: project },
            children: projectsReleases.map((release) => ({
              id: release.id,
              content: { type: 'Release', payload: release },
            })),
            get hasChildren() {
              return this.children && this.children.length > 0;
            },
          };

          return result;
        })
        // No point showing things without children
        .filter((project) => project.hasChildren)
    : [];

const safeReleaseQuery = (query: string) => (
  string: string | null | undefined,
) => {
  if (!string) {
    return false;
  }
  const lowerCasedQuery = query.toLowerCase();
  if (lowerCasedQuery === 'released') {
    return string.toLowerCase() === lowerCasedQuery;
  }
  return string.toLowerCase().includes(lowerCasedQuery);
};

export const queryTableItems = (query: string) => (
  projectTableItems: ProjectTableItem[],
): ProjectTableItem[] =>
  projectTableItems
    .map((project) => {
      const children =
        project.children &&
        project.children.filter(({ content: { payload } }) =>
          [payload.name].some(safeReleaseQuery(query)),
        );

      const result: ProjectTableItem = {
        ...project,
        children: children,
        get hasChildren() {
          return this.children && this.children.length > 0;
        },
      };

      return result;
    })
    .filter((item) => item.hasChildren);

export const filterTableItemsByProject = (projects: Project[]) => (
  projectTableItems: ProjectTableItem[],
) =>
  projectTableItems.filter((item) => projects.includes(item.content.payload));

export const setModeTableItems = (
  mode: ReleaseSelectionMode,
  alreadyExcludedReleases: Release['id'][] | undefined | null,
) => (projectTableItems: ProjectTableItem[]): ProjectTableItem[] => {
  if (mode === ReleaseSelectionMode.EXCLUDE && !alreadyExcludedReleases) {
    return projectTableItems;
  }

  if (mode === ReleaseSelectionMode.REINCLUDE && !alreadyExcludedReleases) {
    return [];
  }

  return projectTableItems
    .map((project) => {
      const children =
        project.children &&
        project.children.filter((release) => {
          const isAlreadyExcluded =
            alreadyExcludedReleases &&
            alreadyExcludedReleases.some(
              (releaseId) => releaseId === release.id,
            );

          return mode === ReleaseSelectionMode.REINCLUDE
            ? isAlreadyExcluded
            : !isAlreadyExcluded;
        });

      const result: ProjectTableItem = {
        ...project,
        children: children,
        get hasChildren() {
          return this.children && this.children.length > 0;
        },
      };

      return result;
    })
    .filter((item) => item.hasChildren);
};
