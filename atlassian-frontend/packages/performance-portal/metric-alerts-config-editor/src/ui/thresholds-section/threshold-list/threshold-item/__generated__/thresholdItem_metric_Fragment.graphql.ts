/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type thresholdItem_metric_Fragment = {
    readonly " $fragmentRefs": FragmentRefs<"simpleEditThresholdItem_metricData_Fragment" | "advancedEditThresholdItem_metricData_Fragment">;
    readonly " $refType": "thresholdItem_metric_Fragment";
};
export type thresholdItem_metric_Fragment$data = thresholdItem_metric_Fragment;
export type thresholdItem_metric_Fragment$key = {
    readonly " $data"?: thresholdItem_metric_Fragment$data;
    readonly " $fragmentRefs": FragmentRefs<"thresholdItem_metric_Fragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "thresholdItem_metric_Fragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "simpleEditThresholdItem_metricData_Fragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "advancedEditThresholdItem_metricData_Fragment"
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = '0149f51c2f2e5d660da68cdad9c2c03f';
export default node;
