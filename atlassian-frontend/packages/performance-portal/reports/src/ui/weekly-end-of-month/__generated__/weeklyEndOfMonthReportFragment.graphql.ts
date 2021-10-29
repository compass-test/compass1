/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type weeklyEndOfMonthReportFragment = ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"dataSeries_useProcessedData">;
    readonly " $refType": "weeklyEndOfMonthReportFragment";
}>;
export type weeklyEndOfMonthReportFragment$data = weeklyEndOfMonthReportFragment;
export type weeklyEndOfMonthReportFragment$key = ReadonlyArray<{
    readonly " $data"?: weeklyEndOfMonthReportFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"weeklyEndOfMonthReportFragment">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "weeklyEndOfMonthReportFragment",
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
(node as any).hash = 'db031aa5894a68a29082f747fe197e6b';
export default node;
