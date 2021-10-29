/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type tomeFragment = {
    readonly id: string;
    readonly " $refType": "tomeFragment";
};
export type tomeFragment$data = tomeFragment;
export type tomeFragment$key = {
    readonly " $data"?: tomeFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"tomeFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "tomeFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = '36b8fe6e2b3fc86d9e64e33195dae866';
export default node;
