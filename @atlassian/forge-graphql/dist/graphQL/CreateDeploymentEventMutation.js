"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeploymentEvent = void 0;
exports.CreateDeploymentEvent = `
    mutation createDeploymentEvent($input: CreateDeploymentEventInput!) {
  compass {
    createDeploymentEvent(input: $input) {
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
//# sourceMappingURL=CreateDeploymentEventMutation.js.map