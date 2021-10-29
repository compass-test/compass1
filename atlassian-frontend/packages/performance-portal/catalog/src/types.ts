import { ProductType } from '@atlassian/performance-portal-common';

export type SelectedProducts = Partial<Record<ProductType, boolean>>;
