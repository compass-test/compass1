/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlertConfigPriority = "P1" | "P2" | "P3" | "P4" | "P5" | "%future added value";
export type AlertConfigThresholdType = "ABSOLUTE_DIFF" | "PERCENT_DIFF" | "%future added value";
export type simpleEditThresholdItemFragment = {
    readonly metricType: string | null;
    readonly percentile: number | null;
    readonly thresholdValue: number | null;
    readonly thresholdType: AlertConfigThresholdType | null;
    readonly priority: AlertConfigPriority | null;
    readonly " $refType": "simpleEditThresholdItemFragment";
};
export type simpleEditThresholdItemFragment$data = simpleEditThresholdItemFragment;
export type simpleEditThresholdItemFragment$key = {
    readonly " $data"?: simpleEditThresholdItemFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"simpleEditThresholdItemFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "simpleEditThresholdItemFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "metricType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "percentile",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "thresholdValue",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "thresholdType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priority",
      "storageKey": null
    }
  ],
  "type": "AlertConfig",
  "abstractKey": null
};
(node as any).hash = '7ab3955f04a5e5413a66a8fb8c45ed94';
export default node;
