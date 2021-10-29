/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type breakdownChartsFragment = {
    readonly baseBreakdown: {
        readonly timings: {
            readonly app: ReadonlyArray<{
                readonly name: string;
                readonly startTime: number;
                readonly duration: number;
                readonly count: number | null;
                readonly aggregatedAt: string | null;
            }> | null;
            readonly metric: ReadonlyArray<{
                readonly name: string;
                readonly startTime: number;
                readonly duration: number;
                readonly count: number | null;
                readonly aggregatedAt: string | null;
            }> | null;
        } | null;
    } | null;
    readonly comparisonBreakdown: {
        readonly timings: {
            readonly app: ReadonlyArray<{
                readonly name: string;
                readonly startTime: number;
                readonly duration: number;
                readonly count: number | null;
                readonly aggregatedAt: string | null;
            }> | null;
            readonly metric: ReadonlyArray<{
                readonly name: string;
                readonly startTime: number;
                readonly duration: number;
                readonly count: number | null;
                readonly aggregatedAt: string | null;
            }> | null;
        } | null;
    } | null;
    readonly id: string;
    readonly " $refType": "breakdownChartsFragment";
};
export type breakdownChartsFragment$data = breakdownChartsFragment;
export type breakdownChartsFragment$key = {
    readonly " $data"?: breakdownChartsFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"breakdownChartsFragment">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "aggregation",
  "variableName": "breakdownAggregation"
},
v1 = {
  "kind": "Variable",
  "name": "cohortType",
  "variableName": "cohortType"
},
v2 = {
  "kind": "Variable",
  "name": "cohortValue",
  "variableName": "focusedCohort"
},
v3 = {
  "kind": "Variable",
  "name": "env",
  "variableName": "env"
},
v4 = {
  "kind": "Variable",
  "name": "pageLoadType",
  "variableName": "pageLoadType"
},
v5 = [
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
v6 = [
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
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "BrowserMetricBreakdownTimingDetail",
        "kind": "LinkedField",
        "name": "metric",
        "plural": true,
        "selections": (v5/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "baseDate"
    },
    {
      "kind": "RootArgument",
      "name": "breakdownAggregation"
    },
    {
      "kind": "RootArgument",
      "name": "cohortType"
    },
    {
      "kind": "RootArgument",
      "name": "comparisonDate"
    },
    {
      "kind": "RootArgument",
      "name": "env"
    },
    {
      "kind": "RootArgument",
      "name": "focusedCohort"
    },
    {
      "kind": "RootArgument",
      "name": "pageLoadType"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./breakdownChartsFragmentRefetchQuery.graphql.ts'),
      "identifierField": "id"
    }
  },
  "name": "breakdownChartsFragment",
  "selections": [
    {
      "alias": "baseBreakdown",
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        {
          "kind": "Variable",
          "name": "date",
          "variableName": "baseDate"
        },
        (v3/*: any*/),
        (v4/*: any*/)
      ],
      "concreteType": "PageLoadBreakdownResult",
      "kind": "LinkedField",
      "name": "breakdown",
      "plural": false,
      "selections": (v6/*: any*/),
      "storageKey": null
    },
    {
      "alias": "comparisonBreakdown",
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        {
          "kind": "Variable",
          "name": "date",
          "variableName": "comparisonDate"
        },
        (v3/*: any*/),
        (v4/*: any*/)
      ],
      "concreteType": "PageLoadBreakdownResult",
      "kind": "LinkedField",
      "name": "breakdown",
      "plural": false,
      "selections": (v6/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "PageLoadMetric",
  "abstractKey": null
};
})();
(node as any).hash = 'd00cf19c00a3b3be76ac335a15325e17';
export default node;
