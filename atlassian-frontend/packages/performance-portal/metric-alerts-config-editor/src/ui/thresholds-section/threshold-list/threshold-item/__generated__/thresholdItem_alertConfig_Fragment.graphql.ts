/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type thresholdItem_alertConfig_Fragment = {
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"simpleEditThresholdItemFragment" | "advancedEditThresholdItem_alertConfig_Fragment">;
    readonly " $refType": "thresholdItem_alertConfig_Fragment";
};
export type thresholdItem_alertConfig_Fragment$data = thresholdItem_alertConfig_Fragment;
export type thresholdItem_alertConfig_Fragment$key = {
    readonly " $data"?: thresholdItem_alertConfig_Fragment$data;
    readonly " $fragmentRefs": FragmentRefs<"thresholdItem_alertConfig_Fragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "thresholdItem_alertConfig_Fragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "simpleEditThresholdItemFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "advancedEditThresholdItem_alertConfig_Fragment"
    }
  ],
  "type": "AlertConfig",
  "abstractKey": null
};
(node as any).hash = '7b1f3a5b396ad219ffb4477f27583d33';
export default node;
