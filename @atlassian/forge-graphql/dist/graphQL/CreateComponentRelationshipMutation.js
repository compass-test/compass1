"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompassComponentRelationship = void 0;
exports.CreateCompassComponentRelationship = `
    mutation CreateCompassComponentRelationship($input: CreateCompassRelationshipInput!) {
  compass {
    createRelationship(input: $input) {
      success
      errors {
        message
        extensions {
          errorType
          statusCode
        }
      }
      createdCompassRelationship {
        ... on CompassRelationship {
          type
          startNode {
            id
          }
          endNode {
            id
          }
        }
      }
    }
  }
}
    `;
//# sourceMappingURL=CreateComponentRelationshipMutation.js.map