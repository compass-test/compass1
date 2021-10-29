import React from 'react';
import { LinkComponent } from '@atlassian/search-dialog';
import { AsyncProduct } from './async-product';
import CheckProductPermissions, {
  CheckProductPermissionsProps,
} from './check-product-permissions';
import {
  ResultProvider,
  ResultProviderProps,
} from './result-provider/result-provider';
import {
  CacheWarmingProps,
  ResultSuppliers,
} from './result-provider/result-provider-types';
import {
  CustomizedRendererChildFn,
  ScreenSpecificProps,
} from './result-provider/result-renderer';
import { AdvancedSearchFooterProps } from '../../advanced-search-footer';

export interface SearchDialogProductProps extends CheckProductPermissionsProps {
  /**
   * A custom link component. This prop is designed to allow a custom link
   * component to be passed to down when rendering results within in the dialog.
   */
  linkComponent?: LinkComponent;
  /**
   * A component to be rendered whilst the search dialog is still loading. This
   * overrides the default loading spinner.
   */
  fallback?: React.ComponentType;
}

/**
 * A product within the Search Dialog. Each product responds to one tab inside the dialog and its children
 * are conditionally rendered based off whether this product is active
 *
 * The product component does the following
 * Permissions checking, to see if this product can be shown to the user
 * Product registration with the product router
 * Makes a result provider context available to its children
 * Conditionally rendering children if the product is active in the dialog
 * Async loading the component children using React.suspense
 */
export const SearchDialogProduct: React.FC<
  SearchDialogProductProps &
    CacheWarmingProps &
    ResultSuppliers &
    ResultProviderProps &
    ScreenSpecificProps &
    CustomizedRendererChildFn &
    AdvancedSearchFooterProps
> = (props) => (
  <CheckProductPermissions {...props}>
    <AsyncProduct {...props}>
      <ResultProvider {...props}>{props.children}</ResultProvider>
    </AsyncProduct>
  </CheckProductPermissions>
);
