/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type metricEditorModalFragment = {
    readonly " $fragmentRefs": FragmentRefs<"metricEditorFieldsFragment">;
    readonly " $refType": "metricEditorModalFragment";
};
export type metricEditorModalFragment$data = metricEditorModalFragment;
export type metricEditorModalFragment$key = {
    readonly " $data"?: metricEditorModalFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"metricEditorModalFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "metricEditorModalFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "metricEditorFieldsFragment"
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = 'fd59a3047fe7caec941b3e019662475c';
export default node;
