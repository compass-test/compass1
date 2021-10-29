"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = tslib_1.__importStar(require("../"));
const useEffect_1 = require("../hooks/useEffect");
const utils_1 = require("../hooks/utils");
const runEffectsOnAppWithInitialState = async (effects, App, initialState) => {
    const fn = __1.render(__1.default.createElement(App, null));
    const [renderEffect] = await fn({
        context: {},
        state: initialState,
        effects: effects
    }, {});
    return renderEffect;
};
describe('useEffect', () => {
    const actionMock = jest.fn();
    let renderEffect;
    afterEach(() => {
        jest.resetAllMocks();
    });
    describe('when no action effect is fired in action', () => {
        describe('when dependencies array is empty', () => {
            const TestApp = () => {
                useEffect_1.useEffect(() => {
                    actionMock();
                }, []);
                const [, makeRender] = __1.useState(0);
                const refresh = () => makeRender(new Date().getTime());
                return __1.default.createElement(__1.Button, { text: "Click", onClick: refresh });
            };
            test('should execute use effect action only once for initialization', async () => {
                renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }], TestApp, {});
                expect(actionMock).toHaveBeenCalledTimes(1);
            });
            test('should execute use effect only once for multiple effects fired', async () => {
                renderEffect = await runEffectsOnAppWithInitialState([
                    { type: 'initialize' },
                    {
                        type: 'event',
                        handler: { componentKey: 'Button.0', prop: 'onClick' },
                        args: []
                    },
                    {
                        type: 'event',
                        handler: { componentKey: 'Button.0', prop: 'onClick' },
                        args: []
                    },
                    {
                        type: 'action',
                        hookIndex: 0,
                        componentKey: 'TestApp.0'
                    }
                ], TestApp, {});
                expect(actionMock).toHaveBeenCalledTimes(1);
            });
        });
        describe('when dependency is constant', () => {
            const TestApp = () => {
                const [, makeRender] = __1.useState(0);
                const refresh = () => makeRender(new Date().getTime());
                useEffect_1.useEffect(() => {
                    actionMock();
                }, ['dependency']);
                return __1.default.createElement(__1.Button, { text: "Click", onClick: refresh });
            };
            test('should execute use effect action for initialization', async () => {
                renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }], TestApp, {});
                expect(actionMock).toHaveBeenCalledTimes(1);
            });
            test('should execute use effect action for initialization and event effect', async () => {
                renderEffect = await runEffectsOnAppWithInitialState([
                    { type: 'initialize' },
                    {
                        type: 'event',
                        handler: { componentKey: 'Button.0', prop: 'onClick' },
                        args: []
                    },
                    {
                        type: 'event',
                        handler: { componentKey: 'Button.0', prop: 'onClick' },
                        args: []
                    }
                ], TestApp, {});
                expect(actionMock).toHaveBeenCalledTimes(1);
            });
        });
        describe('when dependency is constant object', () => {
            const TestApp = () => {
                const [, makeRender] = __1.useState(0);
                const refresh = () => makeRender(new Date().getTime());
                useEffect_1.useEffect(() => {
                    actionMock();
                }, [
                    {
                        firstProp: 'dependency',
                        secondProps: 100,
                        thirdProps: false
                    }
                ]);
                return __1.default.createElement(__1.Button, { text: "Click", onClick: refresh });
            };
            test('should execute use effect action for initialization', async () => {
                renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }], TestApp, {});
                expect(actionMock).toHaveBeenCalledTimes(1);
            });
            test('should execute use effect action for initialization and event effect', async () => {
                renderEffect = await runEffectsOnAppWithInitialState([
                    { type: 'initialize' },
                    {
                        type: 'event',
                        handler: { componentKey: 'Button.0', prop: 'onClick' },
                        args: []
                    },
                    {
                        type: 'event',
                        handler: { componentKey: 'Button.0', prop: 'onClick' },
                        args: []
                    }
                ], TestApp, {});
                expect(actionMock).toHaveBeenCalledTimes(1);
            });
        });
        test('should execute use effect action for every event effect when dependency changes on every render', async () => {
            const TestApp = () => {
                const [count, setCount] = __1.useState(0);
                useEffect_1.useEffect(() => {
                    actionMock();
                }, [count]);
                const [,] = __1.useState('dummy value');
                return __1.default.createElement(__1.Button, { text: "button", onClick: () => setCount(count + 1) });
            };
            renderEffect = await runEffectsOnAppWithInitialState([
                { type: 'initialize' },
                {
                    type: 'event',
                    handler: { componentKey: 'Button.0', prop: 'onClick' },
                    args: []
                },
            ], TestApp, {});
            expect(actionMock).toHaveBeenCalledTimes(2);
        });
    });
    describe('when Forge action effect is fired in useEffect callback', () => {
        const actionEffect = {
            type: 'action',
            hookIndex: 0,
            componentKey: 'TestApp.0'
        };
        describe('when dependency is constant', () => {
            const TestApp = () => {
                const [state, setState] = __1.useState('initial');
                useEffect_1.useEffect(() => {
                    setState('new value');
                    actionMock();
                }, ['dependency']);
                return __1.default.createElement(__1.Text, null, state);
            };
            const expectedDependencies = utils_1.hashDependencies(['dependency']);
            test('should execute use effect action once on initialization', async () => {
                renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }], TestApp, {});
                expect(renderEffect.state).toEqual({
                    'TestApp.0': { 0: 'new value', 1: expectedDependencies }
                });
                expect(actionMock).toHaveBeenCalledTimes(1);
            });
            test('should execute use effect action once when single action effect fired', async () => {
                renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }, actionEffect], TestApp, {});
                expect(renderEffect.state).toEqual({
                    'TestApp.0': { 0: 'new value', 1: expectedDependencies }
                });
                expect(actionMock).toHaveBeenCalledTimes(1);
            });
            test('should execute use effect action once when multiple action effects fired', async () => {
                renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }, actionEffect, actionEffect, actionEffect], TestApp, {});
                expect(renderEffect.state).toEqual({
                    'TestApp.0': { 0: 'new value', 1: expectedDependencies }
                });
                expect(actionMock).toHaveBeenCalledTimes(1);
            });
        });
        describe('when dependency is changing', () => {
            const dependenciesProviderMock = jest.fn();
            const TestApp = () => {
                const [state, setState] = __1.useState('initial');
                const dependencies = dependenciesProviderMock();
                useEffect_1.useEffect(() => {
                    setState('new value');
                    actionMock();
                }, dependencies);
                return __1.default.createElement(__1.Text, null, state);
            };
            const actionEffect = {
                type: 'action',
                hookIndex: 0,
                componentKey: 'TestApp.0'
            };
            const expectedDependencies = utils_1.hashDependencies(['new dependency']);
            test('should execute use effect action twice, when single action effect fired and dependency value changed', async () => {
                dependenciesProviderMock
                    .mockReturnValueOnce(['dependency'])
                    .mockReturnValue(['new dependency']);
                renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }, actionEffect], TestApp, {});
                expect(renderEffect.state).toEqual({
                    'TestApp.0': { 0: 'new value', 1: expectedDependencies }
                });
                expect(actionMock).toHaveBeenCalledTimes(2);
            });
            test('should execute use effect action twice, when multiple action effects fired and dependency value changed', async () => {
                dependenciesProviderMock
                    .mockReturnValueOnce(['dependency'])
                    .mockReturnValue(['new dependency']);
                renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }, actionEffect, actionEffect, actionEffect], TestApp, {});
                expect(renderEffect.state).toEqual({
                    'TestApp.0': { 0: 'new value', 1: expectedDependencies }
                });
                expect(actionMock).toHaveBeenCalledTimes(2);
            });
        });
    });
    describe('when set multiple dependencies to useEffect', () => {
        const actionEffect = {
            type: 'action',
            hookIndex: 0,
            componentKey: 'TestApp.0'
        };
        describe('when both dependencies are constant', () => {
            const expectedDependencies = utils_1.hashDependencies(['dependency', 'another dependency', true]);
            const TestApp = () => {
                const [state, setState] = __1.useState('initial');
                useEffect_1.useEffect(() => {
                    setState('new value');
                    actionMock();
                }, ['dependency', 'another dependency', true]);
                return __1.default.createElement(__1.Text, null, state);
            };
            test('should execute use effect action once on initialization', async () => {
                renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }], TestApp, {});
                expect(renderEffect.state).toEqual({
                    'TestApp.0': {
                        0: 'new value',
                        1: expectedDependencies
                    }
                });
                expect(actionMock).toHaveBeenCalledTimes(1);
            });
            test('should execute use effect action once when multiple action effects fired', async () => {
                renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }, actionEffect, actionEffect, actionEffect], TestApp, {});
                expect(renderEffect.state).toEqual({
                    'TestApp.0': {
                        0: 'new value',
                        1: expectedDependencies
                    }
                });
                expect(actionMock).toHaveBeenCalledTimes(1);
            });
        });
        describe('when dependencies are changing', () => {
            const dependenciesProviderMock = jest.fn();
            const TestApp = () => {
                const [state, setState] = __1.useState('initial');
                const dependencies = dependenciesProviderMock();
                useEffect_1.useEffect(() => {
                    setState('new value');
                    actionMock();
                }, dependencies);
                return __1.default.createElement(__1.Text, null, state);
            };
            const actionEffect = {
                type: 'action',
                hookIndex: 0,
                componentKey: 'TestApp.0'
            };
            test('should execute use effect action twice, when single action effect fired and dependency value changed', async () => {
                const expectedDependencies = utils_1.hashDependencies(['dependency', 'second dependency changed']);
                dependenciesProviderMock
                    .mockReturnValueOnce(['dependency', 'second dependency'])
                    .mockReturnValue(['dependency', 'second dependency changed']);
                renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }, actionEffect], TestApp, {});
                expect(renderEffect.state).toEqual({
                    'TestApp.0': {
                        0: 'new value',
                        1: expectedDependencies
                    }
                });
                expect(actionMock).toHaveBeenCalledTimes(2);
            });
            test('should execute use effect action twice, when multiple action effects fired and dependency value changed', async () => {
                const expectedDependencies = utils_1.hashDependencies(['dependency', 'second dependency changed']);
                dependenciesProviderMock
                    .mockReturnValueOnce(['dependency', 'second dependency'])
                    .mockReturnValue(['dependency', 'second dependency changed']);
                renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }, actionEffect, actionEffect, actionEffect], TestApp, {});
                expect(renderEffect.state).toEqual({
                    'TestApp.0': {
                        0: 'new value',
                        1: expectedDependencies
                    }
                });
                expect(actionMock).toHaveBeenCalledTimes(2);
            });
        });
    });
    describe('with useEffect multiple hooks', () => {
        test('should call all useEffect hooks on initialization', async () => {
            const firstActionMock = jest.fn();
            const secondActionMock = jest.fn();
            const expectedDependencies = utils_1.hashDependencies([]);
            const TestApp = () => {
                const [, makeRender] = __1.useState(0);
                const refresh = () => makeRender(new Date().getTime());
                useEffect_1.useEffect(firstActionMock, []);
                useEffect_1.useEffect(secondActionMock, []);
                return __1.default.createElement(__1.Button, { text: "Click", onClick: refresh });
            };
            const renderEffect = await runEffectsOnAppWithInitialState([{ type: 'initialize' }], TestApp, {
                'TestApp.0': {}
            });
            expect(renderEffect.state).toEqual({
                'TestApp.0': { 0: 0, 1: expectedDependencies, 2: expectedDependencies }
            });
            expect(firstActionMock).toHaveBeenCalledTimes(1);
            expect(secondActionMock).toHaveBeenCalledTimes(1);
        });
        test('should call only useEffect with affected dependencies', async () => {
            const firstActionMock = jest.fn();
            const secondActionMock = jest.fn();
            const firstDependencyProviderMock = jest
                .fn()
                .mockReturnValueOnce(['dependency'])
                .mockReturnValueOnce(['new dependency value'])
                .mockReturnValueOnce(['another one dependency value']);
            const secondDependencyProviderMock = jest.fn().mockReturnValue(['fixed dependency']);
            const TestApp = () => {
                const [, makeRender] = __1.useState(0);
                const refresh = () => makeRender(new Date().getTime());
                useEffect_1.useEffect(firstActionMock, firstDependencyProviderMock());
                useEffect_1.useEffect(secondActionMock, secondDependencyProviderMock());
                return __1.default.createElement(__1.Button, { text: "Click", onClick: refresh });
            };
            await runEffectsOnAppWithInitialState([
                { type: 'initialize' },
                {
                    type: 'action',
                    hookIndex: 0,
                    componentKey: 'TestApp.0'
                },
                {
                    type: 'action',
                    hookIndex: 0,
                    componentKey: 'TestApp.0'
                }
            ], TestApp, { 'TestApp.0': {} });
            expect(firstActionMock).toHaveBeenCalledTimes(3);
            expect(secondActionMock).toHaveBeenCalledTimes(1);
        });
    });
    describe('when validation fails', () => {
        test('should fail validation when dependency is function', async () => {
            const actionMock = jest.fn();
            const TestApp = () => {
                useEffect_1.useEffect(actionMock, [() => { }]);
                return null;
            };
            const renderEffect = runEffectsOnAppWithInitialState([{ type: 'initialize' }], TestApp, { 'TestApp.0': {} });
            return expect(renderEffect).rejects.toThrow('Invalid dependencies array. At least one of dependencies is not serializable.');
        });
        test(`should fail validation when dependency is object and its prop is function`, async () => {
            const actionMock = jest.fn();
            const TestApp = () => {
                useEffect_1.useEffect(actionMock, [
                    {
                        name: 'hello',
                        someFunction: () => { }
                    }
                ]);
                return null;
            };
            const renderEffect = runEffectsOnAppWithInitialState([{ type: 'initialize' }], TestApp, { 'TestApp.0': {} });
            return expect(renderEffect).rejects.toThrow('Invalid dependencies array. At least one of dependencies is not serializable.');
        });
    });
    test(`should fail validation when dependency is object and its nested prop is function`, async () => {
        const actionMock = jest.fn();
        const TestApp = () => {
            useEffect_1.useEffect(actionMock, [
                {
                    name: 'hello',
                    anotherObject: {
                        someFunction: () => { }
                    }
                }
            ]);
            return null;
        };
        const renderEffect = runEffectsOnAppWithInitialState([{ type: 'initialize' }], TestApp, { 'TestApp.0': {} });
        return expect(renderEffect).rejects.toThrow('Invalid dependencies array. At least one of dependencies is not serializable.');
    });
});
