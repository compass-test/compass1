/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BreakdownAggregation = "p50" | "p75" | "p90" | "%future added value";
export type BrowserMetricEventType = "CUSTOM" | "INLINE_RESULT" | "PAGE_LOAD" | "PAGE_SEGMENT_LOAD" | "WEB_VITALS" | "%future added value";
export type CohortType = "ALL" | "BROWSER" | "CPU" | "ENABLED_USERS" | "ENTERPRISE" | "INSTANCE_SIZE" | "JSM_ENTERPRISE" | "MIGRATION_READINESS" | "OS" | "REGION" | "%future added value";
export type Environment = "DEV" | "PROD" | "STAGING" | "%future added value";
export type PageLoadType = "COMBINED" | "INITIAL" | "TRANSITION" | "%future added value";
export type Product = "ADMIN" | "COMPASS" | "CONFLUENCE" | "DAC" | "JIRA" | "OPSGENIE" | "PERFORMANCE_PORTAL" | "WATERMELON" | "%future added value";
export type metricPageQueryVariables = {
    eventKey: string;
    env: Environment;
    baseDate: string;
    comparisonDate: string;
    breakdownAggregation: BreakdownAggregation;
    pageLoadType: PageLoadType;
    cohortType?: CohortType | null;
    focusedCohort?: string | null;
};
export type metricPageQueryResponse = {
    readonly metricByEventKey: {
        readonly __typename: string;
        readonly id: string;
        readonly name: string | null;
        readonly product: Product | null;
        readonly key: string | null;
        readonly owner: ({
            readonly __typename: "Staff";
            readonly id: string;
            readonly fullName: string | null;
        } | {
            readonly __typename: "Team";
            readonly id: string;
            readonly teamName: string | null;
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        }) | null;
        readonly slackChannel: string | null;
        readonly eventType?: BrowserMetricEventType | null;
        readonly eventKey?: string | null;
        readonly " $fragmentRefs": FragmentRefs<"metricFragment">;
    } | null;
};
export type metricPageQuery = {
    readonly response: metricPageQueryResponse;
    readonly variables: metricPageQueryVariables;
};



