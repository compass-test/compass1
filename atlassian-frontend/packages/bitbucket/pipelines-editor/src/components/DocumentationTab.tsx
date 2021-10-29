import React, { useCallback } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';

import { DocumentationLinks, DocumentationWrapper } from './styled';

type Props = {};

const DocumentationTab: React.FC<Props> = ({}) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const publishAnalyticsEvent = useCallback(
    (
      actionSubjectId: // https://data-portal.us-east-1.prod.public.atl-paas.net/analytics/registry/27649
      | 'visitPipelinesCommunity'
        // https://data-portal.us-east-1.prod.public.atl-paas.net/analytics/registry/27650
        | 'pipelinesGetStartedDocs'
        // https://data-portal.us-east-1.prod.public.atl-paas.net/analytics/registry/27651
        | 'pipelinesConfigureYamlDocs'
        // https://data-portal.us-east-1.prod.public.atl-paas.net/analytics/registry/27651
        | 'setUpDeploymentsDocs',
    ) => {
      createAnalyticsEvent({
        action: 'clicked',
        actionSubject: 'button',
        actionSubjectId,
      }).fire();
    },
    [createAnalyticsEvent],
  );

  return (
    <DocumentationWrapper>
      <h4>How to use this template</h4>

      <p>
        Templates are composed of steps that are used to build, test, and deploy
        in multiple languages. When you choose a template, it automatically
        replaces any previous content or configuration.
      </p>

      <p>Make sure you add the token and replace the script.</p>

      <h4>Community support</h4>
      <p>
        Visit our community to ask questions and learn more about product
        updates.
      </p>
      <br />
      <Button
        href="https://community.atlassian.com/t5/Bitbucket-Pipelines/ct-p/bitbucket-pipelines"
        target="_blank"
        onClick={() => publishAnalyticsEvent('visitPipelinesCommunity')}
      >
        Visit Pipelines community
      </Button>
      <h4>Related documentation</h4>
      <DocumentationLinks>
        <Button
          appearance="link"
          spacing="compact"
          href="https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-pipelines/"
          target="_blank"
          onClick={() => publishAnalyticsEvent('pipelinesGetStartedDocs')}
        >
          Getting Started with Bitbucket Pipelines
        </Button>
        <br />
        <Button
          appearance="link"
          spacing="compact"
          href="https://support.atlassian.com/bitbucket-cloud/docs/configure-bitbucket-pipelinesyml/"
          target="_blank"
          onClick={() => publishAnalyticsEvent('pipelinesConfigureYamlDocs')}
        >
          Configure bitbucket-pipelines.yml
        </Button>
        <br />
        <Button
          appearance="link"
          spacing="compact"
          href="https://support.atlassian.com/bitbucket-cloud/docs/set-up-and-monitor-bitbucket-deployments/"
          target="_blank"
          onClick={() => publishAnalyticsEvent('setUpDeploymentsDocs')}
        >
          Set up and monitor deployments
        </Button>
      </DocumentationLinks>
    </DocumentationWrapper>
  );
};

export default React.memo(DocumentationTab);
