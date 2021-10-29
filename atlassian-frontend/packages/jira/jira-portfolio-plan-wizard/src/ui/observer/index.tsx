import React from 'react';

import IssueCountObserver from './issue-count';
import IssueTypesObserver from './issue-types';
import OverLimitObserver from './over-limit';
import ProjectsAndReleasesObserver from './project-and-releases';
import StatusTypesObserver from './status-types';

type Props = {
  autoExcludeReleased?: boolean;
};

/**
 * includes all observers
 */
const Observer: React.FC<Props> = ({ autoExcludeReleased = true }) => {
  return (
    <>
      <IssueCountObserver />
      <IssueTypesObserver />
      <OverLimitObserver />
      <ProjectsAndReleasesObserver autoExcludeReleased={autoExcludeReleased} />
      <StatusTypesObserver />
    </>
  );
};

export default Observer;
