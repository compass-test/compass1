/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type uiReportsMetricFragment = ReadonlyArray<{
    readonly " $fragmentRefs": FragmentRefs<"dailyReportFragment" | "weeklyReportFragment" | "weeklyEndOfMonthReportFragment">;
    readonly " $refType": "uiReportsMetricFragment";
}>;
export type uiReportsMetricFragment$data = uiReportsMetricFragment;
export type uiReportsMetricFragment$key = ReadonlyArray<{
    readonly " $data"?: uiReportsMetricFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"uiReportsMetricFragment">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "uiReportsMetricFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "dailyReportFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "weeklyReportFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "weeklyEndOfMonthReportFragment"
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = 'ba0f184cb8d3ed55ccc637b0d3930c0c';
export default node;
