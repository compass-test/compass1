"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetachEventSource = void 0;
exports.DetachEventSource = `
    mutation DetachEventSource($input: DetachEventSourceInput!) {
  compass {
    detachEventSource(input: $input) {
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
//# sourceMappingURL=DetachEventSourceMutation.js.map