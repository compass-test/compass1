"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentByExternalAlias = void 0;
exports.ComponentByExternalAlias = `
    query componentByExternalAlias($cloudId: ID!, $externalSource: ID, $externalId: ID!) {
  compass {
    componentByExternalAlias(
      cloudId: $cloudId
      externalSource: $externalSource
      externalID: $externalId
    ) {
      ... on CompassComponent {
        id
        name
        type
        description
        ownerId
        fields {
          ... on CompassEnumField {
            value
            definition {
              ... on CompassFieldDefinition {
                id
                name
                description
                type
                options {
                  __typename
                  ... on CompassEnumFieldDefinitionOptions {
                    values
                    default
                  }
                }
              }
            }
          }
        }
        labels {
          name
        }
        links {
          name
          type
          id
          url
        }
        relationships {
          ... on CompassRelationshipConnection {
            nodes {
              startNode {
                id
              }
              endNode {
                id
              }
              type
            }
          }
        }
        dataManager {
          ... on CompassComponentDataManager {
            externalSourceURL
          }
        }
      }
      ... on QueryError {
        message
        extensions {
          statusCode
          errorType
        }
      }
    }
  }
}
    `;
//# sourceMappingURL=GetComponentByExternalAliasQuery.js.map