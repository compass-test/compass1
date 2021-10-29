/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BreakdownAggregation = "p50" | "p75" | "p90" | "%future added value";
export type CohortType = "ALL" | "BROWSER" | "CPU" | "ENABLED_USERS" | "ENTERPRISE" | "INSTANCE_SIZE" | "JSM_ENTERPRISE" | "MIGRATION_READINESS" | "OS" | "REGION" | "%future added value";
export type Environment = "DEV" | "PROD" | "STAGING" | "%future added value";
export type PageLoadType = "COMBINED" | "INITIAL" | "TRANSITION" | "%future added value";
export type breakdownChartsFragmentRefetchQueryVariables = {
    baseDate: string;
    breakdownAggregation: BreakdownAggregation;
    cohortType?: CohortType | null;
    comparisonDate: string;
    env: Environment;
    focusedCohort?: string | null;
    pageLoadType: PageLoadType;
    id: string;
};
export type breakdownChartsFragmentRefetchQueryResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"breakdownChartsFragment">;
    } | null;
};
export type breakdownChartsFragmentRefetchQuery = {
    readonly response: breakdownChartsFragmentRefetchQueryResponse;
    readonly variables: breakdownChartsFragmentRefetchQueryVariables;
};



/*
query breakdownChartsFragmentRefetchQuery(
  $baseDate: Date!
  $breakdownAggregation: BreakdownAggregation!
  $cohortType: CohortType
  $comparisonDate: Date!
  $env: Environment!
  $focusedCohort: String
  $pageLoadType: PageLoadType!
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...breakdownChartsFragment
    id
  }
}

fragment breakdownChartsFragment on PageLoadMetric {
  baseBreakdown: breakdown(env: $env, date: $baseDate, aggregation: $breakdownAggregation, pageLoadType: $pageLoadType, cohortType: $cohortType, cohortValue: $focusedCohort) {
    timings {
      app {
        name
        startTime
        duration
        count
        aggregatedAt
      }
      metric {
        name
        startTime
        duration
        count
        aggregatedAt
      }
    }
  }
  comparisonBreakdown: breakdown(env: $env, date: $comparisonDate, aggregation: $breakdownAggregation, pageLoadType: $pageLoadType, cohortType: $cohortType, cohortValue: $focusedCohort) {
    timings {
      app {
        name
        startTime
        duration
        count
        aggregatedAt
      }
      metric {
        name
        startTime
        duration
        count
        aggregatedAt
      }
    }
  }
  id
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "baseDate"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "breakdownAggregation"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cohortType"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "comparisonDate"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "env"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "focusedCohort"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pageLoadType"
},
v8 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v9 = {
  "kind": "Variable",
  "name": "aggregation",
  "variableName": "breakdownAggregation"
},
v10 = {
  "kind": "Variable",
  "name": "cohortType",
  "variableName": "cohortType"
},
v11 = {
  "kind": "Variable",
  "name": "cohortValue",
  "variableName": "focusedCohort"
},
v12 = {
  "kind": "Variable",
  "name": "env",
  "variableName": "env"
},
v13 = {
  "kind": "Variable",
  "name": "pageLoadType",
  "variableName": "pageLoadType"
},
v14 = [
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
    "name": "startTime",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "duration",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "count",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "aggregatedAt",
    "storageKey": null
  }
],
v15 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PageLoadBreakdownTimings",
    "kind": "LinkedField",
    "name": "timings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "BrowserMetricBreakdownTimingDetail",
        "kind": "LinkedField",
        "name": "app",
        "plural": true,
        "selections": (v14/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "BrowserMetricBreakdownTimingDetail",
        "kind": "LinkedField",
        "name": "metric",
        "plural": true,
        "selections": (v14/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "breakdownChartsFragmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "breakdownChartsFragment"
          }
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
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v7/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Operation",
    "name": "breakdownChartsFragmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
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
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": "baseBreakdown",
                "args": [
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  {
                    "kind": "Variable",
                    "name": "date",
                    "variableName": "baseDate"
                  },
                  (v12/*: any*/),
                  (v13/*: any*/)
                ],
                "concreteType": "PageLoadBreakdownResult",
                "kind": "LinkedField",
                "name": "breakdown",
                "plural": false,
                "selections": (v15/*: any*/),
                "storageKey": null
              },
              {
                "alias": "comparisonBreakdown",
                "args": [
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  {
                    "kind": "Variable",
                    "name": "date",
                    "variableName": "comparisonDate"
                  },
                  (v12/*: any*/),
                  (v13/*: any*/)
                ],
                "concreteType": "PageLoadBreakdownResult",
                "kind": "LinkedField",
                "name": "breakdown",
                "plural": false,
                "selections": (v15/*: any*/),
                "storageKey": null
              }
            ],
            "type": "PageLoadMetric",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5de8b47ab372d5ce15c7bce34702c3c2",
    "id": null,
    "metadata": {},
    "name": "breakdownChartsFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query breakdownChartsFragmentRefetchQuery(\n  $baseDate: Date!\n  $breakdownAggregation: BreakdownAggregation!\n  $cohortType: CohortType\n  $comparisonDate: Date!\n  $env: Environment!\n  $focusedCohort: String\n  $pageLoadType: PageLoadType!\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...breakdownChartsFragment\n    id\n  }\n}\n\nfragment breakdownChartsFragment on PageLoadMetric {\n  baseBreakdown: breakdown(env: $env, date: $baseDate, aggregation: $breakdownAggregation, pageLoadType: $pageLoadType, cohortType: $cohortType, cohortValue: $focusedCohort) {\n    timings {\n      app {\n        name\n        startTime\n        duration\n        count\n        aggregatedAt\n      }\n      metric {\n        name\n        startTime\n        duration\n        count\n        aggregatedAt\n      }\n    }\n  }\n  comparisonBreakdown: breakdown(env: $env, date: $comparisonDate, aggregation: $breakdownAggregation, pageLoadType: $pageLoadType, cohortType: $cohortType, cohortValue: $focusedCohort) {\n    timings {\n      app {\n        name\n        startTime\n        duration\n        count\n        aggregatedAt\n      }\n      metric {\n        name\n        startTime\n        duration\n        count\n        aggregatedAt\n      }\n    }\n  }\n  id\n}\n"
  }
};
})();
(node as any).hash = 'd00cf19c00a3b3be76ac335a15325e17';
export default node;
