"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ForgeWrapper {
    constructor(api) {
        this.api = api;
    }
    static wrap(api) {
        return new ForgeWrapper(api);
    }
    async requestGraph(query, variables) {
        var _a, _b;
        const resp = await (this.api.__requestAtlassian("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-ExperimentalApi": "compass-beta, compass-prototype",
            },
            body: JSON.stringify({
                query,
                ...(variables ? { variables } : {}),
            }),
        }));
        const respJson = await resp.json();
        if (process.env.FORGE_GRAPHQL_LOGGING) {
            console.log({
                message: 'AGG request from Forge-graphql SDK',
                responseStatus: resp.status,
                requestId: (_b = (_a = respJson === null || respJson === void 0 ? void 0 : respJson.extensions) === null || _a === void 0 ? void 0 : _a.gateway) === null || _b === void 0 ? void 0 : _b.request_id,
            });
        }
        return resp;
    }
}
exports.default = ForgeWrapper;
//# sourceMappingURL=forge_wrapper.js.map