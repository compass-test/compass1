"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorageInstanceWithQuery = void 0;
const query_api_1 = require("./query-api");
exports.getStorageInstanceWithQuery = (adapter) => {
    return {
        get: adapter.get.bind(adapter),
        set: adapter.set.bind(adapter),
        delete: adapter.delete.bind(adapter),
        getSecret: adapter.getSecret.bind(adapter),
        setSecret: adapter.setSecret.bind(adapter),
        deleteSecret: adapter.deleteSecret.bind(adapter),
        query: () => new query_api_1.DefaultQueryBuilder(adapter)
    };
};
var global_storage_1 = require("./global-storage");
Object.defineProperty(exports, "GlobalStorage", { enumerable: true, get: function () { return global_storage_1.GlobalStorage; } });
var conditions_1 = require("./conditions");
Object.defineProperty(exports, "startsWith", { enumerable: true, get: function () { return conditions_1.startsWith; } });
var errors_1 = require("./errors");
Object.defineProperty(exports, "APIError", { enumerable: true, get: function () { return errors_1.APIError; } });
