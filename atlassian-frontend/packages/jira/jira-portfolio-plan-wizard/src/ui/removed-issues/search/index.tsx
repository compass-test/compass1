import React, { useRef } from 'react';

import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import SearchIcon from '@atlaskit/icon/glyph/search';
import Textfield from '@atlaskit/textfield';
import * as colors from '@atlaskit/theme/colors';

import { useIntl as useIntlDI } from '../../../common/utils/intl';

import msgs from './messages';
import {
  IconButton,
  IconWrapper,
  SearchSummaryContainer,
  StepIcon,
  SummaryCount,
} from './styled';
import { Direction, SearchProps, SearchSummaryProps } from './types';

export { Direction } from './types';

const SearchSummary = ({
  searchQuery,
  totalResults,
  onClear,
  activeSearchResultIndex,
  navigateResults,
  minQueryLength = 0,
}: SearchSummaryProps) => {
  const hasSearchQuery =
    searchQuery.trim() !== '' && searchQuery.trim().length >= minQueryLength;

  return (
    <SearchSummaryContainer active={hasSearchQuery}>
      <SummaryCount hasSearchQuery={hasSearchQuery}>
        {totalResults > 0
          ? `${activeSearchResultIndex + 1}/${totalResults}`
          : 0}
      </SummaryCount>
      <StepIcon hasSearchQuery={hasSearchQuery}>
        <IconButton onClick={() => navigateResults(Direction.UP)}>
          <ChevronUpIcon label="" primaryColor={colors.N90} />
        </IconButton>
      </StepIcon>
      <StepIcon hasSearchQuery={hasSearchQuery}>
        <IconButton onClick={() => navigateResults(Direction.DOWN)}>
          <ChevronDownIcon label="" primaryColor={colors.N90} />
        </IconButton>
      </StepIcon>
      <IconWrapper>
        <IconButton onClick={onClear}>
          <CrossCircleIcon label="" size="small" primaryColor={colors.N70} />
        </IconButton>
      </IconWrapper>
      <IconWrapper>
        <SearchIcon label="" size="small" primaryColor={colors.N90} />
      </IconWrapper>
    </SearchSummaryContainer>
  );
};

const Search = ({
  onChange,
  useIntl = useIntlDI,
  activeSearchResultIndex,
  searchQuery,
  totalResults,
  navigateResults,
  onClear,
  minQueryLength = 0,
  isDisabled,
}: SearchProps) => {
  const { formatMessage } = useIntl();
  const textfield = useRef<HTMLInputElement>(null);

  return (
    <Textfield
      ref={textfield}
      placeholder={formatMessage(msgs.searchIssues) + '...'}
      isCompact={true}
      isDisabled={isDisabled}
      elemAfterInput={
        <SearchSummary
          searchQuery={searchQuery}
          totalResults={totalResults}
          activeSearchResultIndex={activeSearchResultIndex}
          navigateResults={navigateResults}
          onClear={() => {
            if (textfield.current) {
              textfield.current.value = '';
            }
            onClear && onClear();
          }}
          minQueryLength={minQueryLength}
        />
      }
      style={{ maxWidth: '120px' }}
      onChange={onChange}
    />
  );
};

export default Search;
