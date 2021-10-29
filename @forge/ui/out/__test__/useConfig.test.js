"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const reconcilerState_1 = tslib_1.__importDefault(require("../reconcilerState"));
const __1 = require("..");
const mockConfig = {
    'dummy-key': 'dummy-value'
};
describe('useConfig', () => {
    it('returns config if present', () => {
        reconcilerState_1.default.config = mockConfig;
        expect(__1.useConfig()).toBe(mockConfig);
    });
    it('returns undefined if no config set', () => {
        reconcilerState_1.default.config = undefined;
        expect(__1.useConfig()).toBe(undefined);
    });
});
