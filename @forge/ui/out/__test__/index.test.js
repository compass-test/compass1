"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = tslib_1.__importStar(require("../"));
test('given an InitializeEffect return a RenderEffect', async () => {
    const MyComponent = (props) => {
        return __1.default.createElement(__1.Text, null, props.text);
    };
    const App = () => (__1.default.createElement(__1.Fragment, null,
        __1.default.createElement(__1.Table, null,
            __1.default.createElement(__1.Head, null,
                __1.default.createElement(__1.Cell, null,
                    __1.default.createElement(__1.Text, null, "Heading 1"))),
            __1.default.createElement(__1.Row, null,
                __1.default.createElement(__1.Cell, null,
                    __1.default.createElement(__1.Text, null, "row 1"))),
            __1.default.createElement(__1.Row, null,
                __1.default.createElement(__1.Cell, null,
                    __1.default.createElement(MyComponent, { text: "row2" })))),
        __1.default.createElement(__1.Text, null, "Hello world!")));
    const fn = __1.render(__1.default.createElement(__1.Macro, { app: __1.default.createElement(App, null) }));
    const response = await fn({
        context: {},
        state: {},
        effects: [{ type: 'initialize' }]
    }, {});
    expect(response).toMatchSnapshot();
});
test('it leaves ModalDialog onClose undefined if not provided', async () => {
    const App = () => (__1.default.createElement(__1.ModalDialog, null));
    const fn = __1.render(__1.default.createElement(App, null));
    const [renderEffect] = await fn({
        context: {},
        state: {},
        effects: [{ type: 'initialize' }]
    }, {});
    expect(renderEffect.aux.children[0].props.onClose).toBe(undefined);
});
test('it defines ModalDialog onClose if provided', async () => {
    const App = () => (__1.default.createElement(__1.ModalDialog, { header: "Hello Modal", onClose: () => undefined },
        __1.default.createElement(__1.Text, null, "Hello from the Modal inside")));
    const fn = __1.render(__1.default.createElement(App, null));
    const [renderEffect] = await fn({
        context: {},
        state: {},
        effects: [{ type: 'initialize' }]
    }, {});
    expect(renderEffect.aux.children[0].props.onClose).toEqual({
        componentKey: 'ModalDialog.0',
        prop: 'onClose'
    });
});
test('it is typesafe to render boolean, null or undefined, but they will not be contained in the AUX', async () => {
    const App = () => (__1.default.createElement(__1.Fragment, null,
        null,
        undefined,
        false,
        true));
    const fn = __1.render(__1.default.createElement(App, null));
    const response = await fn({
        context: {},
        state: {},
        effects: [{ type: 'initialize' }]
    }, {});
    expect(response[0].aux).toEqual({
        type: 'View',
        children: []
    });
});
test('empty arrays and falsy values (except numbers) are filtered out of AUX children by the JSX pragma', () => {
    const App = () => (__1.default.createElement(__1.Fragment, null,
        '',
        undefined,
        null,
        [],
        __1.default.createElement(__1.Text, null,
            0,
            NaN),
        false));
    expect(App().props.children).toEqual([
        {
            type: 'Text',
            key: null,
            props: {
                children: [0, NaN]
            }
        }
    ]);
});
test('should throw error on user thrown error', async () => {
    const appError = new Error();
    const App = () => {
        throw appError;
    };
    const fn = __1.render(__1.default.createElement(App, null));
    return expect(fn({
        context: {},
        state: {},
        effects: [{ type: 'initialize' }]
    }, {})).rejects.toBe(appError);
});
test('unknown primitive component renders as an unknown component', async () => {
    const App = () => {
        return __1.default.createElement('UnknownComponent', { children: [] });
    };
    const fn = __1.render(__1.default.createElement(App, null));
    const response = await fn({
        context: {},
        state: {},
        effects: [{ type: 'initialize' }]
    }, {});
    expect(response).toMatchSnapshot();
});
test('Attempting to render arrays throw a user-friendly error', async () => {
    const App = () => {
        return [[[__1.default.createElement(__1.Text, null, "Hey")]]];
    };
    const fn = __1.render(__1.default.createElement(App, null));
    return expect(fn({
        context: {},
        state: {},
        effects: [{ type: 'initialize' }]
    }, {})).rejects.toThrowError('Unexpected child type: Array. Valid children are @forge/ui components, function components, and strings.\nError occurred in App.');
});
test('Attempting to render non-component objects throw a user-friendly error', async () => {
    const App = () => {
        return { component: 'Text' };
    };
    const fn = __1.render(__1.default.createElement(App, null));
    return expect(fn({
        context: {},
        state: {},
        effects: [{ type: 'initialize' }]
    }, {})).rejects.toThrowError('Unexpected child type: object. Valid children are @forge/ui components, function components, and strings.\nError occurred in App.');
});
test('Attempting to render numbers converts it to a string', async () => {
    const App = () => {
        return (__1.default.createElement(__1.Fragment, null,
            __1.default.createElement(__1.Form, { onSubmit: () => { } },
                __1.default.createElement(__1.Text, null,
                    0,
                    NaN,
                    100))));
    };
    const fn = __1.render(__1.default.createElement(App, null));
    const response = await fn({
        context: {},
        state: {},
        effects: [{ type: 'initialize' }]
    }, {});
    expect(response).toMatchSnapshot();
});
test('Attempting to render an array within Text throws a user-friendly error', async () => {
    const MyCustomComponent = (props) => (__1.default.createElement(__1.Fragment, null,
        __1.default.createElement(__1.Text, null, props.greeting)));
    const App = () => {
        return (__1.default.createElement(__1.Fragment, null,
            __1.default.createElement(__1.Form, { onSubmit: () => { } },
                __1.default.createElement(MyCustomComponent, { greeting: [['My greeting is here', 'I should have extracted it', 'This is a haiku']] }))));
    };
    const fn = __1.render(__1.default.createElement(App, null));
    return expect(fn({
        context: {},
        state: {},
        effects: [{ type: 'initialize' }]
    }, {})).rejects.toThrowError('Unexpected child type: Array. Valid children are @forge/ui components, function components, and strings.\nError occurred in Text:\n\tin Fragment\n\tin MyCustomComponent\n\tin Form\n\tin Fragment\n\tin App');
});
test('Rendering an invalid top-level app should throw a user-friendly error', () => {
    const fn = __1.render({});
    return expect(fn({
        context: {},
        state: {},
        effects: [{ type: 'initialize' }]
    }, {})).rejects.toThrow('Unexpected child type: object. Valid children are @forge/ui components, function components, and strings.\nError occurred in render.');
});
test('Rendering an empty text should not throw an error', async () => {
    const App = () => {
        return __1.default.createElement(__1.Text, null);
    };
    const fn = __1.render(__1.default.createElement(App, null));
    const response = await fn({
        context: {},
        state: {},
        effects: [{ type: 'initialize' }]
    }, {});
    expect(response).toMatchSnapshot();
});
