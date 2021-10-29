import React, { useEffect, useState } from 'react';

import Button from '@atlaskit/button';
import { Code } from '@atlaskit/code';
import EmptyState from '@atlaskit/empty-state';
import PageHeader from '@atlaskit/page-header';
import Spinner from '@atlaskit/spinner';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { MainContainer } from '@atlassian/dragonfruit-common-ui';
import { AddJiraProject } from '@atlassian/dragonfruit-common-ui/assets';
import { AddLinkForm } from '@atlassian/dragonfruit-components';
import {
  CompassComponentDetailViewFragment,
  CompassLinkType,
} from '@atlassian/dragonfruit-graphql';
import { useIntl, useSmartLinks } from '@atlassian/dragonfruit-utils';

import { ComponentBreadcrumbs } from '../../../common/ui/breadcrumbs';

import {
  JiraProjectSection,
  SmartLinkJiraProject,
} from './jira-project-section';
import messages from './messages';
import { Description, IssuesFilterExplanation, SpinnerWrapper } from './styled';

type JiraComponentPageProps = {
  component: CompassComponentDetailViewFragment;
};

export function JiraComponentPage(props: JiraComponentPageProps) {
  const { component } = props;
  const { formatMessage } = useIntl();
  const { client } = useSmartLinks();

  const [addProjectFormOpen, setAddProjectFormOpen] = useState<boolean>(true);
  const [projects, setProjects] = useState<SmartLinkJiraProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);

  const advSearchUri = `/issues/?jql=${encodeURIComponent(
    'ORDER BY created DESC',
  )}`;
  const jqlFilter = `AND component = "${component.name}" ORDER BY updated DESC`;

  const hideAddProjectForm = () => {
    setAddProjectFormOpen(false);
  };

  useEffect(() => {
    const projectLinks =
      component.links?.filter((l) => l.type === CompassLinkType.PROJECT) || [];
    Promise.all(projectLinks?.map((l) => client.fetchData(l.url)))
      .then((res) =>
        setProjects(res.map(({ data }) => data as SmartLinkJiraProject)),
      )
      .catch((error) =>
        setProjects(
          projectLinks.map((link) => {
            const urlParts = link.url.split('/');
            return {
              name: urlParts[urlParts.length - 1],
              summary: '',
              icon: { url: '' },
              url: link.url,
            };
          }),
        ),
      )
      .finally(() => setLoadingProjects(false));
  }, [client, component]);

  return (
    <MainContainer>
      <PageHeader
        breadcrumbs={
          <ComponentBreadcrumbs
            componentId={component.id}
            componentName={component.name}
            componentType={component.type}
          />
        }
        actions={
          <Button
            href={window.location.origin + advSearchUri}
            onClick={(_, analyticsEvent) => {
              fireUIAnalytics(analyticsEvent, 'advancedSearchJiraLink');
            }}
          >
            {formatMessage(messages.jiraAdvSearch)}
          </Button>
        }
      >
        {formatMessage(messages.pageHeader)}
      </PageHeader>
      <Description>
        {formatMessage(messages.pageDescription)}
        <IssuesFilterExplanation>
          <span>{formatMessage(messages.issueFilterExplanation)}</span>{' '}
          <Code testId="dragonfruit.jira-issue-explanation.component-name">
            {component.name}
          </Code>
          <span>{formatMessage(messages.issueFilterExplanation2)}</span>
        </IssuesFilterExplanation>
      </Description>
      {loadingProjects ? (
        <SpinnerWrapper>
          <Spinner size="large" />
        </SpinnerWrapper>
      ) : projects.length === 0 ? (
        <>
          <EmptyState
            header={formatMessage(messages.noProjectsHeader)}
            description={formatMessage(messages.noProjectsDescription)}
            imageUrl={AddJiraProject}
            width={'wide'}
            maxImageWidth={369}
            maxImageHeight={133}
          />
          {addProjectFormOpen && (
            <AddLinkForm
              componentId={component.id}
              linkType={CompassLinkType.PROJECT}
              onCancel={hideAddProjectForm}
              onSuccess={() => {
                setLoadingProjects(true);
                hideAddProjectForm();
              }}
            />
          )}
        </>
      ) : (
        Array.from(projects).map((project: SmartLinkJiraProject) => (
          <JiraProjectSection project={project} jqlFilter={jqlFilter} />
        ))
      )}
    </MainContainer>
  );
}
