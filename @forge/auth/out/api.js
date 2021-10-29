"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiMethods = void 0;
const fromEntries = (array) => {
    return array.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
};
exports.createApiMethods = (methodToPermissionMap, permissionCheckFactory) => {
    const apiMethodEntries = Object.entries(methodToPermissionMap).map(([methodName, permission]) => [methodName, permissionCheckFactory(permission)]);
    return fromEntries(apiMethodEntries);
};
