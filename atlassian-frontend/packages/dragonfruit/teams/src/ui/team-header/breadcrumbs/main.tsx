import React from 'react';

import Breadcrumbs from '@atlaskit/breadcrumbs';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { BreadcrumbsLink } from '@atlassian/dragonfruit-common-ui';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

type TeamBreadcrumbsProps = {
  teamId?: string;
  teamName?: string;
};

export function TeamBreadcrumbs(props: TeamBreadcrumbsProps) {
  const { teamId, teamName } = props;

  const { formatMessage } = useIntl();

  return (
    <Breadcrumbs>
      <BreadcrumbsLink
        href={routes.TEAMS()}
        text={formatMessage(CommonMessages.teams)}
      />

      {teamId && teamName && (
        <BreadcrumbsLink href={routes.TEAM_DETAILS(teamId)} text={teamName} />
      )}
    </Breadcrumbs>
  );
}
