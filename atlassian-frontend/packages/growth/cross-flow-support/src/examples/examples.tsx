import { JourneyTargetProductDefinition } from '@atlassiansox/cross-flow-api-internals';
import { ProductKeys } from '../lib/growth-constants';
import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import React, { Fragment, ComponentType, useCallback } from 'react';
import { useCrossFlow } from '../confluence';
import { CrossFlowProvider } from './crossFlowProviderMock';

const mockAnalyticsClient = {
  sendUIEvent: action('sendUIEvent'),
  sendTrackEvent: action('sendTrackEvent'),
  sendOperationalEvent: action('sendOperationalEvent'),
  sendScreenEvent: action('sendScreenEvent'),
};

const crossFlowJourneysInfoLink = (
  <a
    target="_blank"
    href="https://hello.atlassian.net/wiki/spaces/PGT/pages/658261396#The-Cross-flow-Essentials-experience"
  >
    ℹ️ More information about Cross Flow Journeys
  </a>
);

const TryButton: ComponentType<JourneyTargetProductDefinition> = (props) => {
  const crossFlowApi = useCrossFlow();

  const onTryClick = useCallback(async () => {
    if (crossFlowApi.isEnabled) {
      const completionStatus = await crossFlowApi.api.open({
        sourceComponent: 'TryButton',
        sourceContext: 'storybook',
        ...props,
      });
      action('completionStatus')(completionStatus);
    }
  }, [props, crossFlowApi]);

  return crossFlowApi.isEnabled ? (
    <button onClick={onTryClick}>
      {props.children} [{props.journey}]
    </button>
  ) : (
    <button disabled>
      {props.children} [{props.journey}]
    </button>
  );
};

export const GetStartedTouchpointExample = () => {
  return (
    <Fragment>
      <h1>In-product "Get Started" touch point</h1>
      {crossFlowJourneysInfoLink}
      <hr />
      <TryButton targetProduct={ProductKeys.CONFLUENCE} journey="get-started">
        Try Confluence
      </TryButton>
      <hr />
      <TryButton
        targetProduct={ProductKeys.JIRA_SOFTWARE}
        journey="get-started"
      >
        Try Jira Software
      </TryButton>
      <hr />
      <TryButton targetProduct={ProductKeys.TRELLO} journey="get-started">
        Try Trello
      </TryButton>
    </Fragment>
  );
};

export const DiscoverTouchpointExample = () => {
  return (
    <Fragment>
      <h1>In-product "Discover" touch point</h1>
      {crossFlowJourneysInfoLink}
      <hr />
      <TryButton journey="discover">Discover more Atlassian products</TryButton>
    </Fragment>
  );
};

export const DecideTouchpointExample = () => {
  return (
    <Fragment>
      <h1>In-product "Decide" touch point</h1>
      {crossFlowJourneysInfoLink}
      <hr />
      <TryButton journey="decide" targetProduct={ProductKeys.CONFLUENCE}>
        Try Confluence
      </TryButton>
    </Fragment>
  );
};

const CrossFlowProviderDecorator = (StoryFn: () => JSX.Element) => (
  <CrossFlowProvider
    cloudId="abc"
    originProduct="confluence"
    locale="en"
    analyticsClient={mockAnalyticsClient}
    redirectToWac={boolean('redirectToWac', false)}
  >
    {/* Hooks dont work on element not invoked with createElement https://github.com/storybookjs/storybook/issues/8426  */}
    <StoryFn />
  </CrossFlowProvider>
);

export default {
  title: 'Cross Flow Support',
  decorators: [withKnobs, CrossFlowProviderDecorator],
};
