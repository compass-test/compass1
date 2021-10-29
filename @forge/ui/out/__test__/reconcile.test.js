"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = tslib_1.__importDefault(require(".."));
const reconcile_1 = require("../reconcile");
const components_1 = require("../components");
const reconcilerState_1 = tslib_1.__importDefault(require("../reconcilerState"));
describe('reconcile', () => {
    describe('processAuxElement', () => {
        reconcilerState_1.default.currentEffect = { type: 'initialize' };
        it('should forward actionButtons onto children', async () => {
            const App = () => {
                const actionButtons = [
                    __1.default.createElement(components_1.Button, { text: "Go Back", onClick: () => { } }),
                    __1.default.createElement(components_1.Button, { text: "Cancel", onClick: () => { } })
                ];
                return (__1.default.createElement(components_1.Form, { actionButtons: actionButtons, onSubmit: () => { } },
                    __1.default.createElement(components_1.TextField, { name: "textfield", label: "textfield" })));
            };
            const fiber = await reconcile_1.processAuxElement(__1.default.createElement(App, null));
            const formFiber = fiber.children[0];
            const inlineButtons = formFiber.children
                .filter((child) => child.type === 'primitive')
                .filter((child) => child.key.includes('actionButton'));
            expect(inlineButtons).toHaveLength(2);
            expect(inlineButtons[0].element.props.text).toEqual('Go Back');
            expect(inlineButtons[1].element.props.text).toEqual('Cancel');
        });
    });
});
test('getAuxFromFiber replaces functions with Handler objects', () => {
    const result = reconcile_1.getAuxFromFiber({
        type: 'primitive',
        children: [],
        key: 'ActionButton.0',
        element: {
            type: 'ActionButton',
            key: 'ActionButton.0',
            props: {
                onClick: () => { },
                text: 'An issue action',
                children: []
            }
        }
    });
    expect(result).toEqual([
        {
            type: 'ActionButton',
            key: 'ActionButton.0',
            props: {
                onClick: { componentKey: 'ActionButton.0', prop: 'onClick' },
                text: 'An issue action'
            },
            children: []
        }
    ]);
});
