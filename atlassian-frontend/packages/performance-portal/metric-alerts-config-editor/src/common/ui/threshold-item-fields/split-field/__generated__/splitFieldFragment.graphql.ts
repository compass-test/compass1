/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CohortType = "ALL" | "BROWSER" | "CPU" | "ENABLED_USERS" | "ENTERPRISE" | "INSTANCE_SIZE" | "JSM_ENTERPRISE" | "MIGRATION_READINESS" | "OS" | "REGION" | "%future added value";
export type splitFieldFragment = {
    readonly availableCohortTypes: ReadonlyArray<CohortType> | null;
    readonly " $refType": "splitFieldFragment";
};
export type splitFieldFragment$data = splitFieldFragment;
export type splitFieldFragment$key = {
    readonly " $data"?: splitFieldFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"splitFieldFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "splitFieldFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "availableCohortTypes",
      "storageKey": null
    }
  ],
  "type": "BrowserMetric",
  "abstractKey": "__isBrowserMetric"
};
(node as any).hash = 'f10df31d2c4b91db451ed54e68747f6d';
export default node;
