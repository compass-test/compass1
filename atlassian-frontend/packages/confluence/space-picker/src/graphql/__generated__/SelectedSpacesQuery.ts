/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SelectedSpacesQuery
// ====================================================

export interface SelectedSpacesQuery_selectedSpaces_nodes_links {
  __typename: "LinksDownloadEdituiWebuiContextSelfTinyuiCollectionBase";
  base: string | null;
}

export interface SelectedSpacesQuery_selectedSpaces_nodes_icon {
  __typename: "Icon";
  path: string;
}

export interface SelectedSpacesQuery_selectedSpaces_nodes {
  __typename: "Space";
  id: string | null;
  key: string | null;
  name: string | null;
  links: SelectedSpacesQuery_selectedSpaces_nodes_links | null;
  icon: SelectedSpacesQuery_selectedSpaces_nodes_icon | null;
  containsExternalCollaborators: boolean;
}

export interface SelectedSpacesQuery_selectedSpaces {
  __typename: "PaginatedSpaceList";
  nodes: (SelectedSpacesQuery_selectedSpaces_nodes | null)[] | null;
}

export interface SelectedSpacesQuery {
  selectedSpaces: SelectedSpacesQuery_selectedSpaces | null;
}

export interface SelectedSpacesQueryVariables {
  spaceIds: any[];
}
