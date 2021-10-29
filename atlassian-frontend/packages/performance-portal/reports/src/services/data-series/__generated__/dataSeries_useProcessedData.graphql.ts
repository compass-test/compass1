/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type dataSeries_useProcessedData = ReadonlyArray<{
    readonly " $fragmentRefs": FragmentRefs<"dataSeries_useDataWithoutWeekends">;
    readonly " $refType": "dataSeries_useProcessedData";
}>;
export type dataSeries_useProcessedData$data = dataSeries_useProcessedData;
export type dataSeries_useProcessedData$key = ReadonlyArray<{
    readonly " $data"?: dataSeries_useProcessedData$data;
    readonly " $fragmentRefs": FragmentRefs<"dataSeries_useProcessedData">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "dataSeries_useProcessedData",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "dataSeries_useDataWithoutWeekends"
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = 'efdc0afdb6d5de22af830b9308a5763b';
export default node;
