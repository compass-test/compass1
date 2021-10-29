/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type metricFragment = {
    readonly __typename: string;
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"headerFragment" | "globalFiltersFragment" | "breakdownMetric_metric" | "breakdownMetric_breakdownCharts">;
    readonly " $refType": "metricFragment";
};
export type metricFragment$data = metricFragment;
export type metricFragment$key = {
    readonly " $data"?: metricFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"metricFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "metricFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "headerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "globalFiltersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "breakdownMetric_metric"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "breakdownMetric_breakdownCharts"
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = '2429f0042e94efc4997e147647fed0fe';
export default node;
