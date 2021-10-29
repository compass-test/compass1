/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BrowserMetricEventType = "CUSTOM" | "INLINE_RESULT" | "PAGE_LOAD" | "PAGE_SEGMENT_LOAD" | "WEB_VITALS" | "%future added value";
export type PageLoadToplineType = "FMP" | "TTI" | "%future added value";
export type Product = "ADMIN" | "COMPASS" | "CONFLUENCE" | "DAC" | "JIRA" | "OPSGENIE" | "PERFORMANCE_PORTAL" | "WATERMELON" | "%future added value";
export type ToplineAggregation = "p50" | "p75" | "p90" | "%future added value";
export type metricEditorFieldsFragment = {
    readonly name: string | null;
    readonly product: Product | null;
    readonly key: string | null;
    readonly owner: {
        readonly id?: string;
    } | null;
    readonly slackChannel: string | null;
    readonly eventType?: BrowserMetricEventType | null;
    readonly toplineGoals?: ReadonlyArray<{
        readonly id: string;
        readonly name: string | null;
        readonly value: number;
        readonly percentile: ToplineAggregation | null;
        readonly toplineType: PageLoadToplineType | null;
    }> | null;
    readonly " $refType": "metricEditorFieldsFragment";
};
export type metricEditorFieldsFragment$data = metricEditorFieldsFragment;
export type metricEditorFieldsFragment$key = {
    readonly " $data"?: metricEditorFieldsFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"metricEditorFieldsFragment">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
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
  "name": "metricEditorFieldsFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "product",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "key",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            (v1/*: any*/)
          ],
          "type": "Team",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slackChannel",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "eventType",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageLoadToplineGoal",
          "kind": "LinkedField",
          "name": "toplineGoals",
          "plural": true,
          "selections": [
            (v1/*: any*/),
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "value",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "percentile",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "toplineType",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "PageLoadMetric",
      "abstractKey": null
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
})();
(node as any).hash = '02844ac7acf4c83d63035c49a0ced9eb';
export default node;
