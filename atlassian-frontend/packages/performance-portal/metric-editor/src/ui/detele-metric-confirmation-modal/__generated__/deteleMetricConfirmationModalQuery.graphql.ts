/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type deteleMetricConfirmationModalQueryVariables = {
    eventKey: string;
};
export type deteleMetricConfirmationModalQueryResponse = {
    readonly metricByEventKey: {
        readonly id: string;
        readonly name: string | null;
    } | null;
};
export type deteleMetricConfirmationModalQuery = {
    readonly response: deteleMetricConfirmationModalQueryResponse;
    readonly variables: deteleMetricConfirmationModalQueryVariables;
};



/*
query deteleMetricConfirmationModalQuery(
  $eventKey: String!
) {
  metricByEventKey(eventKey: $eventKey) {
    __typename
    id
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventKey"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "eventKey",
    "variableName": "eventKey"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "deteleMetricConfirmationModalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "metricByEventKey",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "deteleMetricConfirmationModalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "metricByEventKey",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "67823f239cbc91bba5e928e64862bd96",
    "id": null,
    "metadata": {},
    "name": "deteleMetricConfirmationModalQuery",
    "operationKind": "query",
    "text": "query deteleMetricConfirmationModalQuery(\n  $eventKey: String!\n) {\n  metricByEventKey(eventKey: $eventKey) {\n    __typename\n    id\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = '4b87218fb53b18b5abfac5d60cd7ca22';
export default node;
