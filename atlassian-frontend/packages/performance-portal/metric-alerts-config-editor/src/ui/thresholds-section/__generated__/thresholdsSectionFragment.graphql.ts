/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlertConfigPriority = "P1" | "P2" | "P3" | "P4" | "P5" | "%future added value";
export type AlertConfigThresholdType = "ABSOLUTE_DIFF" | "PERCENT_DIFF" | "%future added value";
export type ComparisonType = "DoD" | "WoW" | "%future added value";
export type thresholdsSectionFragment = {
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
        readonly " $fragmentRefs": FragmentRefs<"thresholdList_alertConfigs_Fragment">;
    }> | null;
    readonly " $fragmentRefs": FragmentRefs<"thresholdList_metric_Fragment">;
    readonly " $refType": "thresholdsSectionFragment";
};
export type thresholdsSectionFragment$data = thresholdsSectionFragment;
export type thresholdsSectionFragment$key = {
    readonly " $data"?: thresholdsSectionFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"thresholdsSectionFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "thresholdsSectionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AlertConfig",
      "kind": "LinkedField",
      "name": "alertConfigs",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "thresholdList_alertConfigs_Fragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "thresholdList_metric_Fragment"
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = 'e4893ae042843c8d516aff7a09a1c8ad';
export default node;
