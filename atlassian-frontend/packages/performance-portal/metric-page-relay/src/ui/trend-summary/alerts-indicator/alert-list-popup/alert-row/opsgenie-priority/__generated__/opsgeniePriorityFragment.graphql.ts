/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlertPriority = "P1" | "P2" | "P3" | "P4" | "P5" | "%future added value";
export type opsgeniePriorityFragment = {
    readonly priority: AlertPriority | null;
    readonly " $refType": "opsgeniePriorityFragment";
};
export type opsgeniePriorityFragment$data = opsgeniePriorityFragment;
export type opsgeniePriorityFragment$key = {
    readonly " $data"?: opsgeniePriorityFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"opsgeniePriorityFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "opsgeniePriorityFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priority",
      "storageKey": null
    }
  ],
  "type": "Alert",
  "abstractKey": null
};
(node as any).hash = '76c8569bfff47a6aad07ba022055a004';
export default node;
