"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProductContext = void 0;
const tslib_1 = require("tslib");
const reconcilerState_1 = tslib_1.__importDefault(require("../reconcilerState"));
exports.useProductContext = () => reconcilerState_1.default.productContext;
