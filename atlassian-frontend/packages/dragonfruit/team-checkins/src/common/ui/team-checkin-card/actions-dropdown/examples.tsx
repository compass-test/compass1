import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';

import { gridSize } from '@atlaskit/theme/constants';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ActionsDropdown } from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};

const Container = styled.div`
  float: right;
  margin-right: ${gridSize() * 4}px;
  padding: ${gridSize() * 2}px;
`;

const onEdit = (_teamCheckinId: string) => {
  action('edit');
};
const onDelete = (_teamCheckinId: string) => {
  action('delete');
};
const teamCheckinId = '0000-1111-2222-3333';

export const ActionsDropdownExample = () => (
  <Container>
    <ActionsDropdown
      onEdit={onEdit}
      onDelete={onDelete}
      teamCheckinId={teamCheckinId}
    />
  </Container>
);
