/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DeleteNodeInput = {
    id: string;
};
export type deteleMetricConfirmationModalMutationVariables = {
    input: DeleteNodeInput;
};
export type deteleMetricConfirmationModalMutationResponse = {
    readonly deleteNode: {
        readonly success: boolean;
        readonly errors: ReadonlyArray<{
            readonly message: string | null;
        }> | null;
    } | null;
};
export type deteleMetricConfirmationModalMutation = {
    readonly response: deteleMetricConfirmationModalMutationResponse;
    readonly variables: deteleMetricConfirmationModalMutationVariables;
};



/*
mutation deteleMetricConfirmationModalMutation(
  $input: DeleteNodeInput!
) {
  deleteNode(input: $input) {
    success
    errors {
      message
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "DeleteNodePayload",
    "kind": "LinkedField",
    "name": "deleteNode",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "MutationError",
        "kind": "LinkedField",
        "name": "errors",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "message",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "deteleMetricConfirmationModalMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "deteleMetricConfirmationModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "54a95197c97a705f274d3ae69109f41d",
    "id": null,
    "metadata": {},
    "name": "deteleMetricConfirmationModalMutation",
    "operationKind": "mutation",
    "text": "mutation deteleMetricConfirmationModalMutation(\n  $input: DeleteNodeInput!\n) {\n  deleteNode(input: $input) {\n    success\n    errors {\n      message\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f367a8a72ea6b6a748ecdc96f31948a3';
export default node;
