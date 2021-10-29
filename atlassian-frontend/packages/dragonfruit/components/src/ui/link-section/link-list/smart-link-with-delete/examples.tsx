import React, { ReactElement } from 'react';

import { boolean, radios } from '@storybook/addon-knobs';

import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
  getFakeLink,
  Resolvers,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { compassLinkTypes } from '../../../../common/test-utils';

import { Props, SmartLinkWithDelete } from './main';

export default {
  decorators: [
    (storyFn: () => ReactElement) => {
      return <div>{storyFn()}</div>;
    },
  ],
  excludeStories: [
    'SmartLinkWithDeleteTemplate',
    'SmartLinkWithNetworkErrorTemplate',
  ],
};

const MOCK_COMPONENT_ID =
  'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:component/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';
const MOCK_COMPONENT_NAME = 'Mock Component';
const MOCK_LINK = getFakeLink(CompassLinkType.REPOSITORY);

type TemplateArgs = {
  resolvers?: Resolvers;
};

export const SmartLinkWithDeleteTemplate = ({
  link = MOCK_LINK,
  componentId = MOCK_COMPONENT_ID,
  componentName = MOCK_COMPONENT_NAME,
  isDisabled = false,
  resolvers,
}: Partial<Props> & TemplateArgs) => (
  <CompassTestProvider>
    <ApolloAutoMockProvider resolvers={resolvers}>
      <SmartLinkWithDelete
        link={link}
        componentId={componentId}
        componentName={componentName}
        isDisabled={isDisabled}
      />
    </ApolloAutoMockProvider>
  </CompassTestProvider>
);

export const SmartLinkWithNetworkErrorTemplate = ({
  link = MOCK_LINK,
  componentId = MOCK_COMPONENT_ID,
  componentName = MOCK_COMPONENT_NAME,
  isDisabled = false,
}: Partial<Props>) => (
  <CompassTestProvider>
    <ApolloNetworkErrorProvider>
      <SmartLinkWithDelete
        link={link}
        componentId={componentId}
        componentName={componentName}
        isDisabled={isDisabled}
      />
    </ApolloNetworkErrorProvider>
  </CompassTestProvider>
);

export const Example = () => {
  const label = 'Link type';
  const defaultValue = CompassLinkType.REPOSITORY;
  const value: CompassLinkType = radios(label, compassLinkTypes, defaultValue);
  const isLinkDisabled = boolean('Disabled', false);

  const link = getFakeLink(value);

  return (
    <SmartLinkWithDeleteTemplate link={link} isDisabled={isLinkDisabled} />
  );
};

export const ExampleWithNetworkFailure = () => {
  const label = 'Link type';
  const defaultValue = CompassLinkType.REPOSITORY;
  const value: CompassLinkType = radios(label, compassLinkTypes, defaultValue);
  const isLinkDisabled = boolean('Disabled', false);

  const link = getFakeLink(value);

  return (
    <SmartLinkWithNetworkErrorTemplate
      link={link}
      isDisabled={isLinkDisabled}
    />
  );
};
