/**
 * All filters must implement this interface.
 */
export interface FilterInterface {
  '@type': string;
}

export interface SpaceFiltersInterface {
  '@type': 'spaces';
  spaceKeys: string[];
}

export interface UserFiltersInterface {
  '@type': 'contributors';
  accountIds: string[];
}

export type AllFilters = SpaceFiltersInterface | UserFiltersInterface;
