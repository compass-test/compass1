import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { gridSize } from '@atlaskit/theme/constants';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  MockDelete,
  MockEdit,
  MockTeamCheckin,
  MockTeamCheckinLongForm,
} from '../../common/ui/mocks';

import { PastTeamCheckins } from './index';

const Container = styled.div`
  width: ${gridSize() * 115}px;
  padding: 0px ${gridSize() * 3}px;
`;

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

export const PastTeamCheckinsExample = () => (
  <Container>
    <PastTeamCheckins
      onEdit={MockEdit}
      onDelete={MockDelete}
      teamCheckins={[MockTeamCheckin, MockTeamCheckinLongForm]}
    />
  </Container>
);
