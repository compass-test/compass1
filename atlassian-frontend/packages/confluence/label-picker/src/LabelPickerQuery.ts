import gql from 'graphql-tag';

export const LabelPickerQuery = gql`
  query LabelPickerQuery($searchText: String!, $spaceKey: String) {
    labelSearch(searchText: $searchText, spaceKey: $spaceKey) {
      suggestedLabels {
        ...LabelFragment
      }
      otherLabels {
        ...LabelFragment
      }
    }
  }

  fragment LabelFragment on Label {
    id
    name
    prefix
  }
`;
