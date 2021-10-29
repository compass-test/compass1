import React from 'react';
import { SearchDialogWrapper } from './search-dialog.styled';

export const SearchDialog: React.FunctionComponent = ({ children }) => (
  <SearchDialogWrapper
    data-test-id="search-dialog-dialog-wrapper"
    tabIndex={-1}
  >
    {children}
  </SearchDialogWrapper>
);
