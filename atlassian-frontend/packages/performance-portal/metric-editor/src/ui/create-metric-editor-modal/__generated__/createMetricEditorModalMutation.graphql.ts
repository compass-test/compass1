/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BrowserMetricEventType = "CUSTOM" | "INLINE_RESULT" | "PAGE_LOAD" | "PAGE_SEGMENT_LOAD" | "WEB_VITALS" | "%future added value";
export type BrowserMetricToplineGoalPercentile = "p50" | "p75" | "p90" | "%future added value";
export type CohortType = "ALL" | "BROWSER" | "CPU" | "ENABLED_USERS" | "ENTERPRISE" | "INSTANCE_SIZE" | "JSM_ENTERPRISE" | "MIGRATION_READINESS" | "OS" | "REGION" | "%future added value";
export type PageLoadToplineType = "FMP" | "TTI" | "%future added value";
export type Product = "ADMIN" | "COMPASS" | "CONFLUENCE" | "DAC" | "JIRA" | "OPSGENIE" | "PERFORMANCE_PORTAL" | "WATERMELON" | "%future added value";
export type ToplineAggregation = "p50" | "p75" | "p90" | "%future added value";
export type BrowserMetricInput = {
    name: string;
    key: string;
    eventType: BrowserMetricEventType;
    product: Product;
    owner?: MetricOwnerInput | null;
    slackChannel?: string | null;
    opsgenieTeamId?: string | null;
    toplineGoals?: Array<BrowserMetricToplineGoalInput> | null;
    capabilities?: BrowserMetricCapabilitiesInput | null;
};
export type MetricOwnerInput = {
    staffId?: string | null;
    teamId?: string | null;
};
export type BrowserMetricToplineGoalInput = {
    name: string;
    toplineType: PageLoadToplineType;
    percentile: BrowserMetricToplineGoalPercentile;
    value: number;
};
export type BrowserMetricCapabilitiesInput = {
    availableCohortTypes?: Array<CohortType> | null;
};
export type createMetricEditorModalMutationVariables = {
    input: BrowserMetricInput;
};
export type createMetricEditorModalMutationResponse = {
    readonly createBrowserMetric: {
        readonly success: boolean;
        readonly errors: ReadonlyArray<{
            readonly message: string | null;
        }> | null;
        readonly browserMetric: {
            readonly id: string;
            readonly name: string | null;
            readonly product: Product | null;
            readonly key: string | null;
            readonly owner: {
                readonly id?: string;
                readonly fullName?: string | null;
                readonly teamName?: string | null;
            } | null;
            readonly slackChannel: string | null;
            readonly eventType: BrowserMetricEventType | null;
            readonly eventKey: string | null;
            readonly toplineGoals?: ReadonlyArray<{
                readonly id: string;
                readonly name: string | null;
                readonly value: number;
                readonly percentile: ToplineAggregation | null;
                readonly toplineType: PageLoadToplineType | null;
            }> | null;
        } | null;
    } | null;
};
export type createMetricEditorModalMutation = {
    readonly response: createMetricEditorModalMutationResponse;
    readonly variables: createMetricEditorModalMutationVariables;
};



/*
mutation createMetricEditorModalMutation(
  $input: BrowserMetricInput!
) {
  createBrowserMetric(input: $input) {
    success
    errors {
      message
    }
    browserMetric {
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
      __isBrowserMetric: __typename
      eventType
      eventKey
      ... on PageLoadMetric {
        toplineGoals {
          id
          name
          value
          percentile
          toplineType
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "success",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "MutationError",
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "product",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullName",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "teamName",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slackChannel",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventType",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventKey",
  "storageKey": null
},
v13 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PageLoadToplineGoal",
      "kind": "LinkedField",
      "name": "toplineGoals",
      "plural": true,
      "selections": [
        (v4/*: any*/),
        (v5/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
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
          "name": "toplineType",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PageLoadMetric",
  "abstractKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "createMetricEditorModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBrowserMetricPayload",
        "kind": "LinkedField",
        "name": "createBrowserMetric",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "browserMetric",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "owner",
                "plural": false,
                "selections": [
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
                      (v8/*: any*/)
                    ],
                    "type": "Staff",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
                      (v9/*: any*/)
                    ],
                    "type": "Team",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createMetricEditorModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBrowserMetricPayload",
        "kind": "LinkedField",
        "name": "createBrowserMetric",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "browserMetric",
            "plural": false,
            "selections": [
              (v14/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "owner",
                "plural": false,
                "selections": [
                  (v14/*: any*/),
                  (v4/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v8/*: any*/)
                    ],
                    "type": "Staff",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v9/*: any*/)
                    ],
                    "type": "Team",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isBrowserMetric"
              },
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1bf8398581118c0b2836d993a2071ea1",
    "id": null,
    "metadata": {},
    "name": "createMetricEditorModalMutation",
    "operationKind": "mutation",
    "text": "mutation createMetricEditorModalMutation(\n  $input: BrowserMetricInput!\n) {\n  createBrowserMetric(input: $input) {\n    success\n    errors {\n      message\n    }\n    browserMetric {\n      __typename\n      id\n      name\n      product\n      key\n      owner {\n        __typename\n        ... on Staff {\n          id\n          fullName\n        }\n        ... on Team {\n          id\n          teamName\n        }\n        id\n      }\n      slackChannel\n      __isBrowserMetric: __typename\n      eventType\n      eventKey\n      ... on PageLoadMetric {\n        toplineGoals {\n          id\n          name\n          value\n          percentile\n          toplineType\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b15fcf31cdc0b5ed20fdf8f3d860764d';
export default node;
