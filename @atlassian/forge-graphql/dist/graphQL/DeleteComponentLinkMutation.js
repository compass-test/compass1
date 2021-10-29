"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCompassComponentLink = void 0;
exports.DeleteCompassComponentLink = `
    mutation DeleteCompassComponentLink($input: DeleteCompassComponentLinkInput!) {
  compass {
    deleteComponentLink(input: $input) {
      success
      errors {
        message
        extensions {
          errorType
          statusCode
        }
      }
      deletedCompassLinkId
    }
  }
}
    `;
//# sourceMappingURL=DeleteComponentLinkMutation.js.map