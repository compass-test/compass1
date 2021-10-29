"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetachComponentDataManager = void 0;
exports.DetachComponentDataManager = `
    mutation DetachComponentDataManager($input: DetachCompassComponentDataManagerInput!) {
  compass {
    detachComponentDataManager(input: $input) {
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
//# sourceMappingURL=DetachComponentDataManagerMutation.js.map