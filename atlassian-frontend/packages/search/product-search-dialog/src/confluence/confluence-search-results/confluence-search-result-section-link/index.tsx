import {
  SearchResultSectionLink,
  SearchResultSectionLinkProps,
} from '@atlassian/search-dialog';
import React from 'react';
import { useFeatures } from '../../confluence-features';

export default function ConfluenceSearchResultSectionLink(
  props: SearchResultSectionLinkProps,
) {
  const { isMultiSite } = useFeatures();
  if (isMultiSite) {
    return null;
  } else {
    return <SearchResultSectionLink {...props} />;
  }
}
