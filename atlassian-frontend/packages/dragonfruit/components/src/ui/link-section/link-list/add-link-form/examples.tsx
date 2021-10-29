import React, { ReactElement } from 'react';

import { action } from '@storybook/addon-actions';
import { radios } from '@storybook/addon-knobs';

import { FlagMap } from '@atlassian/dragonfruit-feature-flags';
import { CompassLinkType } from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  ApolloNetworkErrorProvider,
  Resolvers,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { compassLinkTypes } from '../../../../common/test-utils';

import { AddLinkForm, Props } from './index';

export default {
  decorators: [(storyFn: () => ReactElement) => <div>{storyFn()}</div>],
  excludeStories: ['AddLinkFormTemplate', 'AddLinkFormNetworkErrorTemplate'],
};

const MOCK_COMPONENT_ID =
  'ari:cloud:compass:e1efaa0f-9172-4962-a37d-b00152456cf4:component/abcdaa0f-9172-4962-a37d-b00152456cf4/7f9ae394-5c1b-11ea-9a95-0ec70051ff9e';

type TemplateArgs = {
  flags?: FlagMap;
  resolvers?: Resolvers;
};

export const AddLinkFormTemplate = ({
  componentId = MOCK_COMPONENT_ID,
  linkType = CompassLinkType.REPOSITORY,
  onCancel = () => {},
  onSuccess = () => {},
  flags,
  resolvers,
}: Partial<Props> & TemplateArgs) => (
  <CompassTestProvider flags={flags}>
    <ApolloAutoMockProvider resolvers={resolvers}>
      <AddLinkForm
        componentId={componentId}
        linkType={linkType}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    </ApolloAutoMockProvider>
  </CompassTestProvider>
);

export const AddLinkFormNetworkErrorTemplate = ({
  componentId = MOCK_COMPONENT_ID,
  linkType = CompassLinkType.REPOSITORY,
  onCancel = () => {},
  onSuccess = () => {},
  flags,
}: Partial<Props> & TemplateArgs) => (
  <CompassTestProvider flags={flags}>
    <ApolloNetworkErrorProvider>
      <AddLinkForm
        componentId={componentId}
        linkType={linkType}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    </ApolloNetworkErrorProvider>
  </CompassTestProvider>
);

export const Example = () => {
  const label = 'Link type';
  const defaultValue = CompassLinkType.REPOSITORY;
  const compassLinkType: CompassLinkType = radios(
    label,
    compassLinkTypes,
    defaultValue,
  );

  const resolvers = () => ({
    Mutation: {
      compass: () => ({
        createComponentLink: () => {
          return {
            success: true,
          };
        },
      }),
    },
  });

  return (
    <AddLinkFormTemplate
      linkType={compassLinkType}
      onCancel={action('onCancel')}
      onSuccess={action('onSuccess')}
      resolvers={resolvers}
    />
  );
};

export const ExampleWithNetworkFailure = () => {
  const label = 'Link type';
  const defaultValue = CompassLinkType.REPOSITORY;
  const compassLinkType: CompassLinkType = radios(
    label,
    compassLinkTypes,
    defaultValue,
  );

  return (
    <AddLinkFormNetworkErrorTemplate
      linkType={compassLinkType}
      onCancel={action('onCancel')}
      onSuccess={action('onSuccess')}
    />
  );
};
