import React from 'react';

import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

// Per dev discussion, we are disabling the below rule as it is cleaner than moving the controller
// inside this directory or moving this component outside of common
// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { SelectedFiltersProvider } from '../../../controllers/components-use-selected-filters';

import { ListFilter } from './main';

const Container = styled.div`
  width: ${gridSize() * 33}px;
`;

export const ListFilterExample = () => {
  return (
    <SelectedFiltersProvider>
      <CompassTestProvider>
        <Container>
          <ListFilter testId="storybook" />
        </Container>
      </CompassTestProvider>
    </SelectedFiltersProvider>
  );
};
