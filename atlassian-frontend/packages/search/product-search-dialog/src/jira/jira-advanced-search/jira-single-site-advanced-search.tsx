import React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { useFiltersAdvancedSearchUrlFactory } from '../jira-advanced-search-url-factory';
import { getTrigger, isNewTab } from '../../common/analytics';
import { AdvancedSearchLinkSubjectId } from '../../common/analytics/events';
import { messages } from '../../messages';
import { JiraFeatures } from '../features';
import { BaseProps } from './base-input-type';
import { JiraAdvancedSearchLink } from './jira-advanced-search-link';
import {
  AdvancedSearchContainer,
  LabelContainer,
} from './jira-advanced-search.styled';
import { useJiraSearchClientContext } from '../clients';

type SearchConfiguration = {
  href: string;
  message: FormattedMessage.MessageDescriptor;
  actionSubjectId: AdvancedSearchLinkSubjectId;
  dataTestId: string;
};

export const getSearchConfiguration: (
  query: string,
  features: JiraFeatures,
  advancedIssueSearchUrl: string,
  siteUrl: string,
) => { [key: string]: SearchConfiguration } = (
  rawQuery,
  features,
  advancedIssueSearchUrl,
  siteUrl,
) => {
  const query = encodeURIComponent(rawQuery);

  const allLinks = {
    issues: {
      href: advancedIssueSearchUrl,
      message: messages.jira_advanced_search_issues,
      actionSubjectId: AdvancedSearchLinkSubjectId.JIRA_ISSUES,
      dataTestId: 'search-dialog-jira-advanced-search-issues',
    },
    board: {
      href: `${siteUrl}/secure/ManageRapidViews.jspa?contains=${query}`,
      message: messages.jira_advanced_search_boards,
      actionSubjectId: AdvancedSearchLinkSubjectId.JIRA_BOARDS,
      dataTestId: 'search-dialog-jira-advanced-search-boards',
    },
    project: {
      href: `${siteUrl}/projects?contains=${query}`,
      message: messages.jira_advanced_search_projects,
      actionSubjectId: AdvancedSearchLinkSubjectId.JIRA_PROJECTS,
      dataTestId: 'search-dialog-jira-advanced-search-projects',
    },
    filters: {
      href: `${siteUrl}/secure/ManageFilters.jspa?Search=Search&filterView=search&name=${query}`,
      message: messages.jira_advanced_search_filters,
      actionSubjectId: AdvancedSearchLinkSubjectId.JIRA_FILTERS,
      dataTestId: 'search-dialog-jira-advanced-search-filters',
    },
    plans: {
      href: `${siteUrl}/secure/PortfolioPlanManage.jspa`,
      message: messages.jira_advanced_search_plans,
      actionSubjectId: AdvancedSearchLinkSubjectId.JIRA_PLANS,
      dataTestId: 'search-dialog-jira-advanced-search-plans',
    },
    people: {
      href: `${siteUrl}/jira/people/search?q=${query}`,
      message: messages.jira_advanced_search_people,
      actionSubjectId: AdvancedSearchLinkSubjectId.JIRA_PEOPLE,
      dataTestId: 'search-dialog-jira-advanced-search-people',
    },
  };

  // Remove access to boards if the user does not have software access
  if (!features.hasSoftwareAccess) {
    delete allLinks.board;
  }

  // Remove access to plans if the user does not have Advanced Roadmaps access
  if (!features.hasAdvancedRoadmapsAccess) {
    delete allLinks.plans;
  }

  return allLinks;
};

export const SingleSiteAdvancedSearch: React.FC<
  BaseProps & InjectedIntlProps
> = ({ onClick, isLoading, advancedSearchSelected, query, features }) => {
  const onClickAndFireEvent = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    actionSubjectId: AdvancedSearchLinkSubjectId,
    href: string,
  ) => {
    advancedSearchSelected({
      actionSubjectId,
      trigger: getTrigger(e),
      isLoading,
      newTab: isNewTab(e),
    });
    onClick(href, e);
  };

  const { siteUrl } = useJiraSearchClientContext();
  const advancedIssueSearchUrl = useFiltersAdvancedSearchUrlFactory()(
    query,
    siteUrl,
  );

  const searchConfiguration = getSearchConfiguration(
    query,
    features,
    advancedIssueSearchUrl,
    siteUrl,
  );

  return (
    <AdvancedSearchContainer>
      <LabelContainer>
        <FormattedMessage {...messages.jira_advanced_search_label} />
      </LabelContainer>
      {Object.keys(searchConfiguration).map((key) => {
        const {
          href,
          message,
          actionSubjectId,
          dataTestId,
        } = searchConfiguration[key];

        return (
          <JiraAdvancedSearchLink
            dataTestId={dataTestId}
            key={key}
            href={href}
            onClick={(
              hrefString: string,
              e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
            ) => onClickAndFireEvent(e, actionSubjectId, hrefString)}
          >
            <FormattedMessage {...message} />
          </JiraAdvancedSearchLink>
        );
      })}
    </AdvancedSearchContainer>
  );
};

export default injectIntl(SingleSiteAdvancedSearch);
