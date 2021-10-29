export { ProductRouter, useProductContext } from './product-router';

export type { PermissionSupplier } from './product/check-product-permissions';

export type {
  ResultSuppliers,
  PostQuerySupplierArgs,
  ResultRendererChildFnArgs,
} from './product';

export type {
  Product,
  AdvancedSearchUrlGenerator as OnInputNavigate,
} from './product-router-state';

export { SearchDialogProduct } from './product';

export { ProductTabs } from './tab-controls/tab-controls';
