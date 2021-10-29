"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateMutationGql_1 = __importDefault(require("../generateMutationGql"));
const AttachComponentDataManagerMutation_1 = require("../../graphQL/AttachComponentDataManagerMutation");
const DetachComponentDataManagerMutation_1 = require("../../graphQL/DetachComponentDataManagerMutation");
const isEmpty_1 = __importDefault(require("../isEmpty"));
const shouldAddDataManager = (oldDataManager, newDataManager) => (newDataManager && !(0, isEmpty_1.default)(newDataManager) && !oldDataManager);
const shouldDetachDataManager = (oldDataManager, newDataManager) => ((0, isEmpty_1.default)(newDataManager) && oldDataManager);
function updateDataManagerSegment(componentId, oldDataManager, newDataManager) {
    let mutation = '';
    let parameters = [];
    let inputId;
    let variables = {};
    if (shouldAddDataManager(oldDataManager, newDataManager)) {
        ({
            mutationGql: mutation,
            params: parameters,
            inputId,
        } = (0, generateMutationGql_1.default)(AttachComponentDataManagerMutation_1.AttachComponentDataManager, 'attachComponentDataManager'));
        variables[inputId] = {
            componentId,
            externalSourceURL: newDataManager.externalSourceURL,
        };
    }
    else if (shouldDetachDataManager(oldDataManager, newDataManager)) {
        ({
            mutationGql: mutation,
            params: parameters,
            inputId,
        } = (0, generateMutationGql_1.default)(DetachComponentDataManagerMutation_1.DetachComponentDataManager, 'detachComponentDataManager'));
        variables[inputId] = {
            componentId,
        };
    }
    return {
        mutation,
        variables,
        parameters,
    };
}
exports.default = updateDataManagerSegment;
//# sourceMappingURL=updateDataManagerSegment.js.map