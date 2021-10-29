import React from 'react';

import { IntlProvider } from 'react-intl';

import ProjectsContent from './index';

export const ProjectsContentJiraJSM = () => {
  return (
    <IntlProvider locale="en">
      <ProjectsContent
        projectStatsOfJSM={{
          totalProjects: 12,
          totalIssues: 200,
          attachments: {
            totalSizeBytes: 256,
          },
        }}
        projectStatsOfJira={{
          totalProjects: 12,
          totalIssues: 200,
          attachments: {
            totalSizeBytes: 256,
          },
        }}
      />
    </IntlProvider>
  );
};
