"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../hooks/utils");
const NON_SERIALIZABLE_VALUES = [
    ['function', () => { }],
    ['bigint', BigInt(12312312312132)],
    ['symbol', Symbol('description')]
];
describe('isSerializable', () => {
    describe('primitive types', () => {
        test.each([
            ['boolean', true],
            ['number', 100],
            ['string', 'some value']
        ])('should serialize value of %s type', (_, value) => {
            expect(utils_1.isSerializable(value)).toBe(true);
        });
    });
    describe('nullable types', () => {
        test.each([
            ['null', null],
            ['undefined', undefined]
        ])('should serialize value of %s type', (_, value) => {
            expect(utils_1.isSerializable(value)).toBe(true);
        });
    });
    describe('not serializable', () => {
        test.each(NON_SERIALIZABLE_VALUES)('should mot serialize value of %s type', (_, value) => {
            expect(utils_1.isSerializable(value)).toBe(false);
        });
    });
    describe('serialize objects', () => {
        const serializableObject = Object.freeze({
            string: 'some value',
            number: 200,
            switch: false
        });
        test('should serialize object with primitive types as fields', () => {
            const value = { ...serializableObject };
            expect(utils_1.isSerializable(value)).toBe(true);
        });
        test.each(NON_SERIALIZABLE_VALUES)('should not serialize object with at least one non serializable field of type %s', (type, fieldValue) => {
            const value = {
                ...serializableObject,
                [type]: fieldValue
            };
            expect(utils_1.isSerializable(value)).toBe(false);
        });
        test.each(NON_SERIALIZABLE_VALUES)('should not serialize object with at least one non serializable nested field of type %s', (type, fieldValue) => {
            const value = {
                ...serializableObject,
                nestedObject: {
                    anotherNestedObject: {
                        [type]: fieldValue
                    }
                }
            };
            expect(utils_1.isSerializable(value)).toBe(false);
        });
    });
});
