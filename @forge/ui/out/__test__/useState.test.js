"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const useState_1 = require("../hooks/useState");
const useActionModule = tslib_1.__importStar(require("../hooks/useAction"));
const useActionMock = jest.fn();
describe('useState', () => {
    beforeAll(() => {
        const mock = jest.spyOn(useActionModule, 'useAction');
        mock.mockImplementation(useActionMock);
    });
    beforeEach(() => useActionMock.mockClear());
    it('calls useAction with the correct arguments', () => {
        useState_1.useState(1);
        const call = useActionMock.mock.calls[0];
        expect(call[0]).toBeInstanceOf(Function);
        expect(call[0].toString()).toContain('(_, payload) => ');
        expect(call[1]).toBe(1);
    });
});
