/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Environment = "DEV" | "PROD" | "STAGING" | "%future added value";
export type pageLoadInitialRatioQueryVariables = {
    id: string;
    env: Environment;
    date: string;
    cohort: string;
    noCohortSelected: boolean;
};
export type pageLoadInitialRatioQueryResponse = {
    readonly metric: {
        readonly pageLoadTransitionRatio?: number | null;
    } | null;
};
export type pageLoadInitialRatioQuery = {
    readonly response: pageLoadInitialRatioQueryResponse;
    readonly variables: pageLoadInitialRatioQueryVariables;
};



/*
query pageLoadInitialRatioQuery(
  $id: ID!
  $env: Environment!
  $date: Date!
  $cohort: String!
  $noCohortSelected: Boolean!
) {
  metric(id: $id) {
    __typename
    ... on PageLoadMetric {
      pageLoadTransitionRatio(env: $env, date: $date, cohort: $cohort) @skip(if: $noCohortSelected)
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cohort"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "date"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "env"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "noCohortSelected"
},
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v6 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "condition": "noCohortSelected",
      "kind": "Condition",
      "passingValue": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Variable",
              "name": "cohort",
              "variableName": "cohort"
            },
            {
              "kind": "Variable",
              "name": "date",
              "variableName": "date"
            },
            {
              "kind": "Variable",
              "name": "env",
              "variableName": "env"
            }
          ],
          "kind": "ScalarField",
          "name": "pageLoadTransitionRatio",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "PageLoadMetric",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "pageLoadInitialRatioQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "metric",
        "plural": false,
        "selections": [
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "pageLoadInitialRatioQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "metric",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2c0d4f246c7b2680f3dca69e68550390",
    "id": null,
    "metadata": {},
    "name": "pageLoadInitialRatioQuery",
    "operationKind": "query",
    "text": "query pageLoadInitialRatioQuery(\n  $id: ID!\n  $env: Environment!\n  $date: Date!\n  $cohort: String!\n  $noCohortSelected: Boolean!\n) {\n  metric(id: $id) {\n    __typename\n    ... on PageLoadMetric {\n      pageLoadTransitionRatio(env: $env, date: $date, cohort: $cohort) @skip(if: $noCohortSelected)\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '74d7069c7d1fcb89306a1fc08ec5d0b5';
export default node;
