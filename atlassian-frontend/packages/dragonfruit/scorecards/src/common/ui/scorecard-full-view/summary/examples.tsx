import React from 'react';

import styled from 'styled-components';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  mockProgress,
  mockScorecardDescription,
  mockScorecardName,
} from './mocks';

import Summary from './index';

const Container = styled.div`
  width: 600px;
  border-radius: 3px;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px 0px;
  padding: 12px 24px 24px 24px;
`;

export const SummaryExample = () => {
  return (
    <CompassTestProvider>
      <Container>
        <Summary
          scorecardName={mockScorecardName}
          scorecardDescription={mockScorecardDescription}
          progress={mockProgress}
        />
      </Container>
    </CompassTestProvider>
  );
};
