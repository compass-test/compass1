import React from 'react';
import ProductSearchDialog from './cross-product/async-loading-wrapper';
import { Products } from './common/product-context';
import { CrossProductSearchDialogProps } from './cross-product';

/**
 * Confluence
 */
export type { ConfluenceFeatures } from './confluence/confluence-features';
export type {
  ConfluenceClientsProviderProps,
  ConfSpaceResults,
  ConfItemResults,
  ConfPeopleResults,
  ContentType as ConfluenceContentType,
} from './confluence/clients';

export {
  ConfluenceClientsProvider,
  ConfluenceSearchClient,
  Scope,
  ConfluencePage,
  ConfluenceBlogpost,
  ConfluenceAttachment,
  ConfluenceObjectResult,
  RecentConfluence,
} from './confluence/clients';
export { FilterContextProvider as ConfluenceFilterContextProvider } from './confluence/filter-context';
/*****************************************************************/

/**
 * Jira
 */
export type { CurrentUserResponse as JiraCurrentUserResponse } from './jira/clients';
export type { JiraFeatures } from './jira/features';
export type { SearchClientConfig as JiraClientsProviderProps } from './jira/clients';

export { JiraSearchClientProvider, JiraSearchClient } from './jira/clients';
export { FilterContextProvider as JiraFilterContextProvider } from './jira/filter-context';
/*****************************************************************/

/**
 * Common
 */
export type { Site } from './common/clients';

export { ProductSearchInputSkeleton } from './common/product-search-input-skeleton';
export { ProductSearchDialog, Products };
/*****************************************************************/

/**
 * Deprecating old API
 */
import { JiraFeaturesOverrides } from './jira/features';
import { ConfluenceFeaturesOverrides } from './confluence/confluence-features';

type ConfluenceSearchDialogProps = Omit<
  CrossProductSearchDialogProps,
  'jiraFeatures' | 'confluenceFeatures' | 'products'
> & {
  features: ConfluenceFeaturesOverrides;
  forwardRef?: React.Ref<HTMLInputElement>;
};
type JiraSearchDialogProps = Omit<
  CrossProductSearchDialogProps,
  'jiraFeatures' | 'confluenceFeatures' | 'products'
> & {
  features: JiraFeaturesOverrides;
  forwardRef?: React.Ref<HTMLInputElement>;
};

export type { CrossProductSearchDialogProps } from './cross-product';
export type { UserDetails } from './common/user-context';

export const ConfluenceSearchDialog = ({
  features,
  ...props
}: ConfluenceSearchDialogProps) => (
  <ProductSearchDialog
    {...props}
    products={[Products.confluence]}
    confluenceFeatures={features}
  />
);
export const JiraSearchDialog = ({
  features,
  ...props
}: JiraSearchDialogProps) => (
  <ProductSearchDialog
    {...props}
    products={[Products.jira]}
    jiraFeatures={features}
  />
);
export const CrossProductSearchDialog = ProductSearchDialog;

/*****************************************************************/

/**
 * Extensible
 */
export type {
  MetaContextProviderProps,
  ResultRendererChildFnArgs,
  ProductStates,
  DialogFeatures,
} from './extensible';

export {
  JiraTab,
  ConfluenceTab,
  MetaContextProvider,
  UserInputContextProvider,
  KeyboardWrapper,
  ProductTabs,
  SearchDialogProduct,
  MultiProductDialog,
  BitbucketTab,
  AvocadoTab,
  OpsgenieTab,
} from './extensible';
