"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompassComponentExternalAlias = void 0;
exports.CreateCompassComponentExternalAlias = `
    mutation CreateCompassComponentExternalAlias($input: CreateCompassComponentExternalAliasInput!) {
  compass {
    createComponentExternalAlias(input: $input) {
      success
      errors {
        message
        extensions {
          errorType
          statusCode
        }
      }
      createdCompassExternalAlias {
        externalSource
        externalAliasId
      }
    }
  }
}
    `;
//# sourceMappingURL=CreateExternalAliasMutation.js.map