/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type headerFragment = {
    readonly " $fragmentRefs": FragmentRefs<"metricInfoFragment" | "actionsMetricPageHeaderFragment">;
    readonly " $refType": "headerFragment";
};
export type headerFragment$data = headerFragment;
export type headerFragment$key = {
    readonly " $data"?: headerFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"headerFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "headerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "metricInfoFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "actionsMetricPageHeaderFragment"
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = '2dc5d3bcd919a20d2ce5e8a16ed40116';
export default node;
