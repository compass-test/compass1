/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type configureMenuHeaderFragment = {
    readonly id: string;
    readonly " $refType": "configureMenuHeaderFragment";
};
export type configureMenuHeaderFragment$data = configureMenuHeaderFragment;
export type configureMenuHeaderFragment$key = {
    readonly " $data"?: configureMenuHeaderFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"configureMenuHeaderFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "configureMenuHeaderFragment",
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
(node as any).hash = '9ad511e17e43bae8c13d138709381b92';
export default node;
