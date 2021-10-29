/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type weeklyReportFragment = ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"dataSeries_useProcessedData">;
    readonly " $refType": "weeklyReportFragment";
}>;
export type weeklyReportFragment$data = weeklyReportFragment;
export type weeklyReportFragment$key = ReadonlyArray<{
    readonly " $data"?: weeklyReportFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"weeklyReportFragment">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "weeklyReportFragment",
  "selections": [
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
      "name": "dataSeries_useProcessedData"
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = '946dcbc8f3eb18110102b944473fdb63';
export default node;
