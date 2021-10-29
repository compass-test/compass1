import React from 'react';

import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ComponentOwnerContainer } from '../src';

export default function ComponentOwnerCardExample() {
  const Container = styled.div`
    width: ${gridSize() * 33}px;
  `;

  return (
    <CompassTestProvider locale="en">
      <ApolloAutoMockProvider>
        <Container>
          <ComponentOwnerContainer componentId={'test'} />
        </Container>
      </ApolloAutoMockProvider>
    </CompassTestProvider>
  );
}
