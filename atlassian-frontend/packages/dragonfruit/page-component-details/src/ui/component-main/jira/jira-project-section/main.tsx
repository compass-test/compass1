import React from 'react';

import Avatar from '@atlaskit/avatar';
import EditorWarningIcon from '@atlaskit/icon/glyph/editor/warning';
import Spinner from '@atlaskit/spinner';
import { Y300 } from '@atlaskit/theme/colors';
import { useSearchJiraIssues } from '@atlassian/dragonfruit-rest';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  EmptySectionWrapper,
  ErrorSectionWrapper,
  JiraIssueSection,
} from './jira-issue-section';
import messages from './messages';
import {
  EpicsSection,
  PageWrapper,
  ProjectHeader,
  ProjectNameText,
  SpinnerWrapper,
} from './styled';

export type SmartLinkJiraProject = {
  icon: {
    url: string;
  };
  name: string;
  summary: string;
  url: string;
};

type JiraProjectSectionProps = {
  project: SmartLinkJiraProject;
  jqlFilter: string;
};

export function JiraProjectSection(props: JiraProjectSectionProps) {
  const { project, jqlFilter } = props;
  const { formatMessage } = useIntl();
  const { cloudId } = useTenantInfo();

  const { data, loading, error } = useSearchJiraIssues({
    cloudId,
    jql: `project = "${project.name}" AND type = "Epic" ${jqlFilter}`,
    validateQuery: 'warn',
  });

  return (
    <>
      <ProjectHeader target="_blank" href={project.url}>
        {project.icon.url && (
          <Avatar
            appearance="square"
            size="small"
            src={project.icon.url}
            name={project.name}
          />
        )}
        <ProjectNameText>{project.name}</ProjectNameText>
      </ProjectHeader>
      <EpicsSection>
        {loading ? (
          <SpinnerWrapper>
            <Spinner size="large" />
          </SpinnerWrapper>
        ) : error ? (
          <ErrorSectionWrapper>
            <EditorWarningIcon primaryColor={Y300} label="error" />
            {formatMessage(messages.fetchIssuesError)}
          </ErrorSectionWrapper>
        ) : (
          <PageWrapper>
            {(data?.issues || []).length > 0 ? (
              data?.issues.map((issue) => (
                <JiraIssueSection
                  project={project.name}
                  epicIssue={issue}
                  jqlFilter={jqlFilter}
                />
              ))
            ) : (
              <EmptySectionWrapper>
                {formatMessage(messages.emptySection)}
              </EmptySectionWrapper>
            )}
            <JiraIssueSection project={project.name} jqlFilter={jqlFilter} />
          </PageWrapper>
        )}
      </EpicsSection>
    </>
  );
}
