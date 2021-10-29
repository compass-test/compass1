/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SpaceSelectorQuery
// ====================================================

export interface SpaceSelectorQuery_favoriteSpaces_nodes_links {
  __typename: "LinksDownloadEdituiWebuiContextSelfTinyuiCollectionBase";
  base: string | null;
}

export interface SpaceSelectorQuery_favoriteSpaces_nodes_icon {
  __typename: "Icon";
  path: string;
}

export interface SpaceSelectorQuery_favoriteSpaces_nodes {
  __typename: "Space";
  id: string | null;
  key: string | null;
  name: string | null;
  links: SpaceSelectorQuery_favoriteSpaces_nodes_links | null;
  icon: SpaceSelectorQuery_favoriteSpaces_nodes_icon | null;
  containsExternalCollaborators: boolean;
}

export interface SpaceSelectorQuery_favoriteSpaces {
  __typename: "PaginatedSpaceList";
  nodes: (SpaceSelectorQuery_favoriteSpaces_nodes | null)[] | null;
}

export interface SpaceSelectorQuery_searchedSpaces_nodes_space_links {
  __typename: "LinksDownloadEdituiWebuiContextSelfTinyuiCollectionBase";
  base: string | null;
}

export interface SpaceSelectorQuery_searchedSpaces_nodes_space_icon {
  __typename: "Icon";
  path: string;
}

export interface SpaceSelectorQuery_searchedSpaces_nodes_space {
  __typename: "Space";
  id: string | null;
  key: string | null;
  name: string | null;
  links: SpaceSelectorQuery_searchedSpaces_nodes_space_links | null;
  icon: SpaceSelectorQuery_searchedSpaces_nodes_space_icon | null;
  containsExternalCollaborators: boolean;
}

export interface SpaceSelectorQuery_searchedSpaces_nodes {
  __typename: "SearchResult";
  space: SpaceSelectorQuery_searchedSpaces_nodes_space | null;
}

export interface SpaceSelectorQuery_searchedSpaces {
  __typename: "PaginatedSearchResultList";
  count: number | null;
  nodes: (SpaceSelectorQuery_searchedSpaces_nodes | null)[] | null;
}

export interface SpaceSelectorQuery_recentlyVisitedSpaces_links {
  __typename: "LinksDownloadEdituiWebuiContextSelfTinyuiCollectionBase";
  base: string | null;
}

export interface SpaceSelectorQuery_recentlyVisitedSpaces_icon {
  __typename: "Icon";
  path: string;
}

export interface SpaceSelectorQuery_recentlyVisitedSpaces {
  __typename: "Space";
  id: string | null;
  key: string | null;
  name: string | null;
  links: SpaceSelectorQuery_recentlyVisitedSpaces_links | null;
  icon: SpaceSelectorQuery_recentlyVisitedSpaces_icon | null;
  containsExternalCollaborators: boolean;
}

export interface SpaceSelectorQuery {
  favoriteSpaces: SpaceSelectorQuery_favoriteSpaces | null;
  searchedSpaces: SpaceSelectorQuery_searchedSpaces | null;
  recentlyVisitedSpaces: (SpaceSelectorQuery_recentlyVisitedSpaces | null)[] | null;
}

export interface SpaceSelectorQueryVariables {
  cql: string;
  limit?: number | null;
}
