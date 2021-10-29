"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAction = void 0;
const tslib_1 = require("tslib");
const reconcilerState_1 = tslib_1.__importDefault(require("../reconcilerState"));
const getCurrentHookAndIncrementIndex = (wipFiber, value) => {
    const currentHookIndex = wipFiber.currentHookIndex;
    const componentKey = wipFiber.key;
    wipFiber.currentHookIndex++;
    wipFiber.hooks[currentHookIndex] = { type: 'action', value };
    return [
        value,
        (payload) => {
            reconcilerState_1.default.enqueueSideEffectIfEnabled({
                type: 'action',
                hookIndex: currentHookIndex,
                componentKey,
                payload
            });
        }
    ];
};
const getHookValueResolver = (wipFiber, value) => {
    const currentHookIndex = wipFiber.currentHookIndex;
    wipFiber.currentHookIndex = 0;
    return Promise.resolve(value).then((value) => {
        reconcilerState_1.default.disableSideEffectsQueue();
        if (!wipFiber) {
            throw new Error('cannot resolve useAction');
        }
        wipFiber.hooks[currentHookIndex] = { type: 'action', value };
    });
};
const processInitialValueAndThrow = (wipFiber, initialValue) => {
    reconcilerState_1.default.enableSideEffectsQueue();
    const value = initialValue instanceof Function ? initialValue() : initialValue;
    const hookValueResolver = getHookValueResolver(wipFiber, value);
    wipFiber.currentHookIndex = 0;
    throw hookValueResolver;
};
exports.useAction = (actionValueUpdater, initialValue) => {
    const { wipFiber, currentEffect } = reconcilerState_1.default;
    const { hooks, currentHookIndex } = wipFiber;
    if (hooks[currentHookIndex]) {
        const { value } = hooks[currentHookIndex];
        return getCurrentHookAndIncrementIndex(wipFiber, value);
    }
    const previousState = reconcilerState_1.default.previousState;
    const componentKey = wipFiber.key;
    if (currentEffect.type === 'initialize' || !previousState[componentKey]) {
        processInitialValueAndThrow(wipFiber, initialValue);
    }
    else {
        const previousValue = previousState[componentKey][currentHookIndex];
        if (currentEffect.type === 'action' &&
            currentEffect.componentKey === componentKey &&
            currentEffect.hookIndex === currentHookIndex) {
            reconcilerState_1.default.enableSideEffectsQueue();
            const value = actionValueUpdater(previousValue, currentEffect.payload);
            throw getHookValueResolver(wipFiber, value);
        }
        return getCurrentHookAndIncrementIndex(wipFiber, previousValue);
    }
    throw new Error('invalid effect');
};
