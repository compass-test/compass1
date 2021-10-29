/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type actionsMetricPageHeaderFragment = {
    readonly owner: {
        readonly " $fragmentRefs": FragmentRefs<"ownerTeamHeaderFragment">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"slackChannelHeaderFragment" | "configureMenuHeaderFragment" | "tomeFragment">;
    readonly " $refType": "actionsMetricPageHeaderFragment";
};
export type actionsMetricPageHeaderFragment$data = actionsMetricPageHeaderFragment;
export type actionsMetricPageHeaderFragment$key = {
    readonly " $data"?: actionsMetricPageHeaderFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"actionsMetricPageHeaderFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "actionsMetricPageHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ownerTeamHeaderFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "slackChannelHeaderFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "configureMenuHeaderFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "tomeFragment"
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = '485fda1142ec2949fb507ac014744733';
export default node;
