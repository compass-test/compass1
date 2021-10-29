import React from 'react';
import { Products } from '../../common/product-context';
import { MultiSiteAdvancedSearchLink } from '../../common/advanced-search-link';
import { getTrigger, isNewTab, withAnalytics } from '../../common/analytics';
import {
  AdvancedSearchLinkSubjectId,
  onAdvancedSearchSelected,
} from '../../common/analytics/events';
import { useJiraSearchClientContext } from '../clients';
import { useFeatures, withJiraFeatures } from '../features';
import { useQueryOnlyAdvancedSearchUrlFactory } from '../jira-advanced-search-url-factory';
import { BaseProps } from './base-input-type';
import SingleSiteAdvancedSearch from './jira-single-site-advanced-search';

export const JiraAdvancedSearchBase = (props: BaseProps) => {
  const { query, isLoading, onClick, advancedSearchSelected } = props;

  const multiSiteEnabled = useFeatures().isMultiSite || false;

  const urlFactory = useQueryOnlyAdvancedSearchUrlFactory();

  const jiraSites = useJiraSearchClientContext().sites.filter(
    (s) => s.product === Products.jira,
  );

  if (jiraSites.length > 1 && multiSiteEnabled) {
    const jiraSitesWithAdvancedSearchLinks = jiraSites.map((s) => ({
      ...s,
      advancedSearchUrl: urlFactory(query, s.siteUrl),
    }));

    return (
      <MultiSiteAdvancedSearchLink
        sites={jiraSitesWithAdvancedSearchLinks}
        {...props}
        onClick={(href, e) => {
          advancedSearchSelected({
            actionSubjectId: AdvancedSearchLinkSubjectId.JIRA_ISSUES,
            trigger: getTrigger(e),
            isLoading,
            newTab: isNewTab(e),
          });

          onClick(href, e);
        }}
      />
    );
  }

  return <SingleSiteAdvancedSearch {...props} />;
};

export const JiraAdvancedSearch = withAnalytics({
  advancedSearchSelected: onAdvancedSearchSelected,
})(withJiraFeatures(JiraAdvancedSearchBase));

export default JiraAdvancedSearch;