/*
query metricPageQuery(
  $eventKey: String!
  $env: Environment!
  $baseDate: Date!
  $comparisonDate: Date!
  $breakdownAggregation: BreakdownAggregation!
  $pageLoadType: PageLoadType!
  $cohortType: CohortType
  $focusedCohort: String
) {
  metricByEventKey(eventKey: $eventKey) {
    __typename
    id
    name
    product
    key
    owner {
      __typename
      ... on Staff {
        id
        fullName
      }
      ... on Team {
        id
        teamName
      }
      id
    }
    slackChannel
    ... on BrowserMetric {
      __isBrowserMetric: __typename
      eventType
      eventKey
    }
    ...metricFragment
  }
}

fragment actionsMetricPageHeaderFragment on Metric {
  __isMetric: __typename
  owner {
    __typename
    ...ownerTeamHeaderFragment
    id
  }
  ...slackChannelHeaderFragment
  ...configureMenuHeaderFragment
  ...tomeFragment
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

fragment breakdownMetric_breakdownCharts on PageLoadMetric {
  ...breakdownChartsFragment
}

fragment breakdownMetric_metric on Metric {
  __isMetric: __typename
  __typename
}

fragment configureMenuHeaderFragment on Metric {
  __isMetric: __typename
  id
}

fragment globalFiltersFragment on Metric {
  __isMetric: __typename
  __typename
  ... on BrowserMetric {
    __isBrowserMetric: __typename
    availableCohortTypes
  }
}

fragment headerFragment on Metric {
  __isMetric: __typename
  ...metricInfoFragment
  ...actionsMetricPageHeaderFragment
}

fragment metricFragment on Metric {
  __isMetric: __typename
  __typename
  id
  ...headerFragment
  ...globalFiltersFragment
  ...breakdownMetric_metric
  ...breakdownMetric_breakdownCharts
}

fragment metricInfoFragment on Metric {
  __isMetric: __typename
  name
  product
  ... on BrowserMetric {
    __isBrowserMetric: __typename
    eventKey
    eventType
  }
}

fragment ownerTeamHeaderFragment on MetricOwner {
  __isMetricOwner: __typename
  __typename
  ... on Staff {
    id
    fullName
  }
  ... on Team {
    id
    teamName
  }
}

fragment slackChannelHeaderFragment on Metric {
  __isMetric: __typename
  slackChannel
}

fragment tomeFragment on Metric {
  __isMetric: __typename
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
  "name": "eventKey"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "focusedCohort"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pageLoadType"
},
v8 = [
  {
    "kind": "Variable",
    "name": "eventKey",
    "variableName": "eventKey"
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
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "product",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullName",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "teamName",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slackChannel",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventType",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventKey",
  "storageKey": null
},
v19 = {
  "kind": "Variable",
  "name": "aggregation",
  "variableName": "breakdownAggregation"
},
v20 = {
  "kind": "Variable",
  "name": "cohortType",
  "variableName": "cohortType"
},
v21 = {
  "kind": "Variable",
  "name": "cohortValue",
  "variableName": "focusedCohort"
},
v22 = {
  "kind": "Variable",
  "name": "env",
  "variableName": "env"
},
v23 = {
  "kind": "Variable",
  "name": "pageLoadType",
  "variableName": "pageLoadType"
},
v24 = [
  (v11/*: any*/),
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
v25 = [
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
        "selections": (v24/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "BrowserMetricBreakdownTimingDetail",
        "kind": "LinkedField",
        "name": "metric",
        "plural": true,
        "selections": (v24/*: any*/),
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
    "name": "metricPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "metricByEventKey",
        "plural": false,
        "selections": [
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v10/*: any*/),
                  (v14/*: any*/)
                ],
                "type": "Staff",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v10/*: any*/),
                  (v15/*: any*/)
                ],
                "type": "Team",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v16/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v17/*: any*/),
              (v18/*: any*/)
            ],
            "type": "BrowserMetric",
            "abstractKey": "__isBrowserMetric"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "metricFragment"
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
      (v5/*: any*/),
      (v4/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/),
      (v7/*: any*/),
      (v2/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Operation",
    "name": "metricPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "metricByEventKey",
        "plural": false,
        "selections": [
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isMetricOwner"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v14/*: any*/)
                ],
                "type": "Staff",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v15/*: any*/)
                ],
                "type": "Team",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v16/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isMetric"
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v17/*: any*/),
              (v18/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "availableCohortTypes",
                "storageKey": null
              }
            ],
            "type": "BrowserMetric",
            "abstractKey": "__isBrowserMetric"
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": "baseBreakdown",
                "args": [
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  {
                    "kind": "Variable",
                    "name": "date",
                    "variableName": "baseDate"
                  },
                  (v22/*: any*/),
                  (v23/*: any*/)
                ],
                "concreteType": "PageLoadBreakdownResult",
                "kind": "LinkedField",
                "name": "breakdown",
                "plural": false,
                "selections": (v25/*: any*/),
                "storageKey": null
              },
              {
                "alias": "comparisonBreakdown",
                "args": [
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  {
                    "kind": "Variable",
                    "name": "date",
                    "variableName": "comparisonDate"
                  },
                  (v22/*: any*/),
                  (v23/*: any*/)
                ],
                "concreteType": "PageLoadBreakdownResult",
                "kind": "LinkedField",
                "name": "breakdown",
                "plural": false,
                "selections": (v25/*: any*/),
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
    "cacheID": "e5b1151050d5b73a6b1cee867f4b8d79",
    "id": null,
    "metadata": {},
    "name": "metricPageQuery",
    "operationKind": "query",
    "text": "query metricPageQuery(\n  $eventKey: String!\n  $env: Environment!\n  $baseDate: Date!\n  $comparisonDate: Date!\n  $breakdownAggregation: BreakdownAggregation!\n  $pageLoadType: PageLoadType!\n  $cohortType: CohortType\n  $focusedCohort: String\n) {\n  metricByEventKey(eventKey: $eventKey) {\n    __typename\n    id\n    name\n    product\n    key\n    owner {\n      __typename\n      ... on Staff {\n        id\n        fullName\n      }\n      ... on Team {\n        id\n        teamName\n      }\n      id\n    }\n    slackChannel\n    ... on BrowserMetric {\n      __isBrowserMetric: __typename\n      eventType\n      eventKey\n    }\n    ...metricFragment\n  }\n}\n\nfragment actionsMetricPageHeaderFragment on Metric {\n  __isMetric: __typename\n  owner {\n    __typename\n    ...ownerTeamHeaderFragment\n    id\n  }\n  ...slackChannelHeaderFragment\n  ...configureMenuHeaderFragment\n  ...tomeFragment\n}\n\nfragment breakdownChartsFragment on PageLoadMetric {\n  baseBreakdown: breakdown(env: $env, date: $baseDate, aggregation: $breakdownAggregation, pageLoadType: $pageLoadType, cohortType: $cohortType, cohortValue: $focusedCohort) {\n    timings {\n      app {\n        name\n        startTime\n        duration\n        count\n        aggregatedAt\n      }\n      metric {\n        name\n        startTime\n        duration\n        count\n        aggregatedAt\n      }\n    }\n  }\n  comparisonBreakdown: breakdown(env: $env, date: $comparisonDate, aggregation: $breakdownAggregation, pageLoadType: $pageLoadType, cohortType: $cohortType, cohortValue: $focusedCohort) {\n    timings {\n      app {\n        name\n        startTime\n        duration\n        count\n        aggregatedAt\n      }\n      metric {\n        name\n        startTime\n        duration\n        count\n        aggregatedAt\n      }\n    }\n  }\n  id\n}\n\nfragment breakdownMetric_breakdownCharts on PageLoadMetric {\n  ...breakdownChartsFragment\n}\n\nfragment breakdownMetric_metric on Metric {\n  __isMetric: __typename\n  __typename\n}\n\nfragment configureMenuHeaderFragment on Metric {\n  __isMetric: __typename\n  id\n}\n\nfragment globalFiltersFragment on Metric {\n  __isMetric: __typename\n  __typename\n  ... on BrowserMetric {\n    __isBrowserMetric: __typename\n    availableCohortTypes\n  }\n}\n\nfragment headerFragment on Metric {\n  __isMetric: __typename\n  ...metricInfoFragment\n  ...actionsMetricPageHeaderFragment\n}\n\nfragment metricFragment on Metric {\n  __isMetric: __typename\n  __typename\n  id\n  ...headerFragment\n  ...globalFiltersFragment\n  ...breakdownMetric_metric\n  ...breakdownMetric_breakdownCharts\n}\n\nfragment metricInfoFragment on Metric {\n  __isMetric: __typename\n  name\n  product\n  ... on BrowserMetric {\n    __isBrowserMetric: __typename\n    eventKey\n    eventType\n  }\n}\n\nfragment ownerTeamHeaderFragment on MetricOwner {\n  __isMetricOwner: __typename\n  __typename\n  ... on Staff {\n    id\n    fullName\n  }\n  ... on Team {\n    id\n    teamName\n  }\n}\n\nfragment slackChannelHeaderFragment on Metric {\n  __isMetric: __typename\n  slackChannel\n}\n\nfragment tomeFragment on Metric {\n  __isMetric: __typename\n  id\n}\n"
  }
};
})();
(node as any).hash = 'a3ddf63a3eb32ff66095dce943fc5cf5';
export default node;
