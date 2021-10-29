/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Environment = "DEV" | "PROD" | "STAGING" | "%future added value";
export type PageLoadType = "COMBINED" | "INITIAL" | "TRANSITION" | "%future added value";
export type toplineQueryVariables = {
    id: string;
    env: Environment;
    dateFrom: string;
    dateTo: string;
    percentile: number;
    pageLoadType?: PageLoadType | null;
    metric: string;
    cohortType: string;
};
export type toplineQueryResponse = {
    readonly experience: {
        readonly __typename: string;
        readonly id: string;
        readonly hotEvents: ReadonlyArray<{
            readonly issueId: string | null;
            readonly name: string | null;
            readonly startAt: string | null;
            readonly endAt: string | null;
        }> | null;
        readonly dailyToplineTrend: ReadonlyArray<{
            readonly env: Environment;
            readonly percentile: number;
            readonly pageLoadType: PageLoadType | null;
            readonly metric: string;
            readonly cohortType: string;
            readonly cohortValue: string;
            readonly data: ReadonlyArray<{
                readonly day: string;
                readonly value: number;
                readonly count: number;
                readonly aggregatedAt: string | null;
                readonly overrideAt: string | null;
                readonly overrideSourceName: string | null;
            }>;
            readonly goals: ReadonlyArray<{
                readonly id: string;
                readonly name: string;
                readonly value: number;
            }>;
        }>;
    } | null;
};
export type toplineQuery = {
    readonly response: toplineQueryResponse;
    readonly variables: toplineQueryVariables;
};



/*
query toplineQuery(
  $id: ID!
  $env: Environment!
  $dateFrom: Date!
  $dateTo: Date!
  $percentile: Int!
  $pageLoadType: PageLoadType
  $metric: String!
  $cohortType: String!
) {
  experience(experienceId: $id) {
    __typename
    id
    hotEvents(from: $dateFrom, to: $dateTo) {
      issueId
      name
      startAt
      endAt
      id
    }
    dailyToplineTrend(env: $env, dateFrom: $dateFrom, dateTo: $dateTo, percentile: $percentile, pageLoadType: $pageLoadType, metric: $metric, cohortType: $cohortType) {
      env
      percentile
      pageLoadType
      metric
      cohortType
      cohortValue
      data {
        day
        value
        count
        aggregatedAt
        overrideAt
        overrideSourceName
      }
      goals {
        id
        name
        value
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cohortType"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "dateFrom"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "dateTo"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "env"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "metric"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pageLoadType"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "percentile"
},
v8 = [
  {
    "kind": "Variable",
    "name": "experienceId",
    "variableName": "id"
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = [
  {
    "kind": "Variable",
    "name": "from",
    "variableName": "dateFrom"
  },
  {
    "kind": "Variable",
    "name": "to",
    "variableName": "dateTo"
  }
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "issueId",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "cohortType",
      "variableName": "cohortType"
    },
    {
      "kind": "Variable",
      "name": "dateFrom",
      "variableName": "dateFrom"
    },
    {
      "kind": "Variable",
      "name": "dateTo",
      "variableName": "dateTo"
    },
    {
      "kind": "Variable",
      "name": "env",
      "variableName": "env"
    },
    {
      "kind": "Variable",
      "name": "metric",
      "variableName": "metric"
    },
    {
      "kind": "Variable",
      "name": "pageLoadType",
      "variableName": "pageLoadType"
    },
    {
      "kind": "Variable",
      "name": "percentile",
      "variableName": "percentile"
    }
  ],
  "concreteType": "DailyToplineTrendSeries",
  "kind": "LinkedField",
  "name": "dailyToplineTrend",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "env",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "percentile",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pageLoadType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "metric",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cohortType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cohortValue",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "DailyToplineTrendSeriesData",
      "kind": "LinkedField",
      "name": "data",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "day",
          "storageKey": null
        },
        (v16/*: any*/),
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "overrideAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "overrideSourceName",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ExperienceToplineGoal",
      "kind": "LinkedField",
      "name": "goals",
      "plural": true,
      "selections": [
        (v10/*: any*/),
        (v13/*: any*/),
        (v16/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
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
    "name": "toplineQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": "Experience",
        "kind": "LinkedField",
        "name": "experience",
        "plural": false,
        "selections": [
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "alias": null,
            "args": (v11/*: any*/),
            "concreteType": "HotEvent",
            "kind": "LinkedField",
            "name": "hotEvents",
            "plural": true,
            "selections": [
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/)
            ],
            "storageKey": null
          },
          (v17/*: any*/)
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
      (v4/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v7/*: any*/),
      (v6/*: any*/),
      (v5/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "toplineQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": "Experience",
        "kind": "LinkedField",
        "name": "experience",
        "plural": false,
        "selections": [
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "alias": null,
            "args": (v11/*: any*/),
            "concreteType": "HotEvent",
            "kind": "LinkedField",
            "name": "hotEvents",
            "plural": true,
            "selections": [
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v10/*: any*/)
            ],
            "storageKey": null
          },
          (v17/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a9cbef41c5fe60b536e27cdcf6571bbf",
    "id": null,
    "metadata": {},
    "name": "toplineQuery",
    "operationKind": "query",
    "text": "query toplineQuery(\n  $id: ID!\n  $env: Environment!\n  $dateFrom: Date!\n  $dateTo: Date!\n  $percentile: Int!\n  $pageLoadType: PageLoadType\n  $metric: String!\n  $cohortType: String!\n) {\n  experience(experienceId: $id) {\n    __typename\n    id\n    hotEvents(from: $dateFrom, to: $dateTo) {\n      issueId\n      name\n      startAt\n      endAt\n      id\n    }\n    dailyToplineTrend(env: $env, dateFrom: $dateFrom, dateTo: $dateTo, percentile: $percentile, pageLoadType: $pageLoadType, metric: $metric, cohortType: $cohortType) {\n      env\n      percentile\n      pageLoadType\n      metric\n      cohortType\n      cohortValue\n      data {\n        day\n        value\n        count\n        aggregatedAt\n        overrideAt\n        overrideSourceName\n      }\n      goals {\n        id\n        name\n        value\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b983e71e55c39fdcfd6a8f1553cef07c';
export default node;
