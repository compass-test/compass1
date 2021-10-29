import React, {
  ComponentClass,
  createContext,
  FC,
  ReactNode,
  useContext,
} from 'react';

import { ProjectFormApi } from '../apis/ProjectFormApi';

export const ProjectFormApiContext = createContext<ProjectFormApi | undefined>(
  undefined,
);

interface ProjectFormApiProviderProps {
  children: ReactNode;
  projectFormApi: ProjectFormApi;
}

export const ProjectFormApiProvider: FC<ProjectFormApiProviderProps> = ({
  children,
  projectFormApi,
}) => {
  return (
    <ProjectFormApiContext.Provider value={projectFormApi}>
      {children}
    </ProjectFormApiContext.Provider>
  );
};

export function useProjectFormApi() {
  const projectFormApi = useContext(ProjectFormApiContext);
  if (projectFormApi === undefined) {
    throw new Error(
      'useProjectFormApi must be used within a ProjectFormApiProvider',
    );
  }
  return projectFormApi;
}

export const withProjectFormApi = <C extends ComponentClass>(
  Component: C,
): C => {
  return (((props: any) => {
    const projectFormApi = useProjectFormApi();
    return <Component {...props} projectFormApi={projectFormApi} />;
  }) as any) as C;
};
