"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetComponent = void 0;
exports.GetComponent = `
    query getComponent($componentId: ID!) {
  compass {
    component(id: $componentId) {
      __typename
      ... on CompassComponent {
        id
        name
        description
        type
        links {
          ... on CompassLink {
            id
            name
            type
            url
          }
        }
        labels {
          ... on CompassComponentLabel {
            name
          }
        }
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
        relationships {
          __typename
          ... on CompassRelationshipConnection {
            nodes {
              type
              startNode {
                id
              }
              endNode {
                id
              }
            }
          }
          ... on QueryError {
            identifier
            message
            extensions {
              statusCode
              errorType
            }
          }
        }
        externalAliases {
          externalSource
          externalAliasId
        }
        dataManager {
          externalSourceURL
        }
      }
      ... on QueryError {
        identifier
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
//# sourceMappingURL=GetComponentQuery.js.map