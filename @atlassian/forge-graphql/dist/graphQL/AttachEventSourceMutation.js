"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachEventSource = void 0;
exports.AttachEventSource = `
    mutation AttachEventSource($input: AttachEventSourceInput!) {
  compass {
    attachEventSource(input: $input) {
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
//# sourceMappingURL=AttachEventSourceMutation.js.map