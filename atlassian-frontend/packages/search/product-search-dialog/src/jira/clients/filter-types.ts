import { FilterInterface } from '../../common/clients/common-types';
export interface AppliedProjectFilters extends FilterInterface {
  '@type': 'projects';
  projectIds: string[];
}

export interface AppliedAssigneeFilters extends FilterInterface {
  '@type': 'assignees';
  accountIds: string[];
}

export interface AppliedBinaryStatusCategoryFilter extends FilterInterface {
  '@type': 'binary_status_categories';
  binaryStatusCategories: string[];
}

export type AllAppliedFilters =
  | AppliedProjectFilters
  | AppliedAssigneeFilters
  | AppliedBinaryStatusCategoryFilter;
