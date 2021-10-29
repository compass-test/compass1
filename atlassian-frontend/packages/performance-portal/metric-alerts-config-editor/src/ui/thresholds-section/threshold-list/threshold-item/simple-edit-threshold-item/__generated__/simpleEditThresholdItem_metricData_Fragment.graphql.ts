/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BrowserMetricEventType = "CUSTOM" | "INLINE_RESULT" | "PAGE_LOAD" | "PAGE_SEGMENT_LOAD" | "WEB_VITALS" | "%future added value";
export type simpleEditThresholdItem_metricData_Fragment = {
    readonly eventType?: BrowserMetricEventType | null;
    readonly " $fragmentRefs": FragmentRefs<"metricTypeFieldFragment">;
    readonly " $refType": "simpleEditThresholdItem_metricData_Fragment";
};
export type simpleEditThresholdItem_metricData_Fragment$data = simpleEditThresholdItem_metricData_Fragment;
export type simpleEditThresholdItem_metricData_Fragment$key = {
    readonly " $data"?: simpleEditThresholdItem_metricData_Fragment$data;
    readonly " $fragmentRefs": FragmentRefs<"simpleEditThresholdItem_metricData_Fragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "simpleEditThresholdItem_metricData_Fragment",
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "eventType",
          "storageKey": null
        }
      ],
      "type": "BrowserMetric",
      "abstractKey": "__isBrowserMetric"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "metricTypeFieldFragment"
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = 'c62c6554c38547e2be3c87dd19b172c8';
export default node;
