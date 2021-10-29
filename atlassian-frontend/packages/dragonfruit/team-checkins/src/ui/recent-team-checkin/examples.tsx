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

import { RecentTeamCheckin } from './main';

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

export const RecentTeamCheckinExample = () => (
  <Container>
    <RecentTeamCheckin
      onEdit={MockEdit}
      onDelete={MockDelete}
      teamCheckin={MockTeamCheckin}
    />
  </Container>
);

export const RecentTeamCheckinLongFormExample = () => (
  <Container>
    <RecentTeamCheckin
      onEdit={MockEdit}
      onDelete={MockDelete}
      teamCheckin={MockTeamCheckinLongForm}
    />
  </Container>
);
