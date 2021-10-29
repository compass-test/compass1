"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFamilyAriImpl = void 0;
const AppFamilyAriModule = __importStar(require("./app-family-ari"));
const ari_1 = require("./ari");
const constraints_1 = require("./constraints");
const resource_identifier_1 = require("./resource-identifier");
const versionPrefix = ';v=';
const uuidRegExpString = '[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}';
const uuidConstraints = [(0, constraints_1.pattern)(new RegExp(`^${uuidRegExpString}$`, 'i'))];
const extensionGroupIdConstraints = [(0, constraints_1.pattern)(new RegExp(`^(${uuidRegExpString}|static)$`, 'i'))];
function stripToUndefined(str) {
    if (!str) {
        return undefined;
    }
    const trimmed = str.trim();
    if (trimmed.length === 0) {
        return undefined;
    }
    return trimmed;
}
class AppFamilyAriImpl {
    constructor(json) {
        this.json = json;
        this.validate();
    }
    get appId() {
        return this.json.appId;
    }
    get environmentId() {
        return this.json.environmentId;
    }
    get versionId() {
        return this.json.versionId;
    }
    get version() {
        return this.json.version;
    }
    get extensionGroupId() {
        return this.json.extensionGroupId;
    }
    get extensionKey() {
        return this.json.extensionKey;
    }
    toJSON() {
        return this.json;
    }
    static parse(ari) {
        const { resourceOwner, resourceType, resourceId } = ari;
        if (resourceOwner !== AppFamilyAriModule.resourceOwner) {
            throw new ari_1.NotAppFamilyAriError(ari, `resourceOwner (${resourceOwner}) must be ${AppFamilyAriModule.resourceOwner}`);
        }
        if (!resourceType || !AppFamilyAriModule.isAppFamilyResourceType(resourceType)) {
            throw new ari_1.NotAppFamilyAriError(ari, `resourceType must be one of ${AppFamilyAriModule.appFamilyResourceTypes}`);
        }
        if (!resourceId) {
            throw new ari_1.NotAppFamilyAriError(ari, 'resourceId is must be provided');
        }
        const versionIndex = resourceId.indexOf(versionPrefix);
        if (versionIndex > 0 && resourceId.lastIndexOf(versionPrefix) > versionIndex) {
            throw new ari_1.NotAppFamilyAriError(ari, 'can only include one version suffix');
        }
        const [mainResourceId, version] = resourceId.split(versionPrefix);
        const segments = mainResourceId.split('/').map(stripToUndefined);
        if (segments.length > 4) {
            throw new ari_1.NotAppFamilyAriError(ari, `no path segments can be added after extensionKey ${segments.slice(4)}`);
        }
        const [appId = undefined, environmentId = undefined, providedExtensionGroupId = undefined, extensionKey = undefined,] = segments;
        const versionId = resourceType === AppFamilyAriModule.appEnvironmentVersionResourceType ? providedExtensionGroupId : undefined;
        if (!appId) {
            throw new ari_1.NotAppFamilyAriError(ari, 'appId must be included');
        }
        const extensionGroupId = providedExtensionGroupId ||
            (resourceType === AppFamilyAriModule.extensionGroupResourceType ||
                resourceType === AppFamilyAriModule.extensionResourceType
                ? 'static'
                : undefined);
        if (resourceType === AppFamilyAriModule.extensionResourceType &&
            !(environmentId && providedExtensionGroupId && extensionKey)) {
            throw new ari_1.NotAppFamilyAriError(ari, `environmentId, extensionGroupId, extensionKey must all be provided for resourceType ${AppFamilyAriModule.extensionResourceType}`);
        }
        else if (resourceType === AppFamilyAriModule.extensionGroupResourceType &&
            (!(environmentId && extensionGroupId) || extensionKey)) {
            throw new ari_1.NotAppFamilyAriError(ari, `environmentId, extensionGroupId must all be provided for resourceType ${AppFamilyAriModule.extensionGroupResourceType}`);
        }
        else if (resourceType === AppFamilyAriModule.environmentResourceType &&
            (!environmentId || providedExtensionGroupId || extensionKey)) {
            throw new ari_1.NotAppFamilyAriError(ari, `environmentId must be provided for resourceType ${AppFamilyAriModule.environmentResourceType}`);
        }
        else if (resourceType === AppFamilyAriModule.appEnvironmentVersionResourceType &&
            (!environmentId || !versionId || extensionKey)) {
            throw new ari_1.NotAppFamilyAriError(ari, `environmentId and versionID must be provided for resourceType ${AppFamilyAriModule.appEnvironmentVersionResourceType}`);
        }
        else if (resourceType === AppFamilyAriModule.appResourceType &&
            (environmentId || providedExtensionGroupId || extensionKey)) {
            throw new ari_1.NotAppFamilyAriError(ari, `environmentId must be provided for resourceType ${AppFamilyAriModule.environmentResourceType}`);
        }
        if (resourceType === AppFamilyAriModule.appEnvironmentVersionResourceType) {
            return new AppFamilyAriImpl({ appId, environmentId, versionId });
        }
        return new AppFamilyAriImpl({ appId, environmentId, versionId, extensionGroupId, extensionKey, version });
    }
    asAppAri() {
        return this.returnIf(() => this.isAppAri(), 'app');
    }
    asAppEnvironmentAri() {
        return this.returnIf(() => this.isAppEnvironmentAri(), 'environment');
    }
    asAppEnvironmentVersionAri() {
        return this.returnIf(() => this.isAppEnvironmentVersionAri(), 'app-environment-version');
    }
    asExtensionGroupAri() {
        return this.returnIf(() => this.isExtensionGroupAri(), 'extension-group');
    }
    asExtensionAri() {
        return this.returnIf(() => this.isExtensionAri(), 'extension');
    }
    isAppAri() {
        return !this.isAtLeastAppEnvironmentAri;
    }
    isAppEnvironmentAri() {
        return this.isAtLeastAppEnvironmentAri && !this.isAtLeastExtensionGroupAri;
    }
    isAppEnvironmentVersionAri() {
        return this.isAtLeastAppEnvironmentVersionAri;
    }
    isExtensionGroupAri() {
        return this.isAtLeastExtensionGroupAri && !this.isExtensionAri();
    }
    isExtensionAri() {
        return this.isAtLeastExtensionGroupAri && this.extensionKey !== undefined;
    }
    returnIf(check, type) {
        if (!check()) {
            throw new ari_1.NotExpectedAppFamilyAriTypeError(type, this);
        }
        return this; // :sadpanda:
    }
    get isAtLeastAppEnvironmentAri() {
        return this.environmentId !== undefined;
    }
    get isAtLeastAppEnvironmentVersionAri() {
        return this.versionId !== undefined;
    }
    get isAtLeastExtensionGroupAri() {
        return this.isAtLeastAppEnvironmentAri && this.extensionGroupId !== undefined;
    }
    validate() {
        const constraintViolations = [
            (0, constraints_1.validateField)(this, 'environmentId', uuidConstraints),
            (0, constraints_1.validateField)(this, 'appId', uuidConstraints),
            (0, constraints_1.validateField)(this, 'extensionGroupId', extensionGroupIdConstraints),
            (0, constraints_1.validateField)(this, 'versionId', uuidConstraints),
        ].filter((v) => v);
        if (constraintViolations.length > 0) {
            throw resource_identifier_1.InvalidAriError.withConstraintViolations(this.toString(), constraintViolations);
        }
    }
    toAri() {
        const resourceOwner = AppFamilyAriModule.resourceOwner;
        const { versionId } = this.toJSON();
        const { appId, environmentId, extensionGroupId, extensionKey, version } = this.toJSON();
        function withVersion(segments) {
            const path = segments.join('/');
            if (!version) {
                return path;
            }
            else {
                return `${path}${versionPrefix}${version}`;
            }
        }
        if (this.isExtensionAri()) {
            return new resource_identifier_1.ResourceIdentifier({
                resourceOwner,
                resourceType: AppFamilyAriModule.extensionResourceType,
                resourceId: withVersion([appId, environmentId, extensionGroupId, extensionKey]),
            });
        }
        else if (this.isExtensionGroupAri()) {
            return new resource_identifier_1.ResourceIdentifier({
                resourceOwner,
                resourceType: AppFamilyAriModule.extensionGroupResourceType,
                resourceId: withVersion([appId, environmentId, extensionGroupId]),
            });
        }
        else if (this.isAppEnvironmentVersionAri()) {
            return new resource_identifier_1.ResourceIdentifier({
                resourceOwner,
                resourceType: AppFamilyAriModule.appEnvironmentVersionResourceType,
                resourceId: [appId, environmentId, versionId].join('/'),
            });
        }
        else if (this.isAppEnvironmentAri()) {
            return new resource_identifier_1.ResourceIdentifier({
                resourceOwner,
                resourceType: AppFamilyAriModule.environmentResourceType,
                resourceId: withVersion([appId, environmentId]),
            });
        }
        else {
            return new resource_identifier_1.ResourceIdentifier({
                resourceOwner,
                resourceType: AppFamilyAriModule.appResourceType,
                resourceId: appId,
            });
        }
    }
    toString() {
        return this.toAri().toString();
    }
}
exports.AppFamilyAriImpl = AppFamilyAriImpl;
//# sourceMappingURL=app-ari-impls.js.map