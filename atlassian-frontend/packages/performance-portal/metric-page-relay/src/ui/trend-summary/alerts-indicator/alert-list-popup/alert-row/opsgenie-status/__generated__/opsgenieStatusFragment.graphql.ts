/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type opsgenieStatusFragment = {
    readonly status: string | null;
    readonly acknowledged: boolean | null;
    readonly snoozed: boolean | null;
    readonly " $refType": "opsgenieStatusFragment";
};
export type opsgenieStatusFragment$data = opsgenieStatusFragment;
export type opsgenieStatusFragment$key = {
    readonly " $data"?: opsgenieStatusFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"opsgenieStatusFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "opsgenieStatusFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "acknowledged",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "snoozed",
      "storageKey": null
    }
  ],
  "type": "Alert",
  "abstractKey": null
};
(node as any).hash = '702bb3c42fdc8b31111ac084a26494cd';
export default node;
