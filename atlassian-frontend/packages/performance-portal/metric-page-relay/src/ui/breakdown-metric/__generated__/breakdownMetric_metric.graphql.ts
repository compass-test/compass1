/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type breakdownMetric_metric = {
    readonly __typename: string;
    readonly " $refType": "breakdownMetric_metric";
};
export type breakdownMetric_metric$data = breakdownMetric_metric;
export type breakdownMetric_metric$key = {
    readonly " $data"?: breakdownMetric_metric$data;
    readonly " $fragmentRefs": FragmentRefs<"breakdownMetric_metric">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "breakdownMetric_metric",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = '61e1b9b5ab7ed8f4e3261c676dc98bba';
export default node;
