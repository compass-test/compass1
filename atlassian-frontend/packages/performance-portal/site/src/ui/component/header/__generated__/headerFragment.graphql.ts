/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type headerFragment = {
    readonly me: {
        readonly avatarUrl: string | null;
    } | null;
    readonly " $refType": "headerFragment";
};
export type headerFragment$data = headerFragment;
export type headerFragment$key = {
    readonly " $data"?: headerFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"headerFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "headerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Staff",
      "kind": "LinkedField",
      "name": "me",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "avatarUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = 'd34ef11c7d3e221cc5ef37eda246fdb6';
export default node;
