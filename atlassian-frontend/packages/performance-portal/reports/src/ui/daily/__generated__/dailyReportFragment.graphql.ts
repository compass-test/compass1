/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type dailyReportFragment = ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"dataSeries_useProcessedData">;
    readonly " $refType": "dailyReportFragment";
}>;
export type dailyReportFragment$data = dailyReportFragment;
export type dailyReportFragment$key = ReadonlyArray<{
    readonly " $data"?: dailyReportFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"dailyReportFragment">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "dailyReportFragment",
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
(node as any).hash = '0038367ead2ca0a5f3101bc77eaf9ba5';
export default node;
