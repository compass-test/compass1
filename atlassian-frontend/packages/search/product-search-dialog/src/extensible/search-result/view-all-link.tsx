import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  LinkComponent,
  SearchResultSectionLink,
} from '@atlassian/search-dialog';
import { messages } from '../../messages';
import { useQuery } from '../query-context';
import { SearchResultSection as SearchResultSectionType } from '../product-router/product/result-types';

export interface ViewAllLinkProps {
  linkComponent?: LinkComponent;
  section: SearchResultSectionType;
}

export const ViewAllLink: React.FC<ViewAllLinkProps> = ({
  linkComponent,
  section,
}) => {
  const { query } = useQuery();
  const { viewAllLinkGenerator } = section;
  if (!viewAllLinkGenerator) {
    return null;
  }
  return (
    <SearchResultSectionLink
      linkComponent={linkComponent}
      href={viewAllLinkGenerator(query)}
      testId="search-result-section-link"
    >
      <FormattedMessage {...messages.common_show_all_results_link} />
    </SearchResultSectionLink>
  );
};
