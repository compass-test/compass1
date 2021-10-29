"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventSource = void 0;
exports.CreateEventSource = `
    mutation CreateEventSource($input: CreateEventSourceInput!) {
  compass {
    createEventSource(input: $input) {
      eventSource {
        id
      }
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
//# sourceMappingURL=CreateEventSourceMutation.js.map