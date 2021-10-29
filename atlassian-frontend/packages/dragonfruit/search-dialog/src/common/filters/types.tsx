import { Products } from '../product-context';

export enum FilterOptionSource {
  /**
   * This means the result came from collab graph
   */
  COLLABORATION_GRAPH = 'COLLABORATION_GRAPH',
  /**
   * This means the result came from smart user picker
   */
  SMART_USER_PICKER = 'SMART_USER_PICKER',
  /**
   * This means the result came from a recents (bootstrap) query
   */
  RECENT = 'RECENT',
  /**
   * This means the result came from an explicit search
   */
  SEARCH = 'SEARCH',
  /**
   * This means the result is derived from the current user
   */
  CURRENT_USER = 'CURRENT_USER',
  /**
   * This means the result came from an external source passed into the component
   */
  EXTERNAL = 'EXTERNAL',
  /**
   * This means the result is static without any user-generation
   */
  STATIC = 'STATIC',
}

export interface FilterOption {
  id: string;
  isChecked: boolean;
  isVisible: boolean;
  filterSource: FilterOptionSource;
}

export interface SiteFilterOption extends FilterOption {
  product: Products;
  avatarUrl: string;
  cloudId: string;
  siteName: string;
  siteUrl: string;
}
