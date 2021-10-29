import gql from 'graphql-tag';
import { SPACE_FRAGMENT } from './fragments';

export const SPACE_PICKER_QUERY = gql`
  ${SPACE_FRAGMENT}
  query SpaceSelectorQuery($cql: String!, $limit: Int) {
    favoriteSpaces: spaces(offset: 0, first: $limit, favourite: true) {
      nodes {
        ...Space
      }
    }
    searchedSpaces: search(cql: $cql, first: $limit) {
      count
      nodes {
        space {
          ...Space
        }
      }
    }
    recentlyVisitedSpaces: recentSpaces {
      ...Space
    }
  }
`;

export const SELECTED_SPACE_QUERY = gql`
  ${SPACE_FRAGMENT}
  query SelectedSpacesQuery($spaceIds: [Long!]!) {
    selectedSpaces: spaces(spaceIds: $spaceIds) {
      nodes {
        ...Space
      }
    }
  }
`;
