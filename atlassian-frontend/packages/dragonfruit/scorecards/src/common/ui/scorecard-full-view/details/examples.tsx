import React from 'react';

import styled from 'styled-components';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  mockComponentName,
  mockComponentType,
  mockImportance,
  mockOwnerName,
  mockOwnerPicture,
} from './mocks';

import Details from './index';

const Container = styled.div`
  width: 600px;
  border-radius: 3px;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 31%) 0px 0px 1px 0px;
  padding: 12px 0px 12px 24px;
`;

export const DetailsExample = () => {
  return (
    <CompassTestProvider>
      <Container>
        <Details
          ownerName={mockOwnerName}
          ownerPicture={mockOwnerPicture}
          componentType={mockComponentType}
          componentName={mockComponentName}
          importance={mockImportance}
        />
      </Container>
    </CompassTestProvider>
  );
};
