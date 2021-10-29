"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompassComponent = void 0;
exports.UpdateCompassComponent = `
    mutation UpdateCompassComponent($input: UpdateCompassComponentInput!) {
  compass {
    updateComponent(input: $input) {
      success
      errors {
        message
        extensions {
          errorType
          statusCode
        }
      }
      componentDetails {
        id
        name
      }
    }
  }
}
    `;
//# sourceMappingURL=UpdateComponentMutation.js.map