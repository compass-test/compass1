/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ownerTeamHeaderFragment = {
    readonly __typename: "Staff";
    readonly id: string;
    readonly fullName: string | null;
    readonly " $refType": "ownerTeamHeaderFragment";
} | {
    readonly __typename: "Team";
    readonly id: string;
    readonly teamName: string | null;
    readonly " $refType": "ownerTeamHeaderFragment";
} | {
    /*This will never be '%other', but we need some
    value in case none of the concrete values match.*/
    readonly __typename: "%other";
    readonly " $refType": "ownerTeamHeaderFragment";
};
export type ownerTeamHeaderFragment$data = ownerTeamHeaderFragment;
export type ownerTeamHeaderFragment$key = {
    readonly " $data"?: ownerTeamHeaderFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"ownerTeamHeaderFragment">;
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
  "name": "ownerTeamHeaderFragment",
  "selections": [
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "fullName",
          "storageKey": null
        }
      ],
      "type": "Staff",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
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
  "type": "MetricOwner",
  "abstractKey": "__isMetricOwner"
};
})();
(node as any).hash = '3f45aeebb82ef65cc3a09947093961eb';
export default node;
