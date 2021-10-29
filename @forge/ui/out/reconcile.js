"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStateFromFiber = exports.getAuxFromFiber = exports.processAuxElement = exports.isTextElement = void 0;
const tslib_1 = require("tslib");
const types_1 = require("./types");
const reconcilerState_1 = tslib_1.__importDefault(require("./reconcilerState"));
exports.isTextElement = (element) => element.type === 'Text';
const flatMap = (fn, items) => items.reduce((bs, a) => bs.concat(fn(a)), []);
const asyncMap = async (fn, items) => {
    const results = [];
    for (const x of items) {
        const result = await fn(x);
        results.push(result);
    }
    return results;
};
const _processAuxElement = (getUniqueName, path) => async (element) => {
    if (typeof element === 'string' || typeof element === 'number') {
        return {
            type: 'text',
            text: element.toString(),
            children: []
        };
    }
    else if (typeof element.type === 'string') {
        const key = getUniqueName(`${element.props.__auxId || element.type}`);
        const currentEffect = reconcilerState_1.default.currentEffect;
        if (currentEffect && currentEffect.type === 'event' && key === currentEffect.handler.componentKey) {
            reconcilerState_1.default.enableSideEffectsQueue();
            await element.props[currentEffect.handler.prop](...currentEffect.args);
            reconcilerState_1.default.disableSideEffectsQueue();
        }
        let childrenFiber = await asyncMap(_processAuxElement(getUniqueName, [...path, element.type]), element.props.children.filter(types_1.isForgeElement));
        if (element.type === 'Text') {
            element.props = {
                ...element.props,
                format: 'markup'
            };
        }
        if (element.type === 'Form') {
            const { actionButtons } = element.props;
            if (actionButtons) {
                const prependActionButtonKey = (name) => {
                    return `actionButton.${getUniqueName(name)}`;
                };
                const actionButtonsFiber = await asyncMap(_processAuxElement(prependActionButtonKey, [...path, element.type]), actionButtons);
                delete element.props.actionButtons;
                childrenFiber = childrenFiber.concat(actionButtonsFiber);
            }
        }
        return {
            type: 'primitive',
            element: {
                ...element,
                type: element.type
            },
            key,
            children: childrenFiber
        };
    }
    else if (typeof element.type === 'function') {
        const { __auxId, ...props } = element.props;
        reconcilerState_1.default.wipFiber = {
            type: 'function',
            element: {
                ...element,
                type: element.type
            },
            key: getUniqueName(`${__auxId || element.type.name}`),
            hooks: [],
            currentHookIndex: 0,
            children: []
        };
        let children = undefined;
        while (children === undefined) {
            try {
                children = element.type(props);
            }
            catch (e) {
                if (e instanceof Promise) {
                    await e;
                }
                else {
                    throw e;
                }
            }
        }
        const fiber = {
            ...reconcilerState_1.default.wipFiber,
            currentHookIndex: 0
        };
        reconcilerState_1.default.clearWipFiber();
        return {
            ...fiber,
            children: await asyncMap(_processAuxElement(getUniqueName, [...path, element.type.name]), children ? [children] : [])
        };
    }
    throw new Error(`Unexpected child type: ${Array.isArray(element) ? 'Array' : element.type || typeof element}. Valid children are @forge/ui components, function components, and strings.\nError occurred in ${path.length > 0 ? path[path.length - 1] : 'render'}${path.length > 1 ? ':\n\tin ' : '.'}${path
        .reverse()
        .slice(1)
        .join('\n\tin ')}`);
};
exports.processAuxElement = async (element) => {
    const visitedElements = {};
    const getUniqueName = (name) => {
        if (typeof visitedElements[name] === 'undefined') {
            visitedElements[name] = 0;
        }
        else {
            visitedElements[name]++;
        }
        return `${name}.${visitedElements[name]}`;
    };
    return _processAuxElement(getUniqueName, [])(element);
};
exports.getAuxFromFiber = (fiber) => {
    if (fiber.type === 'text') {
        return [
            {
                type: 'String',
                children: [],
                props: { text: fiber.text }
            }
        ];
    }
    else if (fiber.type === 'primitive') {
        const { element, key, children } = fiber;
        if (element.type === 'Fragment') {
            return flatMap(exports.getAuxFromFiber, children);
        }
        const { children: _, ...props } = element.props;
        return [
            {
                children: flatMap(exports.getAuxFromFiber, children),
                key,
                props: Object.entries(props).reduce((newProps, [propKey, value]) => {
                    newProps[propKey] =
                        typeof value === 'function' ? { componentKey: key, prop: propKey } : value;
                    return newProps;
                }, {}),
                type: element.type
            }
        ];
    }
    return flatMap(exports.getAuxFromFiber, fiber.children);
};
exports.getStateFromFiber = (fiber) => {
    let state = {};
    if (fiber.type === 'function' && fiber.hooks.some((hook) => hook.type === 'action')) {
        state = {
            [fiber.key]: fiber.hooks.reduce((map, hook, hookIndex) => {
                if (hook.type === 'action') {
                    map[hookIndex] = hook.value;
                }
                if (hook.type === 'changeEffect') {
                    map[hookIndex] = hook.value;
                }
                return map;
            }, {})
        };
    }
    fiber.children.forEach((child) => {
        state = { ...state, ...exports.getStateFromFiber(child) };
    });
    return state;
};
