/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type metricName_metric = {
    readonly name: string | null;
    readonly eventKey?: string | null;
    readonly " $refType": "metricName_metric";
};
export type metricName_metric$data = metricName_metric;
export type metricName_metric$key = {
    readonly " $data"?: metricName_metric$data;
    readonly " $fragmentRefs": FragmentRefs<"metricName_metric">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "metricName_metric",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "eventKey",
          "storageKey": null
        }
      ],
      "type": "BrowserMetric",
      "abstractKey": "__isBrowserMetric"
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = '4fbcc86ffa15040cb2676c2175f150e0';
export default node;
