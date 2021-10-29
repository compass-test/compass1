import React from 'react';

import { DiProvider, injectable } from 'react-magnetic-di';
import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import {
  CompassTestProvider,
  MOCK_COMPASS_TEAM_ID,
} from '@atlassian/dragonfruit-testing';

import { ComponentOwnerContainer } from '../src';
import ComponentOwnerHeader from '../src/ui/component-owner/component-owner-header';
import { ComponentOwnerHeaderSuccess } from '../src/ui/component-owner/component-owner-header/examples';

export default function ComponentOwnerCardExample() {
  const HeaderDi = injectable(
    ComponentOwnerHeader,
    // @ts-ignore
    ComponentOwnerHeaderSuccess,
  );

  const Container = styled.div`
    width: ${gridSize() * 33}px;
  `;

  return (
    <DiProvider use={[HeaderDi]}>
      <CompassTestProvider locale="en">
        <ApolloAutoMockProvider>
          <Container>
            <ComponentOwnerContainer
              ownerId={`ari:cloud:teams::team/${MOCK_COMPASS_TEAM_ID}`}
              componentId={'test'}
            />
          </Container>
        </ApolloAutoMockProvider>
      </CompassTestProvider>
    </DiProvider>
  );
}
