import React from 'react';
import ProductSearchDialog from './cross-product/async-loading-wrapper';
import { Products } from './common/product-context';
import { CrossProductSearchDialogProps } from './cross-product';

// Confluence
import { ConfluenceFeaturesOverrides } from './confluence/confluence-features';

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

export type {
  ConfluenceClientsProviderProps,
  ConfSpaceResults,
  ConfItemResults,
  ConfPeopleResults,
  ContentType as ConfluenceContentType,
} from './confluence/clients';

// Common
export type { Site } from './common/clients';

export { ProductSearchInputSkeleton } from './common/product-search-input-skeleton';

export { ProductSearchDialog, Products };

// Deprecating old API
export const CrossProductSearchDialog = ProductSearchDialog;

export type { CrossProductSearchDialogProps } from './cross-product';

type ConfluenceSearchDialogProps = Omit<
  CrossProductSearchDialogProps,
  'confluenceFeatures' | 'products'
> & {
  features: ConfluenceFeaturesOverrides;
  forwardRef?: React.Ref<HTMLInputElement>;
};

export const ConfluenceSearchDialog = ({
  features,
  ...props
}: ConfluenceSearchDialogProps) => (
  <ProductSearchDialog {...props} products={[Products.compass]} />
);

export type { UserDetails } from './common/user-context';
