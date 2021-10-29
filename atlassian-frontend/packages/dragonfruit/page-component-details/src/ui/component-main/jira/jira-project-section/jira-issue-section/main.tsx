import React, { useState } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Avatar from '@atlaskit/avatar';
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large';
import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';
import HipchatChevronDownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down';
import Spinner from '@atlaskit/spinner';
import { Y300 } from '@atlaskit/theme/colors';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { JiraIssue, useSearchJiraIssues } from '@atlassian/dragonfruit-rest';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { openInNewTab, useIntl } from '@atlassian/dragonfruit-utils';

import { JiraIssueCard } from './jira-issue-card';
import messages from './messages';
import {
  EmptySectionWrapper,
  EpicExpandDiv,
  ErrorSectionWrapper,
  IssueKeyWrapper,
  PageWrapper,
  SpinnerWrapper,
} from './styled';

type JiraIssueSectionProps = {
  project: string;
  epicIssue?: JiraIssue;
  jqlFilter: string;
};

export function JiraIssueSection(props: JiraIssueSectionProps) {
  const { project, epicIssue, jqlFilter } = props;
  const { formatMessage } = useIntl();
  const [expanded, setExpanded] = useState(false);
  const { cloudId } = useTenantInfo();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const jql = epicIssue
    ? `project = "${project}" AND parentEpic = "${epicIssue.key}" ${jqlFilter}`
    : `project = "${project}" AND "Epic Link" = EMPTY and issuetype != Epic ${jqlFilter}`;
  const { data, loading, error } = useSearchJiraIssues({
    cloudId,
    jql,
    validateQuery: 'warn',
    lazy: epicIssue ? !expanded : false, // dont lazyload for issues with no epic section, because we might not want to display it at all
  });

  // When we do parentEpic = "${epicIssue.key}" as a search, the epicIssue is returned too, so we have to filter that out
  const issues = data?.issues || [];
  const issuesToDisplay = epicIssue
    ? issues.filter((i) => (epicIssue ? i.key !== epicIssue.key : true))
    : issues;

  const errorSection = (
    <ErrorSectionWrapper>
      <EditorWarningIcon primaryColor={Y300} label="error" />
      {formatMessage(messages.fetchIssuesError)}
    </ErrorSectionWrapper>
  );

  const epicExpandedEvent = (expanded: boolean) =>
    createAnalyticsEvent({
      action: 'click',
      actionSubject: expanded ? 'epicClosed' : 'epicExpanded',
    });

  const clickEpicEvent = createAnalyticsEvent({
    action: 'click',
    actionSubject: 'epic',
  });

  if (!epicIssue) {
    if (loading || issues.length <= 0) {
      return null;
    }
  }

  return (
    <>
      <EpicExpandDiv
        onClick={() => {
          fireUIAnalytics(epicExpandedEvent(expanded));
          setExpanded((e) => !e);
        }}
      >
        {expanded ? (
          <HipchatChevronDownIcon label="section-expanded" />
        ) : (
          <ChevronRightLargeIcon label="section-collapsed" />
        )}
        {epicIssue ? (
          <>
            <Avatar
              appearance="square"
              size="small"
              src={epicIssue.fields.issuetype.iconUrl.replace(
                `/ex/jira/${cloudId}`,
                ``,
              )}
              name={epicIssue.key}
            />
            <IssueKeyWrapper
              onClick={() => {
                fireUIAnalytics(clickEpicEvent);
                openInNewTab(
                  `${window.location.origin}/browse/${epicIssue.key}`,
                );
              }}
            >
              {epicIssue.key}
            </IssueKeyWrapper>
            {epicIssue.fields.summary}
          </>
        ) : (
          formatMessage(messages.noEpic)
        )}
      </EpicExpandDiv>
      {expanded &&
        (loading ? (
          <SpinnerWrapper>
            <Spinner size="large" />
          </SpinnerWrapper>
        ) : error ? (
          errorSection
        ) : (
          <PageWrapper>
            {issuesToDisplay.length ? (
              issuesToDisplay.map((i, index) => (
                <JiraIssueCard
                  issue={i}
                  roundedTop={index === 0}
                  roundedBottom={index === issuesToDisplay.length - 1}
                />
              ))
            ) : (
              <EmptySectionWrapper>
                {formatMessage(messages.emptySection)}
              </EmptySectionWrapper>
            )}
          </PageWrapper>
        ))}
    </>
  );
}
