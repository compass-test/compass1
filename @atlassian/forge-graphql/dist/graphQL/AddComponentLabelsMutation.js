"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddComponentLabels = void 0;
exports.AddComponentLabels = `
    mutation addComponentLabels($input: AddCompassComponentLabelsInput!) {
  compass {
    addComponentLabels(input: $input) {
      success
      addedLabels {
        name
      }
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
//# sourceMappingURL=AddComponentLabelsMutation.js.map