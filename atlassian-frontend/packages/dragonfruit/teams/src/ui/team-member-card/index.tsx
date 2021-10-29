import React from 'react';

import { di } from 'react-magnetic-di';

import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import { Disclosure, LoadingView } from '@atlassian/dragonfruit-common-ui';
import { TeamMember, useGetTeamMembers } from '@atlassian/dragonfruit-rest';
import { useIntl } from '@atlassian/dragonfruit-utils';

import teamCommonMessages from '../../common/ui/messages';
import { TeamsCardError } from '../../common/ui/teams-cards-error';

import MemberRow from './member-row';
import messages from './messages';
import { MembersList } from './styled';

type TeamMemberCardProps = {
  teamId: string;
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ teamId }) => {
  di(useGetTeamMembers);
  const { formatMessage } = useIntl();
  const { data, isLoading, error, errorCode } = useGetTeamMembers(teamId);

  if (isLoading) {
    return <LoadingView />;
  } else if (error) {
    return errorCode === 403 ? (
      <TeamsCardError
        description={formatMessage(
          teamCommonMessages.errorLoadingOrgPermissions,
        )}
      />
    ) : (
      <TeamsCardError description={formatMessage(messages.errorContent)} />
    );
  } else if (data) {
    const numMembers: Number = data.length;
    const cardTitle =
      numMembers === 1
        ? formatMessage(messages.summaryContentTextSingular)
        : formatMessage(messages.summaryContentText, {
            ['teamMemberCount']: numMembers.toString(),
          });

    const DetailContent = () => (
      <MembersList>
        {data.map((member: TeamMember) => {
          return (
            <MemberRow
              accountId={member.accountId}
              picture={member.picture}
              name={member.name}
              key={member.accountId}
            />
          );
        })}
      </MembersList>
    );

    return (
      <Disclosure
        expanded
        testId={'dragonfruit-teams.ui.team-member-card.disclosure'}
      >
        <Disclosure.ExpandingCard
          heading={cardTitle}
          icon={<PeopleGroupIcon label="" />}
          details={DetailContent}
        />
      </Disclosure>
    );
  }
  return <div />;
};

export default TeamMemberCard;
