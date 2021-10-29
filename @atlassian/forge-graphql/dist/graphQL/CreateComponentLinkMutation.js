"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompassComponentLink = void 0;
exports.CreateCompassComponentLink = `
    mutation CreateCompassComponentLink($input: CreateCompassComponentLinkInput!) {
  compass {
    createComponentLink(input: $input) {
      success
      errors {
        message
        extensions {
          errorType
          statusCode
        }
      }
      createdComponentLink {
        ... on CompassLink {
          id
          type
          url
          name
        }
      }
    }
  }
}
    `;
//# sourceMappingURL=CreateComponentLinkMutation.js.map