import React, { FC, ReactNode } from 'react';

import {
  ProjectDisabledProvider,
  ProjectIdProvider,
} from '@atlassian/proforma-common-core/jira-common-context';

interface ProjectFormsContext {
  projectId: number;
  projectDisabled: boolean;
}

interface ProjectFormsContextProviderProps {
  context: ProjectFormsContext;
  children: ReactNode;
}

export const ProjectFormsContextProvider: FC<ProjectFormsContextProviderProps> = ({
  context,
  children,
}) => {
  const { projectId, projectDisabled } = context;
  return (
    <ProjectIdProvider projectId={projectId}>
      <ProjectDisabledProvider projectDisabled={projectDisabled}>
        {children}
      </ProjectDisabledProvider>
    </ProjectIdProvider>
  );
};
