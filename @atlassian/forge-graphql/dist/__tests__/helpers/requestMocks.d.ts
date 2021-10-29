/// <reference types="jest" />
import { Component, GqlError, SdkError } from '../../compound-types';
import { Query, Mutation } from '../../graphql-types';
declare function mockCreateEventSource(spy: jest.SpyInstance, eventSourceId?: string, errors?: Array<SdkError>): void;
declare function mockAttachEventSource(spy: jest.SpyInstance, errors?: Array<SdkError>): void;
declare function mockCreateBaseComponent(spy: jest.SpyInstance, errors?: Array<SdkError>): void;
declare function mockUpdateDataManager(spy: jest.SpyInstance, errors?: Array<SdkError>): void;
declare function mockGetComponent(spy: jest.SpyInstance, component?: Component, success?: boolean, errors?: Array<SdkError>): void;
declare function mockCreateExternalAlias(spy: jest.SpyInstance, errors?: Array<SdkError>): void;
declare function mockDeleteComponent(spy: jest.SpyInstance, errors?: Array<string>): void;
declare function mockGetComponentByExternalAlias(spy: jest.SpyInstance, found?: boolean, component?: Component, errors?: Array<string>): void;
declare function mockRequestGraph(spy: jest.SpyInstance, errors?: Array<GqlError>, data?: Query | Mutation): void;
export { mockGetComponent, mockCreateBaseComponent, mockCreateEventSource, mockAttachEventSource, mockCreateExternalAlias, mockDeleteComponent, mockRequestGraph, mockGetComponentByExternalAlias, mockUpdateDataManager, };
