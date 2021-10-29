import React, { useCallback, useMemo } from 'react';
import { InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl';
import { useDefaultSuppliers } from '../..';

import { messages } from '../../../messages';
import { PermissionSupplier, SearchDialogProduct } from '../../product-router';
import {
  CacheWarmingProps,
  ResultSuppliers,
  ResultProviderProps,
  SearchDialogProductProps,
} from '../../product-router/product';
import {
  CustomizedRendererChildFn,
  ScreenSpecificProps,
} from '../../product-router/product';
import { SearchResult } from '../../product-router/product/result-types';
import {
  AggregatorOpsgenieResponse,
  OpsgenieAlertResponse,
  OpsgenieScope,
  OpsgenieURLGenerators,
} from './types';
import {
  OpsgenieUrlGeneratorProps,
  useOpsgenieURLGenerators,
} from './url-generators';

const OPSGENIE_PRODUCT_ID = 'opsgenie';

// visible for testing
export const mapAggregatorResponseToSearchItem = (
  alert: OpsgenieAlertResponse,
): SearchResult => {
  return {
    title: alert.message,
    id: alert.id,
    meta: alert.status.charAt(0).toUpperCase() + alert.status.slice(1),
    url: alert.link,
    iconUrl: alert.iconURI,
    containerId: '', // no conatiner
  };
};

export type OpsgenieTabProps = InjectedIntlProps &
  Omit<ResultProviderProps, 'id'> &
  Pick<SearchDialogProductProps, 'order' | 'permissionSupplier'> &
  Partial<Pick<SearchDialogProductProps, 'generateAdvancedSearchUrl'>> &
  Partial<ResultSuppliers> &
  CustomizedRendererChildFn &
  CacheWarmingProps &
  Omit<ScreenSpecificProps, 'urlGeneratorForNoResultsScreen'> &
  OpsgenieUrlGeneratorProps & {
    permissionSupplier?: PermissionSupplier;
  };

export const OpsgenieTabWithIntl: React.FC<OpsgenieTabProps> = ({
  intl,
  preQueryItemSupplier: overriddenPreQuerySupplier,
  postQueryItemSupplier: overridenPostQuerySupplier,
  generateAdvancedSearchUrl: overriddenGenerateAdvancedSearchUrl,
  cloudId,
  hostUrl,
  ...rest
}) => {
  const repositorySectionTitle = intl.formatMessage(
    messages.opsgenie_alerts_heading,
  );

  const urlGeneratorArguments = useMemo(() => ({ cloudId, hostUrl }), [
    cloudId,
    hostUrl,
  ]);

  const {
    viewAllLinkGenerator,
    urlGeneratorForNoResultsScreen,
  }: OpsgenieURLGenerators = useOpsgenieURLGenerators(urlGeneratorArguments);

  const sections = [
    {
      id: OpsgenieScope.OpsgenieAlert,
      title: repositorySectionTitle,
      scope: OpsgenieScope.OpsgenieAlert,
      viewAllLinkGenerator,
      resultMapper: ({ results }: AggregatorOpsgenieResponse): SearchResult[] =>
        results.map((value) => mapAggregatorResponseToSearchItem(value)),
    },
  ];

  const { preQueryItemSupplier, postQueryItemSupplier } = useDefaultSuppliers<
    AggregatorOpsgenieResponse,
    OpsgenieScope
  >(OPSGENIE_PRODUCT_ID, sections);

  const preQuerySectionTitleGenerator = useCallback(
    (sectionTitle: string, intl: InjectedIntl) => {
      return sectionTitle === repositorySectionTitle
        ? intl.formatMessage(messages.opsgenie_recent_alerts)
        : '';
    },
    [repositorySectionTitle],
  );

  return (
    <SearchDialogProduct
      {...rest}
      urlGeneratorForNoResultsScreen={urlGeneratorForNoResultsScreen}
      preQueryItemSupplier={overriddenPreQuerySupplier || preQueryItemSupplier}
      postQueryItemSupplier={
        overridenPostQuerySupplier || postQueryItemSupplier
      }
      expandedStateInputPlaceholder={intl.formatMessage(
        messages.opsgenie_expanded_input_placeholder,
      )}
      id={OPSGENIE_PRODUCT_ID}
      title={intl.formatMessage(messages.opsgenie_tab_label)}
      searchFooterLabel={intl.formatMessage(messages.opsgenie_advanced_search)}
      sections={sections}
      preQuerySectionTitleGenerator={preQuerySectionTitleGenerator}
      generateAdvancedSearchUrl={
        overriddenGenerateAdvancedSearchUrl || viewAllLinkGenerator
      }
    />
  );
};

/**
 * The canonical implementation of a tab to show Opsgenie search results inside of the search dialog
 *
 * Can be imported across multiple Atlassian products and will show Opsgenie results there
 */
export const OpsgenieTab = injectIntl(OpsgenieTabWithIntl);
