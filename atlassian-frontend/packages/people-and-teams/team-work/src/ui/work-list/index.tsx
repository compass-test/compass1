import React from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { LinkItem } from '@atlaskit/menu';
import Spinner from '@atlaskit/spinner';
import Tooltip from '@atlaskit/tooltip';

import { ErrorGenericImage, TicketImage } from '../../common/assets';
import EmptyState from '../../common/ui/empty-state';
import PriorityIcon from '../../common/ui/priority-icon';
import StatusLozenge from '../../common/ui/status-lozenge';
import { useTeamWorkService } from '../../services';

import { messages } from './messages';
import {
  AnchorWrapper,
  IssueDescription,
  IssueTypeIcon,
  LinkItemWrapper,
  SpinnerWrapper,
  WorkListItemAfterWrapper,
  WorkListItemBeforeWrapper,
} from './styled';
import type {
  WorkListContentProps,
  WorkListItemAfterProps,
  WorkListItemBeforeProps,
  WorkListProps,
} from './types';
import { urlPathJiraBrowse, urlPathJiraSearch } from './utils';

export const WorkListItemBefore = ({ issuetype }: WorkListItemBeforeProps) => (
  <WorkListItemBeforeWrapper>
    <Tooltip content={issuetype.name} position="top">
      <IssueTypeIcon src={issuetype.iconUrl} />
    </Tooltip>
  </WorkListItemBeforeWrapper>
);

export const WorkListItemAfter = ({
  priority,
  status,
}: WorkListItemAfterProps) => (
  <WorkListItemAfterWrapper>
    <Tooltip content={priority.name} position="top">
      <PriorityIcon name={priority.name} />
    </Tooltip>
    <StatusLozenge name={status.name} />
  </WorkListItemAfterWrapper>
);

export const WorkListContent = ({ items, teamId }: WorkListContentProps) => (
  <>
    <LinkItemWrapper>
      {items.map((item) => (
        <LinkItem
          key={item.id}
          href={urlPathJiraBrowse(item.key)}
          description={
            <IssueDescription>
              {item.key} {'\u2022'} {item.fields.project.name}
            </IssueDescription>
          }
          iconBefore={<WorkListItemBefore issuetype={item.fields.issuetype} />}
          iconAfter={
            <WorkListItemAfter
              priority={item.fields.priority}
              status={item.fields.status}
            />
          }
        >
          {item.fields.summary}
        </LinkItem>
      ))}
    </LinkItemWrapper>

    <AnchorWrapper>
      <a href={urlPathJiraSearch(teamId)}>
        <FormattedMessage {...messages.viewAll} />
      </a>
    </AnchorWrapper>
  </>
);

export const WorkList = ({
  teamId,
  actions,
  testId,
  intl,
}: WorkListProps & InjectedIntlProps): JSX.Element => {
  const { data, error, loading } = useTeamWorkService(teamId);

  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }

  if (error) {
    return (
      <EmptyState
        title={intl.formatMessage(messages.errorStateTitle)}
        description={intl.formatMessage(messages.errorStateDescription)}
        image={<ErrorGenericImage />}
      />
    );
  }

  const workItems = data?.issues || [];

  return workItems.length ? (
    <WorkListContent items={workItems} teamId={teamId} />
  ) : (
    <EmptyState
      title={intl.formatMessage(messages.emptyStateTitle)}
      description={intl.formatMessage(messages.emptyStateDescription)}
      image={<TicketImage />}
      actions={actions}
    />
  );
};

export default injectIntl(WorkList);
