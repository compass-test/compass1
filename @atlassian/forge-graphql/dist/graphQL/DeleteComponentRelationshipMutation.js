"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCompassComponentRelationship = void 0;
exports.DeleteCompassComponentRelationship = `
    mutation DeleteCompassComponentRelationship($input: DeleteCompassRelationshipInput!) {
  compass {
    deleteRelationship(input: $input) {
      success
      errors {
        message
        extensions {
          errorType
          statusCode
        }
      }
    }
  }
}
    `;
//# sourceMappingURL=DeleteComponentRelationshipMutation.js.map