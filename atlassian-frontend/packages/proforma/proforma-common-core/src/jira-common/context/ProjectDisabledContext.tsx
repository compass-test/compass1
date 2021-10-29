import React, {
  ComponentClass,
  createContext,
  FC,
  ReactNode,
  useContext,
} from 'react';

export const ProjectDisabledContext = createContext<boolean | undefined>(
  undefined,
);

interface ProjectDisabledProviderProps {
  children: ReactNode;
  projectDisabled: boolean;
}

export const ProjectDisabledProvider: FC<ProjectDisabledProviderProps> = ({
  children,
  projectDisabled,
}) => {
  return (
    <ProjectDisabledContext.Provider value={projectDisabled}>
      {children}
    </ProjectDisabledContext.Provider>
  );
};

export function useProjectDisabled() {
  const ProjectDisabled = useContext(ProjectDisabledContext);
  if (ProjectDisabled === undefined) {
    throw new Error(
      'useProjectDisabled must be used within a ProjectDisabledProvider',
    );
  }
  return ProjectDisabled;
}

export const withProjectDisabled = <C extends ComponentClass>(
  Component: C,
): C => {
  return (((props: any) => {
    const projectDisabled = useProjectDisabled();
    return <Component {...props} projectDiabled={projectDisabled} />;
  }) as any) as C;
};
