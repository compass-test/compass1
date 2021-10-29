/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LabelPickerQuery
// ====================================================

export interface LabelPickerQuery_labelSearch_suggestedLabels {
  __typename: 'Label';
  id: string | null;
  name: string | null;
  prefix: string | null;
}

export interface LabelPickerQuery_labelSearch_otherLabels {
  __typename: 'Label';
  id: string | null;
  name: string | null;
  prefix: string | null;
}

export interface LabelPickerQuery_labelSearch {
  __typename: 'LabelSearchResults';
  suggestedLabels: (LabelPickerQuery_labelSearch_suggestedLabels | null)[];
  otherLabels: (LabelPickerQuery_labelSearch_otherLabels | null)[];
}

export interface LabelPickerQuery {
  labelSearch: LabelPickerQuery_labelSearch | null;
}

export interface LabelPickerQueryVariables {
  searchText: string;
  spaceKey?: string | null;
}
