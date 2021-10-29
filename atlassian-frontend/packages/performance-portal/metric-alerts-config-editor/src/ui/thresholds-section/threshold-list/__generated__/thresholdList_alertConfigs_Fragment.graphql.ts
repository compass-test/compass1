/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type thresholdList_alertConfigs_Fragment = ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"thresholdItem_alertConfig_Fragment">;
    readonly " $refType": "thresholdList_alertConfigs_Fragment";
}>;
export type thresholdList_alertConfigs_Fragment$data = thresholdList_alertConfigs_Fragment;
export type thresholdList_alertConfigs_Fragment$key = ReadonlyArray<{
    readonly " $data"?: thresholdList_alertConfigs_Fragment$data;
    readonly " $fragmentRefs": FragmentRefs<"thresholdList_alertConfigs_Fragment">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "thresholdList_alertConfigs_Fragment",
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
      "name": "thresholdItem_alertConfig_Fragment"
    }
  ],
  "type": "AlertConfig",
  "abstractKey": null
};
(node as any).hash = '71dbae172d08d18402f5fcb2173d4ba7';
export default node;
