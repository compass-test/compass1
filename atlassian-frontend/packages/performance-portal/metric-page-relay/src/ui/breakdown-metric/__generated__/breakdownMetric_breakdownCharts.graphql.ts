/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type breakdownMetric_breakdownCharts = {
    readonly " $fragmentRefs": FragmentRefs<"breakdownChartsFragment">;
    readonly " $refType": "breakdownMetric_breakdownCharts";
};
export type breakdownMetric_breakdownCharts$data = breakdownMetric_breakdownCharts;
export type breakdownMetric_breakdownCharts$key = {
    readonly " $data"?: breakdownMetric_breakdownCharts$data;
    readonly " $fragmentRefs": FragmentRefs<"breakdownMetric_breakdownCharts">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "breakdownMetric_breakdownCharts",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "breakdownChartsFragment"
    }
  ],
  "type": "PageLoadMetric",
  "abstractKey": null
};
(node as any).hash = '2964b4cdd7bd586718c6cef1b8c0e84b';
export default node;
