"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlinkExternalSource = void 0;
exports.UnlinkExternalSource = `
    mutation unlinkExternalSource($input: UnlinkExternalSourceInput!) {
  compass {
    unlinkExternalSource(input: $input) {
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
//# sourceMappingURL=UnlinkExternalSourceMutation.js.map