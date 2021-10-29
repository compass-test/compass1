"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachComponentDataManager = void 0;
exports.AttachComponentDataManager = `
    mutation AttachComponentDataManager($input: AttachCompassComponentDataManagerInput!) {
  compass {
    attachComponentDataManager(input: $input) {
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
        dataManager {
          ecosystemAppId
          externalSourceURL
        }
      }
    }
  }
}
    `;
//# sourceMappingURL=AttachComponentDataManagerMutation.js.map