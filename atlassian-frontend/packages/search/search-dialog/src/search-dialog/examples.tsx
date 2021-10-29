import React from 'react';
import {
  SearchDialog,
  SearchDialogContent,
  ResultContainer,
  SidebarContainer,
} from '.';
import faker from 'faker';

export const EmptyDialog = () => (
  <SearchDialog>
    <SearchDialogContent>
      <ResultContainer>{faker.lorem.lines(1)}</ResultContainer>
      <SidebarContainer>{faker.lorem.lines(1)}</SidebarContainer>
    </SearchDialogContent>
  </SearchDialog>
);

export default { title: 'Search Dialog/Search Dialog' };
