/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CohortType = "ALL" | "BROWSER" | "CPU" | "ENABLED_USERS" | "ENTERPRISE" | "INSTANCE_SIZE" | "JSM_ENTERPRISE" | "MIGRATION_READINESS" | "OS" | "REGION" | "%future added value";
export type Environment = "DEV" | "PROD" | "STAGING" | "%future added value";
export type PageLoadToplineType = "FMP" | "TTI" | "%future added value";
export type PageLoadType = "COMBINED" | "INITIAL" | "TRANSITION" | "%future added value";
export type ToplineAggregation = "p50" | "p75" | "p90" | "%future added value";
export type alertsIndicatorQueryVariables = {
    metricId: string;
    dateFrom: string;
    dateTo: string;
    env: Environment;
    aggregation: ToplineAggregation;
    toplineType: PageLoadToplineType;
    pageLoadType: PageLoadType;
    cohortType: CohortType;
    cohortValue: string;
};
export type alertsIndicatorQueryResponse = {
    readonly metric: {
        readonly alerts: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"alertListPopupFragment">;
        }> | null;
    } | null;
};
export type alertsIndicatorQuery = {
    readonly response: alertsIndicatorQueryResponse;
    readonly variables: alertsIndicatorQueryVariables;
};



/*
query alertsIndicatorQuery(
  $metricId: ID!
  $dateFrom: Date!
  $dateTo: Date!
  $env: Environment!
  $aggregation: ToplineAggregation!
  $toplineType: PageLoadToplineType!
  $pageLoadType: PageLoadType!
  $cohortType: CohortType!
  $cohortValue: String!
) {
  metric(id: $metricId) {
    __typename
    alerts(dateFrom: $dateFrom, dateTo: $dateTo, env: $env, aggregation: $aggregation, toplineType: $toplineType, pageLoadType: $pageLoadType, cohortType: $cohortType, cohortValue: $cohortValue) {
      id
      ...alertListPopupFragment
    }
    id
  }
}

fragment alertListPopupFragment on Alert {
  opsgenieAlertId
  ...alertRowFragment
}

fragment alertRowFragment on Alert {
  priority
  opsgenieAlertId
  title
  sentAt
  ...opsgeniePriorityFragment
  ...opsgenieStatusFragment
}

fragment opsgeniePriorityFragment on Alert {
  priority
}

fragment opsgenieStatusFragment on Alert {
  status
  acknowledged
  snoozed
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "aggregation"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cohortType"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cohortValue"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "dateFrom"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "dateTo"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "env"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "metricId"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pageLoadType"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "toplineType"
},
v9 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "metricId"
  }
],
v10 = [
  {
    "kind": "Variable",
    "name": "aggregation",
    "variableName": "aggregation"
  },
  {
    "kind": "Variable",
    "name": "cohortType",
    "variableName": "cohortType"
  },
  {
    "kind": "Variable",
    "name": "cohortValue",
    "variableName": "cohortValue"
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
    "name": "pageLoadType",
    "variableName": "pageLoadType"
  },
  {
    "kind": "Variable",
    "name": "toplineType",
    "variableName": "toplineType"
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
      (v7/*: any*/),
      (v8/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "alertsIndicatorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v9/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "metric",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v10/*: any*/),
            "concreteType": "Alert",
            "kind": "LinkedField",
            "name": "alerts",
            "plural": true,
            "selections": [
              (v11/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "alertListPopupFragment"
              }
            ],
            "storageKey": null
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
      (v6/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v0/*: any*/),
      (v8/*: any*/),
      (v7/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "alertsIndicatorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v9/*: any*/),
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
            "args": (v10/*: any*/),
            "concreteType": "Alert",
            "kind": "LinkedField",
            "name": "alerts",
            "plural": true,
            "selections": [
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "opsgenieAlertId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "priority",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "sentAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "status",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "acknowledged",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "snoozed",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v11/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9dc5104df51a739cd9d8cecf7b8a8a9e",
    "id": null,
    "metadata": {},
    "name": "alertsIndicatorQuery",
    "operationKind": "query",
    "text": "query alertsIndicatorQuery(\n  $metricId: ID!\n  $dateFrom: Date!\n  $dateTo: Date!\n  $env: Environment!\n  $aggregation: ToplineAggregation!\n  $toplineType: PageLoadToplineType!\n  $pageLoadType: PageLoadType!\n  $cohortType: CohortType!\n  $cohortValue: String!\n) {\n  metric(id: $metricId) {\n    __typename\n    alerts(dateFrom: $dateFrom, dateTo: $dateTo, env: $env, aggregation: $aggregation, toplineType: $toplineType, pageLoadType: $pageLoadType, cohortType: $cohortType, cohortValue: $cohortValue) {\n      id\n      ...alertListPopupFragment\n    }\n    id\n  }\n}\n\nfragment alertListPopupFragment on Alert {\n  opsgenieAlertId\n  ...alertRowFragment\n}\n\nfragment alertRowFragment on Alert {\n  priority\n  opsgenieAlertId\n  title\n  sentAt\n  ...opsgeniePriorityFragment\n  ...opsgenieStatusFragment\n}\n\nfragment opsgeniePriorityFragment on Alert {\n  priority\n}\n\nfragment opsgenieStatusFragment on Alert {\n  status\n  acknowledged\n  snoozed\n}\n"
  }
};
})();
(node as any).hash = '49b5eb7524e51ebb0dde61c10f00134b';
export default node;
