import React from 'react';

import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { Card, CardBody } from '@atlassian/dragonfruit-common-ui';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import NoCriteria from './main';

const Container = styled.div`
  width: ${gridSize() * 33}px;
`;

export const NoCriteriaExample = () => (
  <CompassTestProvider>
    <Container>
      {/*
        This `NoCriteria` component would be called within the `CardBody` as
        part of `ScorecardQuickView` component. Setting those necessary `Card`
        and `CardBody` components to simulate its use.
      */}
      <Card>
        <CardBody>
          <NoCriteria />
        </CardBody>
      </Card>
    </Container>
  </CompassTestProvider>
);
