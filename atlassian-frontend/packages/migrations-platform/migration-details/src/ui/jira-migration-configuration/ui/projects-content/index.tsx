import React, { FC, memo } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { ProjectStatsOf } from '../../../../common/types';

import { Ul } from './styled';
import { projectsConfigurationMessages } from './utils';
export type Props = {
  projectStatsOfJSM: ProjectStatsOf;
  projectStatsOfJira: ProjectStatsOf;
};

const ProjectsContent: FC<InjectedIntlProps & Props> = ({
  projectStatsOfJira,
  projectStatsOfJSM,
  intl,
}) => {
  return (
    <Ul key="projectsList">
      {projectsConfigurationMessages(
        intl,
        projectStatsOfJira,
        projectStatsOfJSM,
      ).map((message, ix) => {
        return <li key={ix}>{message}</li>;
      })}
    </Ul>
  );
};

export default memo(injectIntl(ProjectsContent));
