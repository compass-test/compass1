"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfluenceVersionedStorage = void 0;
const product_scoped_storage_1 = require("./product-scoped-storage");
const storage_1 = require("@forge/storage");
class ConfluenceVersionedStorage extends product_scoped_storage_1.ProductScopedStorage {
    async versionedSet(key, value) {
        const versionResponse = await this.apiClient(this.storageApiPath(key));
        if (!versionResponse.ok && versionResponse.status !== 404) {
            throw storage_1.APIError.forStatus(versionResponse.status);
        }
        const updatedVersionNumber = await this.getUpdatedVersion(versionResponse);
        const requestMethod = versionResponse.ok ? 'PUT' : 'POST';
        const requestBody = {
            value,
            version: {
                number: updatedVersionNumber
            }
        };
        await this.apiClient(this.storageApiPath(key), this.buildSetRequestOptions(requestBody, requestMethod));
    }
    async getUpdatedVersion(versionResponse) {
        if (!versionResponse.ok) {
            return 1;
        }
        else {
            const data = await versionResponse.json();
            return data.version.number + 1;
        }
    }
}
exports.ConfluenceVersionedStorage = ConfluenceVersionedStorage;
