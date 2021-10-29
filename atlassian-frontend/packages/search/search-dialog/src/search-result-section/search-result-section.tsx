import React from 'react';
import Badge from '@atlaskit/badge';
import {
  SearchResultsSectionTitle,
  SearchResultSectionContainer,
  SearchResultSectionHeading,
} from './search-result-section.styled';

export interface Props {
  /**
   * The title of the section
   */
  title: string | JSX.Element;
  /**
   * If provided this will show the total number of results next to the title.
   */
  totalResults?: number;
}

export const SearchResultSection: React.FunctionComponent<Props> = ({
  title,
  totalResults,
  children,
}) => {
  return (
    <SearchResultSectionContainer>
      <SearchResultSectionHeading>
        <SearchResultsSectionTitle>{title}</SearchResultsSectionTitle>
        {totalResults ? (
          <Badge testId="search-result-count-badge">{totalResults}</Badge>
        ) : null}
      </SearchResultSectionHeading>
      {children}
    </SearchResultSectionContainer>
  );
};
