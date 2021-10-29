/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BrowserMetricEventType = "CUSTOM" | "INLINE_RESULT" | "PAGE_LOAD" | "PAGE_SEGMENT_LOAD" | "WEB_VITALS" | "%future added value";
export type thresholdList_metric_Fragment = {
    readonly eventType?: BrowserMetricEventType | null;
    readonly " $fragmentRefs": FragmentRefs<"thresholdItem_metric_Fragment">;
    readonly " $refType": "thresholdList_metric_Fragment";
};
export type thresholdList_metric_Fragment$data = thresholdList_metric_Fragment;
export type thresholdList_metric_Fragment$key = {
    readonly " $data"?: thresholdList_metric_Fragment$data;
    readonly " $fragmentRefs": FragmentRefs<"thresholdList_metric_Fragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "thresholdList_metric_Fragment",
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
      "name": "thresholdItem_metric_Fragment"
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = '2cf1bf92572681441bbcc74c402a8dae';
export default node;
