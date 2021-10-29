import React, { createContext, useContext } from 'react';

import { IssueSource, Project, Release } from '../../common/types';
import { useProjectsAndReleasesByIssueSourcesService } from '../../services';
import { useAPI } from '../api';

type ContextType = {
  projects: Project[] | undefined;
  releases: Release[] | undefined;
  loading: boolean;
  error: Error | undefined;
  fetchData: (arg0: IssueSource[]) => Promise<void>;
};

const context = createContext<ContextType>({
  projects: undefined,
  releases: undefined,
  loading: false,
  error: undefined,
  fetchData: async () => {},
});

export const ProjectsAndReleasesProvider: React.FC<{}> = ({ children }) => {
  const api = useAPI();
  const {
    fetchData,
    loading,
    data,
    error,
  } = useProjectsAndReleasesByIssueSourcesService(api);
  const value = {
    loading,
    projects: data?.projects,
    releases: data?.releases,
    error,
    fetchData,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useProjectsAndReleases = () => useContext(context);
