/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Product = "ADMIN" | "COMPASS" | "CONFLUENCE" | "DAC" | "JIRA" | "OPSGENIE" | "PERFORMANCE_PORTAL" | "WATERMELON" | "%future added value";
export type product_metric = {
    readonly product: Product | null;
    readonly " $refType": "product_metric";
};
export type product_metric$data = product_metric;
export type product_metric$key = {
    readonly " $data"?: product_metric$data;
    readonly " $fragmentRefs": FragmentRefs<"product_metric">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "product_metric",
  "selections": [
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
(node as any).hash = '097ddf048c0f426d2bce32bda322060c';
export default node;
