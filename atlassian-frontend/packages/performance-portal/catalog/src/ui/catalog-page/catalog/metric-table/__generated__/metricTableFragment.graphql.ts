/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type metricTableFragment = {
    readonly metrics: ReadonlyArray<{
        readonly id: string;
        readonly owner: {
            readonly id: string;
            readonly __typename: string;
            readonly teamName?: string | null;
        } | null;
        readonly eventKey?: string | null;
        readonly " $fragmentRefs": FragmentRefs<"metricName_metric" | "eventKey_metric" | "product_metric">;
    }> | null;
    readonly totalCount: number;
    readonly " $refType": "metricTableFragment";
};
export type metricTableFragment$data = metricTableFragment;
export type metricTableFragment$key = {
    readonly " $data"?: metricTableFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"metricTableFragment">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "metricTableFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "metrics",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "owner",
          "plural": false,
          "selections": [
            (v0/*: any*/),
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
                  "name": "teamName",
                  "storageKey": null
                }
              ],
              "type": "Team",
              "abstractKey": null
            }
          ],
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "eventKey",
              "storageKey": null
            }
          ],
          "type": "BrowserMetric",
          "abstractKey": "__isBrowserMetric"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "metricName_metric"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "eventKey_metric"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "product_metric"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalCount",
      "storageKey": null
    }
  ],
  "type": "MetricPaginatedResults",
  "abstractKey": null
};
})();
(node as any).hash = '0c885c2fd129fb9f021c511488be62db';
export default node;
