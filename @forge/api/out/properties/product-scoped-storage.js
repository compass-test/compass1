"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductScopedStorage = void 0;
const storage_1 = require("@forge/storage");
class ProductScopedStorage {
    constructor(storageApiPath, apiClient) {
        this.storageApiPath = storageApiPath;
        this.apiClient = apiClient;
    }
    async get(key) {
        const response = await this.apiClient(this.storageApiPath(key));
        if (!response.ok) {
            if (/400|401|403|404/.test(response.status.toString())) {
                return undefined;
            }
            throw storage_1.APIError.forStatus(response.status);
        }
        const { value } = await response.json();
        return value;
    }
    async set(key, value) {
        const response = await this.apiClient(this.storageApiPath(key), this.buildSetRequestOptions(value, 'PUT'));
        if (!response.ok) {
            throw storage_1.APIError.forStatus(response.status);
        }
    }
    async delete(key) {
        const response = await this.apiClient(this.storageApiPath(key), { method: 'DELETE' });
        if (!response.ok) {
            throw storage_1.APIError.forStatus(response.status);
        }
    }
    buildSetRequestOptions(requestBody, requestMethod) {
        return {
            method: requestMethod,
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }
        };
    }
}
exports.ProductScopedStorage = ProductScopedStorage;
