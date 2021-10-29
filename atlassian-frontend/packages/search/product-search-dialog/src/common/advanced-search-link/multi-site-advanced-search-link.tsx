import { LinkComponent, SearchFooterLinks } from '@atlassian/search-dialog';
import React, { FunctionComponent, useCallback } from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  getTrigger,
  isNewTab,
  onMultiSiteAdvancedSearchSelected,
  useAnalytics,
} from '../analytics';
import { Site } from '../clients';
import { Products } from '../product-context';
import { messages } from '../../messages';

const MAX_PRIMARY_SITES = 5;

type SiteWithAdvancedSearchURL = Site & {
  advancedSearchUrl: string;
};

export interface Props {
  sites: SiteWithAdvancedSearchURL[];
  linkComponent?: LinkComponent;
  onClick?: (href: string, e: React.MouseEvent) => any;
  isLoading: boolean;
}

const getActionSubjectIdForProduct = (product: Products) => {
  return `${product.toLowerCase()}AdvancedSearchLink`;
};

export const MultiSiteAdvancedSearchLink: FunctionComponent<
  Props & InjectedIntlProps
> = ({ sites, linkComponent, onClick, isLoading, intl }) => {
  const { fireAnalyticsEvent } = useAnalytics();

  const links = sites.map((site) => ({
    content: site.siteName,
    key: site.cloudId,
    href: site.advancedSearchUrl,
  }));

  const label = intl.formatMessage(messages.multi_site_advanced_search_label);

  const dropdownLabel = intl.formatMessage(
    messages.multi_site_advanced_search_more_dropdown,
    {
      count: links.length - MAX_PRIMARY_SITES,
    },
  );

  const onAdvancedSearchClicked = useCallback(
    ({ key }: { key: string }, e: React.MouseEvent<HTMLElement>) => {
      const site = sites.filter((s) => s.cloudId === key)[0];

      if (!site) {
        return;
      }

      fireAnalyticsEvent(
        onMultiSiteAdvancedSearchSelected({
          trigger: getTrigger(e),
          actionSubjectId: getActionSubjectIdForProduct(site.product),
          isLoading,
          newTab: isNewTab(e),
          destinationId: key,
          index: sites.map((s) => s.cloudId).indexOf(key),
        }),
      );
    },
    [fireAnalyticsEvent, isLoading, sites],
  );

  return (
    <SearchFooterLinks
      linkComponent={linkComponent}
      onClick={(link, e) => {
        onAdvancedSearchClicked(link, e);
        onClick && onClick(link.href, e);
      }}
      label={label}
      dropdownTriggerLabel={dropdownLabel}
      links={links}
      maxPrimaryLinks={MAX_PRIMARY_SITES}
    />
  );
};

export default injectIntl(MultiSiteAdvancedSearchLink);
