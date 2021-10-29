/* eslint-disable */
/* prettier-ignore */

// original TypeScript implementation
import {
  CrossFlowExtensions,
  CrossFlowExtensionsOptions,
  JSONValue,
  PluginCollection,
} from '../src';

// converted from Flow declarations
import {
  CrossFlowExtensions as flow_CrossFlowExtensions,
  CrossFlowExtensionsOptions as flow_CrossFlowExtensionsOptions,
  JSONValue as flow_JSONValue,
  PluginCollection as flow_PluginCollection,
} from './generated-index';

// let tsc check compatibility in both directions TS <-> Flow
export const assertCrossFlowExtensions: typeof CrossFlowExtensions = {} as typeof flow_CrossFlowExtensions;
export const assertCrossFlowExtensions_rev: typeof flow_CrossFlowExtensions = {} as typeof CrossFlowExtensions;

export const assertCrossFlowExtensionsOptions: CrossFlowExtensionsOptions = {} as flow_CrossFlowExtensionsOptions;
export const assertCrossFlowExtensionsOptions_rev: flow_CrossFlowExtensionsOptions = {} as CrossFlowExtensionsOptions;

export const assertJSONValue: JSONValue = {} as flow_JSONValue;
export const assertJSONValue_rev: flow_JSONValue = {} as JSONValue;

export const assertPluginCollection: PluginCollection = {} as flow_PluginCollection;
export const assertPluginCollection_rev: flow_PluginCollection = {} as PluginCollection;
