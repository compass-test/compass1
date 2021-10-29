"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const compass_api_1 = require("./compass-api");
class Api {
    constructor(api = global.api) {
        this.api = api;
        this.compass = new compass_api_1.CompassApi(this.api);
    }
}
exports.Api = Api;
//# sourceMappingURL=api.js.map