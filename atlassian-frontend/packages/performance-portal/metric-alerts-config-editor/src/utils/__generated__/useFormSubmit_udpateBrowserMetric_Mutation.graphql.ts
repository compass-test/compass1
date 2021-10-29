/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AlertConfigPriority = "P1" | "P2" | "P3" | "P4" | "P5" | "%future added value";
export type AlertConfigThresholdType = "ABSOLUTE_DIFF" | "PERCENT_DIFF" | "%future added value";
export type BrowserMetricEventType = "CUSTOM" | "INLINE_RESULT" | "PAGE_LOAD" | "PAGE_SEGMENT_LOAD" | "WEB_VITALS" | "%future added value";
export type BrowserMetricToplineGoalPercentile = "p50" | "p75" | "p90" | "%future added value";
export type CohortType = "ALL" | "BROWSER" | "CPU" | "ENABLED_USERS" | "ENTERPRISE" | "INSTANCE_SIZE" | "JSM_ENTERPRISE" | "MIGRATION_READINESS" | "OS" | "REGION" | "%future added value";
export type ComparisonType = "DoD" | "WoW" | "%future added value";
export type PageLoadToplineType = "FMP" | "TTI" | "%future added value";
export type Product = "ADMIN" | "COMPASS" | "CONFLUENCE" | "DAC" | "JIRA" | "OPSGENIE" | "PERFORMANCE_PORTAL" | "WATERMELON" | "%future added value";
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
export type useFormSubmit_udpateBrowserMetric_MutationVariables = {
    input: UpdateBrowserMetricInput;
};
export type useFormSubmit_udpateBrowserMetric_MutationResponse = {
    readonly updateBrowserMetric: {
        readonly success: boolean;
        readonly errors: ReadonlyArray<{
            readonly message: string | null;
        }> | null;
        readonly browserMetric: {
            readonly id: string;
            readonly opsgenieTeamId: string | null;
            readonly alertConfigs: ReadonlyArray<{
                readonly id: string;
                readonly env: string | null;
                readonly pageLoadType: string | null;
                readonly metricType: string | null;
                readonly percentile: number | null;
                readonly cohortType: string | null;
                readonly cohortValue: string | null;
                readonly thresholdValue: number | null;
                readonly thresholdType: AlertConfigThresholdType | null;
                readonly comparisonType: ComparisonType | null;
                readonly priority: AlertConfigPriority | null;
                readonly ignoreWeekend: boolean | null;
            }> | null;
        } | null;
    } | null;
};
export type useFormSubmit_udpateBrowserMetric_Mutation = {
    readonly response: useFormSubmit_udpateBrowserMetric_MutationResponse;
    readonly variables: useFormSubmit_udpateBrowserMetric_MutationVariables;
};



/*
mutation useFormSubmit_udpateBrowserMetric_Mutation(
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
      opsgenieTeamId
      alertConfigs {
        id
        env
        pageLoadType
        metricType
        percentile
        cohortType
        cohortValue
        thresholdValue
        thresholdType
        comparisonType
        priority
        ignoreWeekend
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
  "name": "opsgenieTeamId",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "AlertConfig",
  "kind": "LinkedField",
  "name": "alertConfigs",
  "plural": true,
  "selections": [
    (v4/*: any*/),
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
      "name": "pageLoadType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "metricType",
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
      "kind": "ScalarField",
      "name": "thresholdValue",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "thresholdType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "comparisonType",
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
      "name": "ignoreWeekend",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useFormSubmit_udpateBrowserMetric_Mutation",
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
              (v6/*: any*/)
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
    "name": "useFormSubmit_udpateBrowserMetric_Mutation",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f5cef4cbbeb82fec89c7f97808457940",
    "id": null,
    "metadata": {},
    "name": "useFormSubmit_udpateBrowserMetric_Mutation",
    "operationKind": "mutation",
    "text": "mutation useFormSubmit_udpateBrowserMetric_Mutation(\n  $input: UpdateBrowserMetricInput!\n) {\n  updateBrowserMetric(input: $input) {\n    success\n    errors {\n      message\n    }\n    browserMetric {\n      __typename\n      id\n      opsgenieTeamId\n      alertConfigs {\n        id\n        env\n        pageLoadType\n        metricType\n        percentile\n        cohortType\n        cohortValue\n        thresholdValue\n        thresholdType\n        comparisonType\n        priority\n        ignoreWeekend\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'da1a4fc4d80def7f25df52f78a5ea260';
export default node;
