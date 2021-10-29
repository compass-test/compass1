/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BrowserMetricEventType = "CUSTOM" | "INLINE_RESULT" | "PAGE_LOAD" | "PAGE_SEGMENT_LOAD" | "WEB_VITALS" | "%future added value";
export type advancedEditThresholdItem_metricData_Fragment = {
    readonly eventType?: BrowserMetricEventType | null;
    readonly " $fragmentRefs": FragmentRefs<"splitFieldFragment" | "cohortFieldFragment" | "metricTypeFieldFragment">;
    readonly " $refType": "advancedEditThresholdItem_metricData_Fragment";
};
export type advancedEditThresholdItem_metricData_Fragment$data = advancedEditThresholdItem_metricData_Fragment;
export type advancedEditThresholdItem_metricData_Fragment$key = {
    readonly " $data"?: advancedEditThresholdItem_metricData_Fragment$data;
    readonly " $fragmentRefs": FragmentRefs<"advancedEditThresholdItem_metricData_Fragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "advancedEditThresholdItem_metricData_Fragment",
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
      "name": "splitFieldFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "cohortFieldFragment"
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
(node as any).hash = '9f42e1349678d88ad5f1c10fc2de0103';
export default node;
