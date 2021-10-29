/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CohortType = "ALL" | "BROWSER" | "CPU" | "ENABLED_USERS" | "ENTERPRISE" | "INSTANCE_SIZE" | "JSM_ENTERPRISE" | "MIGRATION_READINESS" | "OS" | "REGION" | "%future added value";
export type cohortFieldFragment = {
    readonly knownCohortValues: ReadonlyArray<{
        readonly cohortType: CohortType;
        readonly cohortValues: ReadonlyArray<string> | null;
    }> | null;
    readonly " $refType": "cohortFieldFragment";
};
export type cohortFieldFragment$data = cohortFieldFragment;
export type cohortFieldFragment$key = {
    readonly " $data"?: cohortFieldFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"cohortFieldFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cohortFieldFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "KnownCohortValues",
      "kind": "LinkedField",
      "name": "knownCohortValues",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cohortType",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cohortValues",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "BrowserMetric",
  "abstractKey": "__isBrowserMetric"
};
(node as any).hash = '926e0ada7152bb158461c685f85f903b';
export default node;
