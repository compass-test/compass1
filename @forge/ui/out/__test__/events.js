"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = tslib_1.__importStar(require("../"));
describe('Events', () => {
    test('when rendering a Button with an onClick, it renders a Handler prop', async () => {
        const fn = __1.render(__1.default.createElement(__1.Button, { text: "", onClick: () => { } }));
        const [renderEffect] = await fn({
            context: {},
            state: {},
            effects: [{ type: 'initialize' }]
        }, {});
        expect(renderEffect.aux.children[0].props.onClick).toEqual({
            componentKey: 'Button.0',
            prop: 'onClick'
        });
    });
    test('when an event effect is received, it executes the handler with the event args', async () => {
        const mockOnClick = jest.fn();
        const fn = __1.render(__1.default.createElement(__1.Button, { text: "", onClick: async (...args) => mockOnClick(...args) }));
        await fn({
            context: {},
            state: {},
            effects: [
                {
                    type: 'event',
                    handler: { componentKey: 'Button.0', prop: 'onClick' },
                    args: [1, 2]
                }
            ]
        }, {});
        expect(mockOnClick).toHaveBeenCalledWith(1, 2);
    });
});
