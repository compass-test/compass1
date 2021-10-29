"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompassApi = void 0;
const compass_requests_1 = require("./compass-requests");
const forge_wrapper_1 = __importDefault(require("./forge_wrapper"));
class CompassApi {
    constructor(api = global.api) {
        this.api = api;
    }
    asUser() {
        return new compass_requests_1.CompassRequests(forge_wrapper_1.default.wrap(this.api.asUser()));
    }
    asApp() {
        return new compass_requests_1.CompassRequests(forge_wrapper_1.default.wrap(this.api.asApp()));
    }
}
exports.CompassApi = CompassApi;
//# sourceMappingURL=compass-api.js.map