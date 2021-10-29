"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = tslib_1.__importStar(require(".."));
const BASE_CLIENT_CONTEXT = {
    accountId: 'client-accountId',
    cloudId: 'DUMMY-value',
    contentId: '1234',
    spaceKey: 'muppet',
    localId: 'abc-def'
};
const BASE_RUNTIME_CONTEXT = {
    installContext: 'ari:pizza',
    principal: {
        accountId: 'runtime-accountId'
    }
};
const runRenderOfProductContext = async (context, runtimeContext) => {
    const MyApp = () => {
        const context = __1.useProductContext();
        return __1.default.createElement(__1.Text, null, JSON.stringify(context));
    };
    const fn = __1.render(__1.default.createElement(MyApp, null));
    const [renderEffect] = await fn({
        context,
        state: {},
        effects: [{ type: 'initialize' }]
    }, runtimeContext);
    return renderEffect;
};
describe('useExtension', () => {
    test('correctly returns the expected context when runtimeContext undefined', async () => {
        const renderEffect = await runRenderOfProductContext({
            ...BASE_CLIENT_CONTEXT,
            internalValue: 'donuts'
        }, undefined);
        expect(JSON.parse(renderEffect.aux.children[0].children[0].props.text)).toEqual({
            ...BASE_CLIENT_CONTEXT,
            accountId: undefined
        });
    });
    test('correctly returns the expected context when runtimeContext complete', async () => {
        const renderEffect = await runRenderOfProductContext({
            ...BASE_CLIENT_CONTEXT,
            internalValue: 'donuts'
        }, {
            ...BASE_RUNTIME_CONTEXT,
            internalRunTime: 'ignored'
        });
        expect(JSON.parse(renderEffect.aux.children[0].children[0].props.text)).toEqual({
            ...BASE_CLIENT_CONTEXT,
            accountId: BASE_RUNTIME_CONTEXT.principal.accountId,
            installContext: BASE_RUNTIME_CONTEXT.installContext
        });
    });
    test('correctly returns the expected context when all context is empty', async () => {
        const renderEffect = await runRenderOfProductContext({}, {});
        expect(JSON.parse(renderEffect.aux.children[0].children[0].props.text)).toEqual({});
    });
});
