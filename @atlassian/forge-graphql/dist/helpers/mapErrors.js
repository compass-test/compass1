"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCompoundMutationErrors = exports.parsingResponseError = exports.mapMutationErrors = exports.mapQueryErrors = exports.mapGqlErrors = void 0;
const _1 = require(".");
const mapGqlErrors = (errors = []) => errors.map((error) => {
    var _a, _b;
    return ({
        errorSource: ((_a = error.extensions) === null || _a === void 0 ? void 0 : _a.errorSource) || _1.FORGE_GRAPHQL_SDK_ERROR_SOURCE,
        errorType: ((_b = error.extensions) === null || _b === void 0 ? void 0 : _b.classification) || _1.INTERNAL_SERVER_ERROR_TYPE,
        message: error.message
    });
});
exports.mapGqlErrors = mapGqlErrors;
const traverseQueryResult = (obj, path, defaultValue = null) => {
    const travel = (regexp) => String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    return result === undefined || result === obj ? defaultValue : result;
};
function mapQueryErrors(result, queryErrorPaths) {
    return queryErrorPaths.reduce((acc, errorPath) => {
        try {
            const { __typename: typename, message, extensions: { errorType, statusCode } } = traverseQueryResult(result, errorPath);
            if (typename === _1.QUERY_ERROR) {
                acc.push({
                    message,
                    statusCode,
                    errorType,
                    errorSource: _1.GRAPHQL_GATEWAY_SOURCE,
                });
            }
        }
        catch (e) {
            if (!(e instanceof TypeError)) {
                throw e;
            }
        }
        return acc;
    }, []);
}
exports.mapQueryErrors = mapQueryErrors;
function mapMutationErrors(mutationErrors) {
    if (!mutationErrors) {
        return [];
    }
    return mutationErrors.map((mutationError) => {
        try {
            const { message, extensions: { errorType, statusCode } } = mutationError;
            return {
                message,
                errorType,
                statusCode,
                errorSource: _1.GRAPHQL_GATEWAY_SOURCE
            };
        }
        catch (e) {
            if (!(e instanceof TypeError)) {
                throw e;
            }
        }
    });
}
exports.mapMutationErrors = mapMutationErrors;
function parsingResponseError(e) {
    if (e instanceof TypeError) {
        return _1.SDK_SCHEMA_ERROR;
    }
    else {
        return {
            message: e.message,
            errorType: e.constructor.name,
            errorSource: _1.FORGE_GRAPHQL_SDK_ERROR_SOURCE,
            statusCode: 500
        };
    }
}
exports.parsingResponseError = parsingResponseError;
function parseCompoundMutationErrors(aggResp, variables) {
    if (!aggResp) {
        return [];
    }
    return Object.keys(variables).map((mutationName) => { var _a; return mapMutationErrors((_a = aggResp.compass[mutationName]) === null || _a === void 0 ? void 0 : _a.errors); }).flat().filter((error) => error);
}
exports.parseCompoundMutationErrors = parseCompoundMutationErrors;
//# sourceMappingURL=mapErrors.js.map