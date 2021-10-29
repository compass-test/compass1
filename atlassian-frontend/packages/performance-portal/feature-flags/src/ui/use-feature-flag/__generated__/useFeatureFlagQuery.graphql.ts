/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type useFeatureFlagQueryVariables = {};
export type useFeatureFlagQueryResponse = {
    readonly featureFlags: ReadonlyArray<{
        readonly name: string | null;
        readonly value: boolean | null;
    } | null> | null;
};
export type useFeatureFlagQuery = {
    readonly response: useFeatureFlagQueryResponse;
    readonly variables: useFeatureFlagQueryVariables;
};



/*
query useFeatureFlagQuery {
  featureFlags {
    name
    value
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "FeatureFlag",
    "kind": "LinkedField",
    "name": "featureFlags",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "value",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useFeatureFlagQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useFeatureFlagQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a17c63bd24e73a1ce0b07c3cdb983e58",
    "id": null,
    "metadata": {},
    "name": "useFeatureFlagQuery",
    "operationKind": "query",
    "text": "query useFeatureFlagQuery {\n  featureFlags {\n    name\n    value\n  }\n}\n"
  }
};
})();
(node as any).hash = '6d6662bfa46819d9813fb41ba91598f2';
export default node;
