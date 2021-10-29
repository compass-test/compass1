/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Space
// ====================================================

export interface Space_links {
  __typename: "LinksDownloadEdituiWebuiContextSelfTinyuiCollectionBase";
  base: string | null;
}

export interface Space_icon {
  __typename: "Icon";
  path: string;
}

export interface Space {
  __typename: "Space";
  id: string | null;
  key: string | null;
  name: string | null;
  links: Space_links | null;
  icon: Space_icon | null;
  containsExternalCollaborators: boolean;
}
