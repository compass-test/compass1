"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
const tslib_1 = require("tslib");
const reconcilerState_1 = tslib_1.__importDefault(require("./reconcilerState"));
const reconcile_1 = require("./reconcile");
const context_1 = require("./context");
const eventHandlerRegex = /^on[A-Z].*/;
function isValidEventHandlerProp(prop) {
    return eventHandlerRegex.test(prop);
}
exports.render = (elem) => async (payload, runtimeContext) => {
    reconcilerState_1.default.config = payload.config;
    reconcilerState_1.default.previousState = payload.state;
    reconcilerState_1.default.productContext = context_1.toProductContext(payload.context, runtimeContext);
    let latestRenderEffect;
    const effects = [...payload.effects];
    while (effects.length !== 0) {
        const effect = effects.shift();
        switch (effect.type) {
            case 'initialize':
            case 'action':
                reconcilerState_1.default.disableSideEffectsQueue();
                reconcilerState_1.default.clearSideEffectsQueue();
                reconcilerState_1.default.currentEffect = effect;
                const fiber = await reconcile_1.processAuxElement(elem);
                const renderEffect = {
                    type: 'render',
                    aux: { type: 'View', children: reconcile_1.getAuxFromFiber(fiber) },
                    state: reconcile_1.getStateFromFiber(fiber)
                };
                effects.push(...reconcilerState_1.default.queuedSideEffects);
                reconcilerState_1.default.previousState = renderEffect.state;
                latestRenderEffect = renderEffect;
                break;
            case 'event':
                if (!isValidEventHandlerProp(effect.handler.prop)) {
                    throw new Error(`Invalid event handler.prop: ${effect.handler.prop}`);
                }
                reconcilerState_1.default.disableSideEffectsQueue();
                reconcilerState_1.default.clearSideEffectsQueue();
                reconcilerState_1.default.currentEffect = effect;
                await reconcile_1.processAuxElement(elem);
                effects.push(...reconcilerState_1.default.queuedSideEffects);
                break;
            case 'changeEffect':
                reconcilerState_1.default.disableSideEffectsQueue();
                reconcilerState_1.default.clearSideEffectsQueue();
                reconcilerState_1.default.currentEffect = effect;
                reconcilerState_1.default.enableSideEffectsQueue();
                await effect.onChange();
                effects.push(...reconcilerState_1.default.queuedSideEffects);
                break;
            default:
                throw new Error(`Invalid effect: ${JSON.stringify(effect)}`);
        }
    }
    return latestRenderEffect ? [latestRenderEffect] : [];
};
