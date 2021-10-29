/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Product = "ADMIN" | "COMPASS" | "CONFLUENCE" | "DAC" | "JIRA" | "OPSGENIE" | "PERFORMANCE_PORTAL" | "WATERMELON" | "%future added value";
export type dataSeries_useDataWithoutWeekends = ReadonlyArray<{
    readonly id: string;
    readonly name: string | null;
    readonly product: Product | null;
    readonly " $refType": "dataSeries_useDataWithoutWeekends";
}>;
export type dataSeries_useDataWithoutWeekends$data = dataSeries_useDataWithoutWeekends;
export type dataSeries_useDataWithoutWeekends$key = ReadonlyArray<{
    readonly " $data"?: dataSeries_useDataWithoutWeekends$data;
    readonly " $fragmentRefs": FragmentRefs<"dataSeries_useDataWithoutWeekends">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "dataSeries_useDataWithoutWeekends",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "product",
      "storageKey": null
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = '20c273fdd97b1ec335d5eece300c25f7';
export default node;
