/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CohortType = "ALL" | "BROWSER" | "CPU" | "ENABLED_USERS" | "ENTERPRISE" | "INSTANCE_SIZE" | "JSM_ENTERPRISE" | "MIGRATION_READINESS" | "OS" | "REGION" | "%future added value";
export type globalFiltersFragment = {
    readonly __typename: string;
    readonly availableCohortTypes?: ReadonlyArray<CohortType> | null;
    readonly " $refType": "globalFiltersFragment";
};
export type globalFiltersFragment$data = globalFiltersFragment;
export type globalFiltersFragment$key = {
    readonly " $data"?: globalFiltersFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"globalFiltersFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "globalFiltersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
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
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = 'd992c2a970ca0f87837c39c062080aa2';
export default node;
