/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type slackChannelHeaderFragment = {
    readonly slackChannel: string | null;
    readonly " $refType": "slackChannelHeaderFragment";
};
export type slackChannelHeaderFragment$data = slackChannelHeaderFragment;
export type slackChannelHeaderFragment$key = {
    readonly " $data"?: slackChannelHeaderFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"slackChannelHeaderFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "slackChannelHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slackChannel",
      "storageKey": null
    }
  ],
  "type": "Metric",
  "abstractKey": "__isMetric"
};
(node as any).hash = '7ad3c5732085abf3197c6aa932205e67';
export default node;
