/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BrowserMetricEventType = "CUSTOM" | "INLINE_RESULT" | "PAGE_LOAD" | "PAGE_SEGMENT_LOAD" | "WEB_VITALS" | "%future added value";
export type metricTypeFieldFragment = {
    readonly eventType: BrowserMetricEventType | null;
    readonly " $refType": "metricTypeFieldFragment";
};
export type metricTypeFieldFragment$data = metricTypeFieldFragment;
export type metricTypeFieldFragment$key = {
    readonly " $data"?: metricTypeFieldFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"metricTypeFieldFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "metricTypeFieldFragment",
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
};
(node as any).hash = '2f9a7c41042bfcec40ef5bd6ca3145b8';
export default node;
