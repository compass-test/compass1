"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComponentDataManagerMetadata = void 0;
exports.UpdateComponentDataManagerMetadata = `
    mutation UpdateComponentDataManagerMetadata($input: UpdateCompassComponentDataManagerMetadataInput!) {
  compass {
    updateComponentDataManagerMetadata(input: $input) {
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
          lastSyncEvent {
            time
            status
            lastSyncErrors
          }
        }
      }
    }
  }
}
    `;
//# sourceMappingURL=UpdateComponentDataManagerMetadataMutation.js.map