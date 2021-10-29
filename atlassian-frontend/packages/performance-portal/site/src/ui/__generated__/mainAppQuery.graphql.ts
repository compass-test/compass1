/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type mainAppQueryVariables = {};
export type mainAppQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"headerFragment">;
};
export type mainAppQuery = {
    readonly response: mainAppQueryResponse;
    readonly variables: mainAppQueryVariables;
};



/*
query mainAppQuery {
  ...headerFragment
}

fragment headerFragment on Query {
  me {
    avatarUrl
    id
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "mainAppQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "headerFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "mainAppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Staff",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatarUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "785b01db3dfa3827c4c106d60efe08e8",
    "id": null,
    "metadata": {},
    "name": "mainAppQuery",
    "operationKind": "query",
    "text": "query mainAppQuery {\n  ...headerFragment\n}\n\nfragment headerFragment on Query {\n  me {\n    avatarUrl\n    id\n  }\n}\n"
  }
};
(node as any).hash = 'e5d22611ee804ec182750f89c1e700d4';
export default node;
