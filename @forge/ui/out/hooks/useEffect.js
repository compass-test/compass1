"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEffect = void 0;
const tslib_1 = require("tslib");
const reconcilerState_1 = tslib_1.__importDefault(require("../reconcilerState"));
const utils_1 = require("./utils");
const setHookDependencies = (wipFiber, hash) => {
    if (!wipFiber) {
        throw new Error('cannot resolve useEffect');
    }
    const { currentHookIndex } = wipFiber;
    wipFiber.hooks[currentHookIndex] = { type: 'changeEffect', value: hash };
};
const assertAreDependenciesSerializable = (values) => {
    if (values.some((value) => !utils_1.isSerializable(value))) {
        throw new Error('Invalid dependencies array. At least one of dependencies is not serializable.');
    }
};
exports.useEffect = (onChange, dependencies) => {
    var _a;
    assertAreDependenciesSerializable(dependencies);
    const dependenciesHash = utils_1.hashDependencies(dependencies);
    const { wipFiber } = reconcilerState_1.default;
    const { hooks, currentHookIndex } = wipFiber;
    const componentKey = wipFiber.key;
    const previousState = reconcilerState_1.default.previousState;
    const previousDependenciesHash = ((_a = hooks[currentHookIndex]) === null || _a === void 0 ? void 0 : _a.value) || (previousState[componentKey] && previousState[componentKey][currentHookIndex]);
    if (dependenciesHash !== previousDependenciesHash) {
        reconcilerState_1.default.enableSideEffectsQueue();
        reconcilerState_1.default.enqueueSideEffectIfEnabled({
            type: 'changeEffect',
            onChange
        });
    }
    setHookDependencies(wipFiber, dependenciesHash);
    wipFiber.currentHookIndex++;
};
