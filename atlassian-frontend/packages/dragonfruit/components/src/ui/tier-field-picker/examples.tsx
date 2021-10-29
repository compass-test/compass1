import React from 'react';

import { boolean } from '@storybook/addon-knobs';

import {
  CompassComponentType,
  CompassFieldType,
  useGetComponentDetailsQuery,
} from '@atlassian/dragonfruit-graphql';
import {
  ApolloAutoMockProvider,
  ApolloProviderMockProps,
  fake,
} from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { Props } from './types';

import { TierFieldPicker } from './index';

const COMPONENT_DETAILS_WITH_TIER_FIELD_MOCK = {
  CompassComponent: fake({
    type: CompassComponentType.SERVICE,
    fields: [
      {
        __typename: 'CompassEnumField',
        definition: {
          id: 'compass:tier',
          type: CompassFieldType.ENUM,
        },
        value: ['4'],
      },
    ],
  }),
};

const UPDATE_COMPONENT_DETAILS_ERROR_RESOLVER = () => ({
  Mutation: {
    compass: () => ({
      updateComponent: () => {
        return {
          success: false,
        };
      },
    }),
  },
});

export default {
  excludeStories: 'TierFieldPickerTemplate',
};

// subscribe apollo to a single component
function SubscribedTierFieldPicker(props: Partial<Props>) {
  const { data } = useGetComponentDetailsQuery({
    variables: { id: 'abcdef' },
  });

  const component = data?.compass?.component;

  if (!component || component.__typename === 'QueryError') {
    return null;
  }
  return <TierFieldPicker component={component} {...props} />;
}

export const TierFieldPickerTemplate = ({
  isDisabled = false,
  mocks = COMPONENT_DETAILS_WITH_TIER_FIELD_MOCK,
  resolvers = undefined,
}: Pick<Props, 'isDisabled'> & ApolloProviderMockProps) => {
  return (
    <CompassTestProvider>
      <ApolloAutoMockProvider mocks={mocks} resolvers={resolvers}>
        <SubscribedTierFieldPicker isDisabled={isDisabled} />
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
};

export const TierFieldPickerExample = () => {
  const isDisabled = boolean('isDisabled?', false, 'Props');
  const isSuccessful = boolean('isSuccessful?', true, 'Props');

  const resolvers = isSuccessful
    ? undefined
    : UPDATE_COMPONENT_DETAILS_ERROR_RESOLVER;

  return (
    <TierFieldPickerTemplate isDisabled={isDisabled} resolvers={resolvers} />
  );
};
