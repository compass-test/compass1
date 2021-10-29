/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type eventKey_metric = {
    readonly eventKey: string | null;
    readonly " $refType": "eventKey_metric";
};
export type eventKey_metric$data = eventKey_metric;
export type eventKey_metric$key = {
    readonly " $data"?: eventKey_metric$data;
    readonly " $fragmentRefs": FragmentRefs<"eventKey_metric">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "eventKey_metric",
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
};
(node as any).hash = '70d782d4935a55e6f298d60cffdaf1a1';
export default node;
