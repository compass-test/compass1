"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapFetchApiMethods = void 0;
var polyfill_response_1 = require("./polyfill-response");
Object.defineProperty(exports, "transformResponse", { enumerable: true, get: function () { return polyfill_response_1.transformResponse; } });
const safeUrl_1 = require("../safeUrl");
const wrapRequestGraph = (requestGraphApi) => (query, variables, headers = {}) => requestGraphApi('/graphql', {
    method: 'POST',
    headers: Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/json' }),
    body: JSON.stringify(Object.assign({ query }, (variables ? { variables } : {})))
});
const wrapRequestProduct = (requestProduct) => (path, init) => {
    const safeUrl = safeUrl_1.requireSafeUrl(path);
    return requestProduct(safeUrl.value, init);
};
const wrapWithRouteUnwrapper = (fetch) => (path, init) => {
    const stringPath = safeUrl_1.isRoute(path) ? path.value : path;
    return fetch(stringPath, init);
};
exports.wrapFetchApiMethods = (api, wrapFetch) => {
    return {
        fetch: wrapWithRouteUnwrapper(wrapFetch(api.fetch)),
        requestJira: wrapRequestProduct(wrapFetch(api.requestJira)),
        requestConfluence: wrapRequestProduct(wrapFetch(api.requestConfluence)),
        asUser: () => ({
            requestJira: wrapRequestProduct(wrapFetch(api.asUser().requestJira)),
            requestConfluence: wrapRequestProduct(wrapFetch(api.asUser().requestConfluence)),
            requestGraph: wrapRequestGraph(wrapFetch(api.asUser().requestGraph))
        }),
        asApp: () => ({
            requestJira: wrapRequestProduct(wrapFetch(api.asApp().requestJira)),
            requestConfluence: wrapRequestProduct(wrapFetch(api.asApp().requestConfluence)),
            requestGraph: wrapRequestGraph(wrapFetch(api.asApp().requestGraph))
        })
    };
};
