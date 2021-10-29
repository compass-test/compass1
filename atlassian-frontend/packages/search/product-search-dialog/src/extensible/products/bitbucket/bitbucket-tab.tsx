import React, { useMemo } from 'react';
import { InjectedIntl, InjectedIntlProps, injectIntl } from 'react-intl';
import { useDefaultSuppliers } from '../..';
import { messages } from '../../../messages';
import { AdvancedSearch } from '../../advanced-search/advanced-search';
import { PermissionSupplier, SearchDialogProduct } from '../../product-router';
import {
  CacheWarmingProps,
  CustomizedRendererChildFn,
  ResultProviderProps,
  ResultRendererChildFnArgs,
  ResultSuppliers,
  ScreenSpecificProps,
  SearchDialogProductProps,
} from '../../product-router/product';
import { SearchResult } from '../../product-router/product/result-types';
import { ProductStates } from '../../product-state-machine/product-state-machine-types';
import { useBitbucketPermissionSupplier } from './bitbucket-permission-supplier';
import {
  AggregatorBitbucketResponse,
  BitbucketFeatures,
  BitbucketRepositoryResponse,
  BitbucketScope,
  BitbucketURLGenerators,
  BITBUCKET_PRODUCT_ID,
} from './types';
import { bitbucketURLGenerators } from './url-generators';

const mapAggregatorResponseToSearchItem = (
  repo: BitbucketRepositoryResponse,
): SearchResult => {
  return {
    title: repo.name,
    id: repo.uuid,
    meta: repo.workspace.name,
    url: repo.links.html.href,
    iconUrl: repo.links.avatar.href,
    containerId: repo.workspace.uuid,
  };
};

interface BitbucketFeatureProps {
  features?: BitbucketFeatures;
}

export const BitbucketTabWithIntl: React.FC<
  InjectedIntlProps & {
    permissionSupplier?: PermissionSupplier;
  } & Omit<ResultProviderProps, 'id'> &
    Pick<SearchDialogProductProps, 'order' | 'permissionSupplier'> &
    Partial<ResultSuppliers> &
    CustomizedRendererChildFn &
    CacheWarmingProps &
    Omit<ScreenSpecificProps, 'urlGeneratorForNoResultsScreen'> &
    Partial<BitbucketURLGenerators> &
    BitbucketFeatureProps
> = ({
  intl,
  preQueryItemSupplier: overriddenPreQuerySupplier,
  postQueryItemSupplier: overridenPostQuerySupplier,
  viewAllLinkGenerator: overriddenViewAllLinkGenerator,
  codeSearchUrlGenerator: overriddenCodeSearchUrlGenerator,
  urlGeneratorForNoResultsScreen: overriddenUrlGeneratorForNoResultsScreen,
  permissionSupplier: overridenPermissionsSupplier,
  features,
  ...rest
}) => {
  const repositorySectionTitle = intl.formatMessage(
    messages.bitbucket_repository_heading,
  );

  const {
    viewAllLinkGenerator,
    codeSearchUrlGenerator,
    urlGeneratorForNoResultsScreen,
  }: BitbucketURLGenerators = useMemo(() => {
    return bitbucketURLGenerators({
      viewAllLinkGenerator: overriddenViewAllLinkGenerator,
      codeSearchUrlGenerator: overriddenCodeSearchUrlGenerator,
      urlGeneratorForNoResultsScreen: overriddenUrlGeneratorForNoResultsScreen,
    });
  }, [
    overriddenCodeSearchUrlGenerator,
    overriddenUrlGeneratorForNoResultsScreen,
    overriddenViewAllLinkGenerator,
  ]);

  const sections = [
    {
      id: BitbucketScope.BitbucketRepostitory,
      title: repositorySectionTitle,
      scope: BitbucketScope.BitbucketRepostitory,
      viewAllLinkGenerator,
      resultMapper: ({
        results,
      }: AggregatorBitbucketResponse): SearchResult[] =>
        results.map((value) => mapAggregatorResponseToSearchItem(value)),
    },
  ];

  const { preQueryItemSupplier, postQueryItemSupplier } = useDefaultSuppliers<
    AggregatorBitbucketResponse,
    BitbucketScope
  >(BITBUCKET_PRODUCT_ID, sections);

  const preQuerySectionTitleGenerator = (
    sectionTitle: string,
    intl: InjectedIntl,
  ) => {
    return sectionTitle === repositorySectionTitle
      ? intl.formatMessage(messages.bitbucket_recent_repositories)
      : '';
  };

  const permissionSupplier = useBitbucketPermissionSupplier(
    features?.enableSingleScopesCall || false,
    overridenPermissionsSupplier,
  );

  return (
    <SearchDialogProduct
      {...rest}
      urlGeneratorForNoResultsScreen={urlGeneratorForNoResultsScreen}
      preQueryItemSupplier={overriddenPreQuerySupplier || preQueryItemSupplier}
      postQueryItemSupplier={
        overridenPostQuerySupplier || postQueryItemSupplier
      }
      id={BITBUCKET_PRODUCT_ID}
      title={intl.formatMessage(messages.bitbucket_tab_label)}
      sections={sections}
      generateAdvancedSearchUrl={viewAllLinkGenerator}
      preQuerySectionTitleGenerator={preQuerySectionTitleGenerator}
      expandedStateInputPlaceholder={intl.formatMessage(
        messages.bitbucket_expanded_input_placeholder,
      )}
      permissionSupplier={permissionSupplier}
    >
      {({ productState, linkComponent, query }: ResultRendererChildFnArgs) => {
        if (
          productState === ProductStates.PostQuerySuccess ||
          productState === ProductStates.PreQuerySuccess ||
          productState === ProductStates.PostQueryLoading
        ) {
          const codeSearchUrl = codeSearchUrlGenerator(query);

          return {
            Header: () => (
              <AdvancedSearch
                advancedSearchMessage={intl.formatMessage(
                  messages.bitbucket_advanced_search,
                )}
                advancedSearchUrl={codeSearchUrl}
                linkComponent={linkComponent}
              />
            ),
            Footer: () => <></>,
          };
        }

        return {
          Header: () => <></>,
          Footer: () => <></>,
        };
      }}
    </SearchDialogProduct>
  );
};

/**
 * The canonical implementation of a tab to show Bitbucket search results inside of the search dialog
 *
 * Can be imported across multiple Atlassian products and will show Bitbucket results there
 */
export const BitbucketTab = injectIntl(BitbucketTabWithIntl);
