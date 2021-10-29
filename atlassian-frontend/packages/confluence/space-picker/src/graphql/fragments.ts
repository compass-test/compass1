import gql from 'graphql-tag';

export const SPACE_FRAGMENT = gql`
  fragment Space on Space {
    id
    key
    name
    links {
      base
    }
    icon {
      path
    }
    containsExternalCollaborators
  }
`;
