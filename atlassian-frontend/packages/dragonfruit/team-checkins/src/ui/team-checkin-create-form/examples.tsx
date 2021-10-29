import React from 'react';

import styled from '@emotion/styled';
import { text } from '@storybook/addon-knobs';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { TeamCheckinCreateForm } from './main';

const StoryWrapper = styled.div`
  max-width: 500px;
`;

export const TeamCheckinFormExample = () => {
  const testId = text('testId', 'sampleTestId');

  return <TeamCheckinCreateForm teamId="foo" testId={testId} />;
};

export default {
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <CompassTestProvider>
        <ApolloAutoMockProvider>
          <StoryWrapper>{storyFn()}</StoryWrapper>
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    ),
  ],
};
