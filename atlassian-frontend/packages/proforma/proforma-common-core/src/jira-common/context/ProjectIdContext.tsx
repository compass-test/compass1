import React, {
  ComponentClass,
  createContext,
  FC,
  ReactNode,
  useContext,
} from 'react';

export const ProjectIdContext = createContext<number | undefined>(undefined);

interface ProjectIdProviderProps {
  children: ReactNode;
  projectId: number;
}

export const ProjectIdProvider: FC<ProjectIdProviderProps> = ({
  children,
  projectId,
}) => {
  return (
    <ProjectIdContext.Provider value={projectId}>
      {children}
    </ProjectIdContext.Provider>
  );
};

export function useProjectId() {
  const projectId = useContext(ProjectIdContext);
  if (projectId === undefined) {
    throw new Error('useProjectId must be used within a ProjectIdProvider');
  }
  return projectId;
}

export const withProjectId = <C extends ComponentClass>(Component: C): C => {
  return (((props: any) => {
    const projectId = useProjectId();
    return <Component {...props} projectId={projectId} />;
  }) as any) as C;
};
