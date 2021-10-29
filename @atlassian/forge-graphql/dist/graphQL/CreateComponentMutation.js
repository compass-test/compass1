"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompassComponent = void 0;
exports.CreateCompassComponent = `
    mutation CreateCompassComponent($cloudId: ID!, $input: CreateCompassComponentInput!) {
  compass {
    createComponent(cloudId: $cloudId, input: $input) {
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
//# sourceMappingURL=CreateComponentMutation.js.map