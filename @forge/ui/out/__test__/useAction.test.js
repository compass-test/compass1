"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = tslib_1.__importStar(require("../"));
const mockAsyncFetch = () => Promise.resolve();
const runEffectsOnAppWithInitialState = async (effects, App, initialState) => {
    const fn = __1.render(__1.default.createElement(App, null));
    const [renderEffect] = await fn({
        context: {},
        state: initialState,
        effects: effects
    }, {});
    return renderEffect;
};
describe('useAction', () => {
    test('correctly calculates the initial value during an initialize effect', async () => {
        const MyApp = () => {
            __1.useAction((prevCount) => prevCount + 1, 0);
            return null;
        };
        const renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }], MyApp, {});
        expect(renderEffect.state).toEqual({
            'MyApp.0': { 0: 0 }
        });
    });
    test('initial value gets returned correctly as the first return value', async () => {
        const initialValue = 2;
        const MyApp = () => {
            const [count] = __1.useAction((prevCount) => prevCount + 1, initialValue);
            return __1.default.createElement(__1.Button, { text: `${count}`, onClick: () => { } });
        };
        const renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }], MyApp, {});
        expect(renderEffect.aux.children[0].props.text).toBe(`${initialValue}`);
    });
    const testCasesForActionValueUpdaterWithPayload = [
        ['the action value updater function', (prevCount, payload) => prevCount + payload],
        [
            'the asynchronous action value updater function',
            async (prevCount, payload) => {
                await mockAsyncFetch();
                return prevCount + payload;
            }
        ]
    ];
    test.each(testCasesForActionValueUpdaterWithPayload)('%s is called with the payload of the action effect', async (_, actionValueUpdater) => {
        const MyApp = () => {
            __1.useAction(actionValueUpdater, 0);
            return null;
        };
        const renderEffect = await runEffectsOnAppWithInitialState([{ type: 'action', hookIndex: 0, componentKey: 'MyApp.0', payload: 5 }], MyApp, { 'MyApp.0': { 0: 0 } });
        expect(renderEffect.state).toEqual({
            'MyApp.0': { 0: 5 }
        });
    });
    test('calls the correct action when there are multiple useAction hooks', async () => {
        const MyApp = () => {
            __1.useAction((prevCount) => prevCount + 1, 0);
            __1.useAction((prevCount, payload) => prevCount + payload, 0);
            return null;
        };
        const renderEffect = await runEffectsOnAppWithInitialState([
            {
                type: 'action',
                hookIndex: 0,
                componentKey: 'MyApp.0'
            }
        ], MyApp, { 'MyApp.0': { 0: 0, 1: 0 } });
        expect(renderEffect.state).toEqual({
            'MyApp.0': { 0: 1, 1: 0 }
        });
    });
    const testCasesWithDifferentInitialValue = [
        ['string', 'hello world!'],
        ['synchronous function', () => 'hello world!'],
        [
            'asynchronous function',
            async () => {
                await mockAsyncFetch();
                return 'hello world!';
            }
        ]
    ];
    test.each(testCasesWithDifferentInitialValue)('useAction calculates state correctly when initial value is %s', async (_, initialValue) => {
        const MyApp = () => {
            __1.useAction((x) => x, initialValue);
            return null;
        };
        const renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }], MyApp, {});
        expect(renderEffect.state).toEqual({
            'MyApp.0': { 0: 'hello world!' }
        });
    });
    describe('handle multiple action effects', () => {
        const firstHookActionEffect = {
            type: 'action',
            hookIndex: 0,
            componentKey: 'MyApp.0'
        };
        const secondHookActionEffect = {
            type: 'action',
            hookIndex: 1,
            componentKey: 'MyApp.0',
            payload: 5
        };
        const singleHookEffects = [
            firstHookActionEffect,
            firstHookActionEffect,
            firstHookActionEffect
        ];
        const multipleHookEffects = [
            firstHookActionEffect,
            secondHookActionEffect,
            firstHookActionEffect,
            secondHookActionEffect
        ];
        const testCasesForMultipleActionEffects = [
            ['one action hook', singleHookEffects, { 'MyApp.0': { 0: 3, 1: 0 } }],
            [
                'multiple action hooks',
                multipleHookEffects,
                { 'MyApp.0': { 0: 2, 1: 10 } },
            ],
        ];
        test.each(testCasesForMultipleActionEffects)('should return a single render effect for multiple action effects from %s', async (_, actionEffects, expectedState) => {
            const MyApp = () => {
                __1.useAction((prevCount) => prevCount + 1, 0);
                __1.useAction((prevCount, payload) => prevCount + payload, 0);
                return null;
            };
            const renderEffect = await runEffectsOnAppWithInitialState(actionEffects, MyApp, { 'MyApp.0': { 0: 0, 1: 0 } });
            expect(renderEffect.state).toEqual(expectedState);
        });
    });
    test('initialValue is used when a component is rendered for the first time during an action effect', async () => {
        const ConditionallyRenderedComponent = () => {
            __1.useAction((prevCount) => prevCount + 1, 0);
            return null;
        };
        const MyApp = () => {
            const [isVisible] = __1.useAction((isVisible) => !isVisible, false);
            return isVisible ? __1.default.createElement(ConditionallyRenderedComponent, null) : null;
        };
        const renderEffect = await runEffectsOnAppWithInitialState([
            {
                type: 'action',
                hookIndex: 0,
                componentKey: 'MyApp.0'
            }
        ], MyApp, { 'MyApp.0': { 0: false } });
        expect(renderEffect.state).toEqual({
            'MyApp.0': { 0: true },
            'ConditionallyRenderedComponent.0': { 0: 0 }
        });
    });
    describe('Dispatch function', () => {
        const handlerTestCases = [
            ['is synchronous', ([dispatch]) => dispatch, { 0: 1, 1: 0 }],
            [
                'is asynchronous',
                ([dispatch]) => async () => {
                    await mockAsyncFetch();
                    dispatch();
                },
                { 0: 1, 1: 0 }
            ],
            [
                'is asynchronous and calls multiple dispatch functions',
                ([dispatchOne, dispatchTwo]) => async () => {
                    await mockAsyncFetch();
                    dispatchOne();
                    dispatchTwo();
                },
                { 0: 1, 1: 1 }
            ]
        ];
        test.each(handlerTestCases)('calling dispatch correctly updates the rendered app state when the handler %s', async (_, handlerFromDispatch, expectedState) => {
            const App = () => {
                const [first, incrementFirst] = __1.useAction((prevCount) => prevCount + 1, 0);
                const [, addFirstToSecond] = __1.useAction((prevCount) => prevCount + first, 0);
                return (__1.default.createElement(__1.Button, { text: "increment first number and add second to first", onClick: handlerFromDispatch([incrementFirst, addFirstToSecond]) }));
            };
            const renderEffect = await runEffectsOnAppWithInitialState([
                {
                    type: 'event',
                    handler: {
                        componentKey: 'Button.0',
                        prop: 'onClick'
                    },
                    args: []
                }
            ], App, { 'App.0': { 0: 0, 1: 0 } });
            expect(renderEffect.state).toEqual({
                'App.0': expectedState
            });
        });
        test('calling dispatch within a useAction handler correctly updates the rendered app state', async () => {
            const App = () => {
                const [, incrementFirst] = __1.useAction((prevCount) => prevCount + 1, 0);
                const [, incrementSecond] = __1.useAction((prevCount) => {
                    incrementFirst();
                    return prevCount + 1;
                }, 0);
                const [, incrementThird] = __1.useAction((prevCount) => {
                    incrementSecond();
                    return prevCount + 1;
                }, 0);
                return (__1.default.createElement(__1.Button, { text: "increment the third number, which increments the second number, which increments the first", onClick: incrementThird }));
            };
            const renderEffect = await runEffectsOnAppWithInitialState([
                {
                    type: 'event',
                    handler: {
                        componentKey: 'Button.0',
                        prop: 'onClick'
                    },
                    args: []
                }
            ], App, { 'App.0': { 0: 0, 1: 0, 2: 0 } });
            expect(renderEffect.state).toEqual({
                'App.0': { 0: 1, 1: 1, 2: 1 }
            });
        });
        test('calling dispatch within a useAction handler, within another component correctly updates the rendered app state', async () => {
            const B = ({ incrementFirst }) => {
                const [, incrementAndDouble] = __1.useAction((prev) => {
                    incrementFirst();
                    return prev * 2;
                }, 2);
                return __1.default.createElement(__1.Button, { text: "increment", onClick: incrementAndDouble });
            };
            const App = () => {
                const [, incrementFirst] = __1.useAction((prevCount) => prevCount + 1, 0);
                return __1.default.createElement(B, { incrementFirst: incrementFirst });
            };
            const renderEffect = await runEffectsOnAppWithInitialState([
                {
                    type: 'event',
                    handler: {
                        componentKey: 'Button.0',
                        prop: 'onClick'
                    },
                    args: []
                }
            ], App, {
                'App.0': { 0: 0 },
                'B.0': { 0: 2 }
            });
            expect(renderEffect.state).toEqual({
                'App.0': { 0: 1 },
                'B.0': { 0: 4 }
            });
        });
        test('calling dispatch within a function/Promise that is passed as useActions initial value correctly updates the rendered app state', async () => {
            const App = () => {
                const [, incrementFirst] = __1.useAction((prevCount) => prevCount + 1, 0);
                const [, incrementSecond] = __1.useAction((prevCount) => prevCount + 1, () => {
                    incrementFirst();
                    return 0;
                });
                const [, ,] = __1.useAction((prevCount) => prevCount + 1, async () => {
                    incrementSecond();
                    return 0;
                });
                return null;
            };
            const renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }], App, {});
            expect(renderEffect.state).toEqual({
                'App.0': { 0: 1, 1: 1, 2: 0 }
            });
        });
    });
    test('conditionally rendered component', async () => {
        const ConditionallyRenderedComponent = () => {
            __1.useAction((prevCount) => prevCount + 1, 0);
            return null;
        };
        const App = () => {
            const [isVisible, toggleVisibility] = __1.useAction((isVisible) => !isVisible, false);
            return (__1.default.createElement(__1.Fragment, null,
                __1.default.createElement(__1.Button, { text: "Click me", onClick: toggleVisibility }),
                isVisible && __1.default.createElement(ConditionallyRenderedComponent, null)));
        };
        const renderEffect = await runEffectsOnAppWithInitialState([
            {
                type: 'event',
                handler: {
                    componentKey: 'Button.0',
                    prop: 'onClick'
                },
                args: []
            }
        ], App, { 'App.0': { 0: false } });
        expect(renderEffect.state).toEqual({
            'App.0': { 0: true },
            'ConditionallyRenderedComponent.0': { 0: 0 }
        });
    });
    describe('invalid scenarios', () => {
        let consoleLog;
        beforeEach(() => {
            consoleLog = jest.spyOn(global.console, 'log').mockImplementation();
        });
        afterEach(() => {
            consoleLog.mockRestore();
        });
        test('invalid event handler.props are rejected', async () => {
            const MyApp = () => null;
            const fn = __1.render(__1.default.createElement(MyApp, null));
            await expect(fn({
                context: {},
                state: { 'MyApp.0': { 0: 0, 1: 0 } },
                effects: [
                    {
                        type: 'event',
                        handler: {
                            componentKey: 'Component.Key.0',
                            prop: 'constructor'
                        },
                        args: []
                    }
                ]
            })).rejects.toThrow('Invalid event handler.prop: constructor');
        });
        test('to throw an error if an invalid effect is triggered', async () => {
            const MyApp = () => {
                __1.useAction((prevCount) => prevCount + 1, 0);
                return null;
            };
            const fn = __1.render(__1.default.createElement(MyApp, null));
            await expect(fn({
                context: {},
                state: { 'MyApp.0': { 0: 0, 1: 0 } },
                effects: [
                    {
                        type: 'invalidEffect'
                    }
                ]
            }, {})).rejects.toThrow('Invalid effect: {"type":"invalidEffect"}');
        });
        test('to throw an error if dispatch is called in an invalid location', async () => {
            const App = () => {
                const [, incrementFirst] = __1.useAction((prevCount) => prevCount + 1, 0);
                incrementFirst();
                return null;
            };
            const renderEffect = runEffectsOnAppWithInitialState([{ type: 'initialize' }], App, {});
            await expect(renderEffect).rejects.toThrow('dispatch must be called inside of an event handler or within the function arguments of useAction, useState or useContentProperty');
        });
    });
});
