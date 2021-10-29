import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { useUrlData } from '../../../../../common/ui/url-data';
import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';

import messages from './messages';
import { Product, TaskId } from '../../../../../common/types';
import { CrossProductLink } from '../../../../link-utility/cross-product-link';

const actionSubjectIds = {
  teams: 'jsmGettingStartedPanelSetupTeamTeams',
};

const SetupTeamItemCardContentBase = ({ intl }: InjectedIntlProps) => {
  const { opsgenieBaseUrl } = useUrlData();
  // Note, Opsgenie is not translated, so these strings copied from
  // Opsgenie elements are also not translated.
  const keyElements = {
    teams: (
      <strong>
        <CrossProductLink
          linkProduct={Product.Opsgenie}
          url={`${opsgenieBaseUrl}/teams/list`}
          subjectId={actionSubjectIds.teams}
        >
          Teams
        </CrossProductLink>
      </strong>
    ),
    addTeam: <strong>Add team</strong>,
    name: <strong>Name</strong>,
    addMembers: <strong>Add members</strong>,
    addTeamSubmit: <strong>Add team</strong>,
  };
  return (
    <ItemCardContent
      description={intl.formatMessage(messages.setupTeamDescription)}
      learnMore={{
        url: 'https://docs.opsgenie.com/docs/team-dashboard',
        text: intl.formatMessage(messages.setupTeamDashboardLearnMore),
        taskId: TaskId.SetupTeam,
      }}
      instructions={[
        makeInstruction(messages.setupTeamStep1, keyElements),
        makeInstruction(messages.setupTeamStep2, keyElements),
        makeInstruction(messages.setupTeamStep3, keyElements),
        makeInstruction(messages.setupTeamStep4, keyElements),
        makeInstruction(messages.setupTeamStep5, keyElements),
      ]}
    />
  );
};

export const SetupTeamItemCardContent = injectIntl(
  SetupTeamItemCardContentBase,
);
