import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  MockDelete,
  MockEdit,
  MockTeamCheckin,
  MockTeamCheckinLongForm,
} from '../mocks';

import { TeamCheckinCard } from './index';

const Container = styled.div`
  width: ${gridSize() * 115}px;
  padding: ${gridSize() * 5}px;
`;

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const TeamCheckinCardShortFormExample = () => (
  <Container>
    <TeamCheckinCard
      onEdit={MockEdit}
      onDelete={MockDelete}
      teamCheckin={MockTeamCheckin}
    />
  </Container>
);

export const TeamCheckinCardLongFormExample = () => (
  <Container>
    <TeamCheckinCard
      onEdit={MockEdit}
      onDelete={MockDelete}
      teamCheckin={MockTeamCheckinLongForm}
    />
  </Container>
);
