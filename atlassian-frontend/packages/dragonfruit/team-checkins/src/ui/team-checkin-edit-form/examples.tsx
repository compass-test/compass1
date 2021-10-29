import React from 'react';

import styled from '@emotion/styled';
import { text } from '@storybook/addon-knobs';

import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { TeamCheckinEditForm } from './main';

const StoryWrapper = styled.div`
  max-width: 500px;
`;

export const TeamCheckinEditFormExample = () => {
  const testId = text('testId', 'sampleTestId');

  const MOCK_DATA = {
    id: '6',
    mood: '3',
    response1: 'Most things, but not everything.',
    response2: 'Always room for improvement!',
    response3: 'Everywhere and nowhere.',
  };

  return <TeamCheckinEditForm teamCheckin={MOCK_DATA} testId={testId} />;
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
