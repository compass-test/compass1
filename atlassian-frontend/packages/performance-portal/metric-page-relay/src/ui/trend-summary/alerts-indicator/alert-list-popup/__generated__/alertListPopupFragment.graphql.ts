/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type alertListPopupFragment = ReadonlyArray<{
    readonly opsgenieAlertId: string | null;
    readonly " $fragmentRefs": FragmentRefs<"alertRowFragment">;
    readonly " $refType": "alertListPopupFragment";
}>;
export type alertListPopupFragment$data = alertListPopupFragment;
export type alertListPopupFragment$key = ReadonlyArray<{
    readonly " $data"?: alertListPopupFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"alertListPopupFragment">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "alertListPopupFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "opsgenieAlertId",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "alertRowFragment"
    }
  ],
  "type": "Alert",
  "abstractKey": null
};
(node as any).hash = '63c745e8146927fcbb85bcd353e3a09f';
export default node;
