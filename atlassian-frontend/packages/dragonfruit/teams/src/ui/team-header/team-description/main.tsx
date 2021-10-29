import React from 'react';

import { FormattedMessage } from 'react-intl';

import { parse as parseAri } from '@atlassian/cs-ari';
import {
  buildAtlassianTeamProfileURL,
  useIntl,
} from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { EmptyTeamDescription, TeamDescriptionWrapper } from './styled';

interface Props {
  description?: string;
  teamId: string;
  testId?: string;
}

const TeamDescription: React.FC<Props> = ({ description, teamId, testId }) => {
  const { formatMessage } = useIntl();

  const descriptionTextTestId = testId && `${testId}.text`;

  const emptyDescriptionTestId = testId && `${testId}.empty`;

  const parsedTeamARI = parseAri(teamId);
  const teamSitePage = buildAtlassianTeamProfileURL(
    parsedTeamARI.resourceId || '',
  );

  const emptyMessage = (
    <FormattedMessage
      {...messages.noTeamDescription}
      values={{
        TeamPageLink: (
          <a href={teamSitePage} target="_blank" rel="noopener noreferrer">
            {formatMessage(messages.atlassianTeamPage)}
          </a>
        ),
      }}
    />
  );
  return description ? (
    <TeamDescriptionWrapper data-testid={descriptionTextTestId}>
      {description}
    </TeamDescriptionWrapper>
  ) : (
    <EmptyTeamDescription data-testid={emptyDescriptionTestId}>
      {emptyMessage}
    </EmptyTeamDescription>
  );
};

export default TeamDescription;
