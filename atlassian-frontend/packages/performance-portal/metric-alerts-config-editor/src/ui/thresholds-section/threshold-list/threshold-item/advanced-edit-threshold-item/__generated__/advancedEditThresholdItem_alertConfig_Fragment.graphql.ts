/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlertConfigPriority = "P1" | "P2" | "P3" | "P4" | "P5" | "%future added value";
export type AlertConfigThresholdType = "ABSOLUTE_DIFF" | "PERCENT_DIFF" | "%future added value";
export type ComparisonType = "DoD" | "WoW" | "%future added value";
export type advancedEditThresholdItem_alertConfig_Fragment = {
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
    readonly " $refType": "advancedEditThresholdItem_alertConfig_Fragment";
};
export type advancedEditThresholdItem_alertConfig_Fragment$data = advancedEditThresholdItem_alertConfig_Fragment;
export type advancedEditThresholdItem_alertConfig_Fragment$key = {
    readonly " $data"?: advancedEditThresholdItem_alertConfig_Fragment$data;
    readonly " $fragmentRefs": FragmentRefs<"advancedEditThresholdItem_alertConfig_Fragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "advancedEditThresholdItem_alertConfig_Fragment",
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
  "type": "AlertConfig",
  "abstractKey": null
};
(node as any).hash = '7d42e7c8d91963fd2e26609ebf7106ad';
export default node;
