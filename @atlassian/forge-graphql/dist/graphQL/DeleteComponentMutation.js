"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteComponent = void 0;
exports.DeleteComponent = `
    mutation deleteComponent($input: DeleteCompassComponentInput!) {
  compass {
    deleteComponent(input: $input) {
      success
      errors {
        message
        extensions {
          errorType
          statusCode
        }
      }
      deletedComponentId
    }
  }
}
    `;
//# sourceMappingURL=DeleteComponentMutation.js.map