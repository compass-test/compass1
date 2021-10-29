"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCompassComponentExternalAlias = void 0;
exports.DeleteCompassComponentExternalAlias = `
    mutation DeleteCompassComponentExternalAlias($input: DeleteCompassComponentExternalAliasInput!) {
  compass {
    deleteComponentExternalAlias(input: $input) {
      success
      errors {
        message
        extensions {
          errorType
          statusCode
        }
      }
      deletedCompassExternalAlias {
        externalSource
        externalAliasId
      }
    }
  }
}
    `;
//# sourceMappingURL=DeleteExternalAliasMutation.js.map