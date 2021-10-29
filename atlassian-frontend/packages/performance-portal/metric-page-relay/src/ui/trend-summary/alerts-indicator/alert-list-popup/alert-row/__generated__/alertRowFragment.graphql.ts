/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlertPriority = "P1" | "P2" | "P3" | "P4" | "P5" | "%future added value";
export type alertRowFragment = {
    readonly priority: AlertPriority | null;
    readonly opsgenieAlertId: string | null;
    readonly title: string | null;
    readonly sentAt: string | null;
    readonly " $fragmentRefs": FragmentRefs<"opsgeniePriorityFragment" | "opsgenieStatusFragment">;
    readonly " $refType": "alertRowFragment";
};
export type alertRowFragment$data = alertRowFragment;
export type alertRowFragment$key = {
    readonly " $data"?: alertRowFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"alertRowFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "alertRowFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priority",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "opsgenieAlertId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sentAt",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "opsgeniePriorityFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "opsgenieStatusFragment"
    }
  ],
  "type": "Alert",
  "abstractKey": null
};
(node as any).hash = '0781b0e0e0694284755eca456e21b3ea';
export default node;
