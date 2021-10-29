"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const global_storage_1 = require("../global-storage");
const queries_1 = require("../queries");
const contextAri = 'app-ari';
const getStorage = (apiClientMock) => new global_storage_1.GlobalStorage(() => contextAri, apiClientMock);
const getApiClientMock = (response, statusCode = 200) => {
    return jest.fn().mockReturnValue({
        ok: statusCode === 200,
        status: statusCode,
        text: jest.fn().mockResolvedValue(JSON.stringify(response))
    });
};
const getApiClientMockInvalidJson = (response, statusCode = 200) => {
    return jest.fn().mockReturnValue({
        ok: statusCode === 200,
        status: statusCode,
        text: jest.fn().mockResolvedValue(response)
    });
};
const INVALID_CURSOR_ERROR = {
    message: 'error message',
    extensions: {
        errorType: 'INVALID_CURSOR'
    }
};
describe('GlobalStorage', () => {
    function verifyApiClientCalledWith(apiClientMock, variables, query) {
        expect(apiClientMock).toHaveBeenCalledWith('/forge/entities/graphql', expect.objectContaining({
            method: 'POST',
            body: expect.any(String),
            headers: {
                'content-type': 'application/json'
            }
        }));
        const [, { body }] = apiClientMock.mock.calls[0];
        const expectedBody = query ? { query, variables } : { variables };
        expect(JSON.parse(body)).toEqual(expect.objectContaining(expectedBody));
    }
    beforeEach(() => {
        global.api = {
            __getAppAri: jest.fn().mockReturnValue(contextAri)
        };
    });
    describe('get', () => {
        it('should call the storage API, passing the provided key and returning the stored value', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStoredEntity: {
                        value: 'testValue'
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            const returnedValue = await globalStorage.get('testKey');
            verifyApiClientCalledWith(apiClientMock, {
                contextAri,
                key: 'testKey',
                encrypted: false
            });
            expect(returnedValue).toEqual('testValue');
        });
        it('should call the storage API, passing the provided key and returning undefined if the key doesnt exist', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStoredEntity: {
                        value: null
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            const returnedValue = await globalStorage.get('testKey');
            verifyApiClientCalledWith(apiClientMock, {
                contextAri,
                key: 'testKey',
                encrypted: false
            });
            expect(returnedValue).toEqual(undefined);
        });
        it('should call the storage API, passing the provided key and returning the stored falsey value 0', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStoredEntity: {
                        value: 0
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            const returnedValue = await globalStorage.get('testKey');
            verifyApiClientCalledWith(apiClientMock, {
                contextAri,
                key: 'testKey',
                encrypted: false
            });
            expect(returnedValue).toEqual(0);
        });
        it('should call the storage API, passing the provided key and returning the stored empty string', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStoredEntity: {
                        value: ''
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            const returnedValue = await globalStorage.get('testKey');
            verifyApiClientCalledWith(apiClientMock, {
                contextAri,
                key: 'testKey',
                encrypted: false
            });
            expect(returnedValue).toEqual('');
        });
        it('should throw an error with the returned status for non-200 status codes', async () => {
            const apiClientMock = getApiClientMock(undefined, 400);
            const globalStorage = getStorage(apiClientMock);
            const response = globalStorage.get('testKey');
            expect(apiClientMock).toHaveBeenCalled();
            await expect(response).rejects.toThrow(errors_1.APIError.forStatus(400));
        });
        it('should throw an error with the returned error message for failed responses', async () => {
            const apiClientMock = getApiClientMock({
                errors: [INVALID_CURSOR_ERROR]
            }, 200);
            const globalStorage = getStorage(apiClientMock);
            const response = globalStorage.get('testKey');
            expect(apiClientMock).toHaveBeenCalled();
            await expect(response).rejects.toThrow(errors_1.APIError.forErrorCode('CURSOR_INVALID', 'error message'));
        });
        it('should throw an error if the storage API returns a non 200 status code', async () => {
            const apiClientMock = getApiClientMock(undefined, 400);
            const globalStorage = getStorage(apiClientMock);
            const response = globalStorage.get('testKey');
            expect(apiClientMock).toHaveBeenCalled();
            await expect(response).rejects.toThrow(errors_1.APIError.forStatus(400));
        });
        it('should throw an error if the response is not a valid JSON', async () => {
            const apiClientMock = getApiClientMockInvalidJson('test', 200);
            const globalStorage = getStorage(apiClientMock);
            const response = globalStorage.get('testKey');
            expect(apiClientMock).toHaveBeenCalled();
            await expect(response).rejects.toThrow(errors_1.APIError.forUnexpected('Response text was not a valid JSON: test'));
        });
    });
    describe('get secret', () => {
        it('should call the storage API, passing the provided key and returning the stored value', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStoredEntity: {
                        value: 'testValue'
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            const returnedValue = await globalStorage.getSecret('testKey');
            verifyApiClientCalledWith(apiClientMock, {
                contextAri,
                key: 'testKey',
                encrypted: true
            });
            expect(returnedValue).toEqual('testValue');
        });
    });
    describe('set', () => {
        it('should call the storage API, passing the provided key and value', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStorage: {
                        setAppStoredEntity: {
                            success: true
                        }
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            await globalStorage.set('testKey', 'testValue');
            verifyApiClientCalledWith(apiClientMock, {
                input: {
                    contextAri,
                    key: 'testKey',
                    value: 'testValue',
                    encrypted: false
                }
            });
        });
        it('should throw an error if the storage API returns successful = false', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStorage: {
                        setAppStoredEntity: {
                            success: false,
                            errors: [INVALID_CURSOR_ERROR]
                        }
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            const response = globalStorage.set('testKey', 'testValue');
            expect(apiClientMock).toHaveBeenCalled();
            await expect(response).rejects.toThrow(errors_1.APIError.forErrorCode('INVALID_CURSOR', 'error message'));
        });
        it('should throw an error if the storage API returns a non 200 status code', async () => {
            const apiClientMock = getApiClientMockInvalidJson('', 400);
            const globalStorage = getStorage(apiClientMock);
            const response = globalStorage.set('testKey', 'testValue');
            expect(apiClientMock).toHaveBeenCalled();
            await expect(response).rejects.toThrow(errors_1.APIError.forStatus(400));
        });
        it('should throw a 500 error if success=false but no errors were returned', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStorage: {
                        setAppStoredEntity: {
                            success: false
                        }
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            await expect(globalStorage.set('testKey', 'testValue')).rejects.toThrow(errors_1.APIError.forStatus(500));
            verifyApiClientCalledWith(apiClientMock, {
                input: {
                    contextAri,
                    key: 'testKey',
                    value: 'testValue',
                    encrypted: false
                }
            });
        });
    });
    describe('set secret', () => {
        it('should call the storage API, passing the provided key and value', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStorage: {
                        setAppStoredEntity: {
                            success: true
                        }
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            await globalStorage.setSecret('testKey', 'testValue');
            verifyApiClientCalledWith(apiClientMock, {
                input: {
                    contextAri,
                    key: 'testKey',
                    value: 'testValue',
                    encrypted: true
                }
            });
        });
    });
    describe('delete', () => {
        it('should call the storage API, passing the provided key', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStorage: {
                        deleteAppStoredEntity: {
                            success: true
                        }
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            await globalStorage.delete('testKey');
            verifyApiClientCalledWith(apiClientMock, {
                input: {
                    contextAri,
                    key: 'testKey',
                    encrypted: false
                }
            });
        });
        it('should throw an error if the storage API returns successful = false', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStorage: {
                        deleteAppStoredEntity: {
                            success: false,
                            errors: [INVALID_CURSOR_ERROR]
                        }
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            const response = globalStorage.delete('testKey');
            expect(apiClientMock).toHaveBeenCalled();
            await expect(response).rejects.toThrow(errors_1.APIError.forErrorCode('CURSOR_INVALID', 'error message'));
        });
        it('should throw an error if the storage API returns a non 200 status code and has no body', async () => {
            const apiClientMock = getApiClientMockInvalidJson('', 400);
            const globalStorage = getStorage(apiClientMock);
            const response = globalStorage.delete('testKey');
            expect(apiClientMock).toHaveBeenCalled();
            await expect(response).rejects.toThrow(errors_1.APIError.forStatus(400));
        });
    });
    describe('delete secret', () => {
        it('should call the storage API, passing the provided key', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStorage: {
                        deleteAppStoredEntity: {
                            success: true
                        }
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            await globalStorage.deleteSecret('testKey');
            verifyApiClientCalledWith(apiClientMock, {
                input: {
                    contextAri,
                    key: 'testKey',
                    encrypted: true
                }
            });
        });
    });
    describe('list', () => {
        it('should call the storage API with the provided parameters', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStoredEntities: {
                        edges: [
                            { node: { key: 'key1', value: 'testValue' }, cursor: 'cursor1' },
                            { node: { key: 'key2', value: 'testValue' }, cursor: 'cursor2' }
                        ]
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            const where = [
                {
                    field: 'key',
                    condition: 'STARTS_WITH',
                    value: 'test'
                }
            ];
            const cursor = 'cursor';
            const limit = 10;
            const response = await globalStorage.list({ where, cursor, limit });
            verifyApiClientCalledWith(apiClientMock, {
                contextAri,
                where,
                cursor,
                limit
            }, queries_1.listQuery(contextAri, {}).query);
            expect(response).toEqual(expect.objectContaining({
                results: [
                    { key: 'key1', value: 'testValue' },
                    { key: 'key2', value: 'testValue' }
                ],
                nextCursor: 'cursor2'
            }));
        });
        it('should query the appStoredEntitiesForCleanup endpoint given process.env.IS_CLEANUP_FUNCTION is set to true', async () => {
            process.env.IS_CLEANUP_FUNCTION = 'true';
            const apiClientMock = getApiClientMock({
                data: {
                    appStoredEntitiesForCleanup: {
                        edges: [
                            { node: { key: 'key1', value: 'testValue' }, cursor: 'cursor1' },
                            { node: { key: 'key2', value: 'testValue' }, cursor: 'cursor2' }
                        ]
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            const where = [
                {
                    field: 'key',
                    condition: 'STARTS_WITH',
                    value: 'test'
                }
            ];
            const cursor = 'cursor';
            const limit = 10;
            const response = await globalStorage.list({ where, cursor, limit });
            verifyApiClientCalledWith(apiClientMock, {
                contextAri,
                where,
                cursor,
                limit
            }, queries_1.listQueryForCleanup(contextAri, {}).query);
            expect(response).toEqual(expect.objectContaining({
                results: [
                    { key: 'key1', value: 'testValue' },
                    { key: 'key2', value: 'testValue' }
                ],
                nextCursor: 'cursor2'
            }));
            process.env.IS_CLEANUP_FUNCTION = '';
        });
        it('should use default values', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStoredEntities: {
                        edges: []
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            await globalStorage.list({});
            verifyApiClientCalledWith(apiClientMock, {
                contextAri,
                where: null,
                cursor: null,
                limit: null
            }, queries_1.listQuery(contextAri, {}).query);
        });
        it('should handle an empty result set', async () => {
            const apiClientMock = getApiClientMock({
                data: {
                    appStoredEntities: {
                        edges: []
                    }
                }
            });
            const globalStorage = getStorage(apiClientMock);
            const where = [
                {
                    field: 'key',
                    condition: 'STARTS_WITH',
                    value: 'test'
                }
            ];
            const response = await globalStorage.list({ where });
            expect(response).toEqual(expect.objectContaining({
                results: [],
                nextCursor: undefined
            }));
        });
        it('should throw an error if the storage API returns an error', async () => {
            const apiClientMock = getApiClientMock({
                errors: [INVALID_CURSOR_ERROR]
            });
            const globalStorage = getStorage(apiClientMock);
            const response = globalStorage.list({});
            expect(apiClientMock).toHaveBeenCalled();
            await expect(response).rejects.toThrow(errors_1.APIError.forErrorCode('CURSOR_INVALID', 'error message'));
        });
        it('should throw an error if the storage API returns a non 200 status code and has no body', async () => {
            const apiClientMock = getApiClientMockInvalidJson('', 400);
            const globalStorage = getStorage(apiClientMock);
            const response = globalStorage.list({});
            expect(apiClientMock).toHaveBeenCalled();
            await expect(response).rejects.toThrow(errors_1.APIError.forStatus(400));
        });
    });
});
