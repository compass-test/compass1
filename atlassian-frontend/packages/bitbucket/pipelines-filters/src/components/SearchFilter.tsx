import React from 'react';

import Button from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import SearchIcon from '@atlaskit/icon/glyph/search';
import Textfield from '@atlaskit/textfield';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

import { Search } from '../types';

import * as styles from './styled';

export type Props = {
  handleFilterChange: (search: Search) => void;
  search: Search;
};

export const SearchFilter = ({ handleFilterChange, search }: Props) => {
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    handleFilterChange(search);
  };

  const onClearSearch = () => {
    const search = '';
    handleFilterChange(search);
  };

  return (
    <styles.SearchFieldWrapper role="search">
      <Textfield
        autoComplete="off"
        name={'search-pipeline-build-input'}
        value={search || ''}
        onChange={onSearchChange}
        placeholder="Search"
        elemAfterInput={
          search ? (
            <styles.ButtonWrapper>
              <Button
                aria-label="Clear filter"
                appearance="subtle"
                spacing="none"
                onClick={onClearSearch}
                iconAfter={<CrossIcon label="" size="small" />}
              />
            </styles.ButtonWrapper>
          ) : (
            <styles.SearchIconWrapper>
              <SearchIcon label="" size="small" primaryColor={colors.N500} />
            </styles.SearchIconWrapper>
          )
        }
      />
    </styles.SearchFieldWrapper>
  );
};
