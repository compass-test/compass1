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
export type UpdateBrowserMetricInput = {
    id: string;
    patch: BrowserMetricPatchInput;
};
export type BrowserMetricPatchInput = {
    name?: string | null;
    key?: string | null;
    eventType?: BrowserMetricEventType | null;
    product?: Product | null;
    owner?: MetricOwnerInput | null;
    slackChannel?: string | null;
    opsgenieTeamId?: string | null;
    toplineGoals?: Array<BrowserMetricToplineGoalPatchInput | null> | null;
    capabilities?: BrowserMetricCapabilitiesPatchInput | null;
};
export type MetricOwnerInput = {
    staffId?: string | null;
    teamId?: string | null;
};
export type BrowserMetricToplineGoalPatchInput = {
    id?: string | null;
    name?: string | null;
    toplineType?: PageLoadToplineType | null;
    percentile?: BrowserMetricToplineGoalPercentile | null;
    value?: number | null;
};
export type BrowserMetricCapabilitiesPatchInput = {
    availableCohortTypes?: Array<CohortType> | null;
};
export type editMetricEditorModal_updateBrowserMetric_MutationVariables = {
    input: UpdateBrowserMetricInput;
};
export type editMetricEditorModal_updateBrowserMetric_MutationResponse = {
    readonly updateBrowserMetric: {
        readonly success: boolean;
        readonly errors: ReadonlyArray<{
            readonly message: string | null;
        }> | null;
        readonly browserMetric: {
            readonly id: string;
            readonly name: string | null;
            readonly key: string | null;
            readonly eventType: BrowserMetricEventType | null;
            readonly product: Product | null;
            readonly slackChannel: string | null;
            readonly owner: {
                readonly id?: string;
                readonly teamName?: string | null;
            } | null;
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
export type editMetricEditorModal_updateBrowserMetric_Mutation = {
    readonly response: editMetricEditorModal_updateBrowserMetric_MutationResponse;
    readonly variables: editMetricEditorModal_updateBrowserMetric_MutationVariables;
};



/*
mutation editMetricEditorModal_updateBrowserMetric_Mutation(
  $input: UpdateBrowserMetricInput!
) {
  updateBrowserMetric(input: $input) {
    success
    errors {
      message
    }
    browserMetric {
      __typename
      id
      name
      key
      eventType
      product
      slackChannel
      owner {
        __typename
        ... on Team {
          id
          teamName
        }
        id
      }
      __isBrowserMetric: __typename
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
  "name": "key",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventType",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "product",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slackChannel",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "teamName",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventKey",
  "storageKey": null
},
v12 = {
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
v13 = {
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
    "name": "editMetricEditorModal_updateBrowserMetric_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateBrowserMetricPayload",
        "kind": "LinkedField",
        "name": "updateBrowserMetric",
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
              (v8/*: any*/),
              (v9/*: any*/),
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
                      (v10/*: any*/)
                    ],
                    "type": "Team",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v11/*: any*/),
              (v12/*: any*/)
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
    "name": "editMetricEditorModal_updateBrowserMetric_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateBrowserMetricPayload",
        "kind": "LinkedField",
        "name": "updateBrowserMetric",
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
              (v13/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "owner",
                "plural": false,
                "selections": [
                  (v13/*: any*/),
                  (v4/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v10/*: any*/)
                    ],
                    "type": "Team",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isBrowserMetric"
              },
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "884704f68edcef9378e9a2fae4c8141e",
    "id": null,
    "metadata": {},
    "name": "editMetricEditorModal_updateBrowserMetric_Mutation",
    "operationKind": "mutation",
    "text": "mutation editMetricEditorModal_updateBrowserMetric_Mutation(\n  $input: UpdateBrowserMetricInput!\n) {\n  updateBrowserMetric(input: $input) {\n    success\n    errors {\n      message\n    }\n    browserMetric {\n      __typename\n      id\n      name\n      key\n      eventType\n      product\n      slackChannel\n      owner {\n        __typename\n        ... on Team {\n          id\n          teamName\n        }\n        id\n      }\n      __isBrowserMetric: __typename\n      eventKey\n      ... on PageLoadMetric {\n        toplineGoals {\n          id\n          name\n          value\n          percentile\n          toplineType\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fff4650be055cc6e4e2d018c2a91d6c8';
export default node;
