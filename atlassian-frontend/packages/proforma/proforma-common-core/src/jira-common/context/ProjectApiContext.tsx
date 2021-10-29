import React, {
  ComponentClass,
  createContext,
  FC,
  ReactNode,
  useContext,
} from 'react';

import { ProjectApi } from '../apis/ProjectApi';

export const ProjectApiContext = createContext<ProjectApi | undefined>(
  undefined,
);

interface ProjectApiProviderProps {
  children: ReactNode;
  projectApi: ProjectApi;
}

export const ProjectApiProvider: FC<ProjectApiProviderProps> = ({
  children,
  projectApi,
}) => {
  return (
    <ProjectApiContext.Provider value={projectApi}>
      {children}
    </ProjectApiContext.Provider>
  );
};

export function useProjectApi() {
  const projectApi = useContext(ProjectApiContext);
  if (projectApi === undefined) {
    throw new Error('useProjectApi must be used within a ProjectApiProvider');
  }
  return projectApi;
}

export const withProjectApi = <C extends ComponentClass>(Component: C): C => {
  return (((props: any) => {
    const projectApi = useProjectApi();
    return <Component {...props} projectApi={projectApi} />;
  }) as any) as C;
};
