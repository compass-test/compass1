/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DeleteNodeInput = {
    id: string;
};
export type editMetricEditorModal_deleteGoal_MutationVariables = {
    input: DeleteNodeInput;
};
export type editMetricEditorModal_deleteGoal_MutationResponse = {
    readonly deleteNode: {
        readonly success: boolean;
    } | null;
};
export type editMetricEditorModal_deleteGoal_Mutation = {
    readonly response: editMetricEditorModal_deleteGoal_MutationResponse;
    readonly variables: editMetricEditorModal_deleteGoal_MutationVariables;
};



/*
mutation editMetricEditorModal_deleteGoal_Mutation(
  $input: DeleteNodeInput!
) {
  deleteNode(input: $input) {
    success
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
    "name": "editMetricEditorModal_deleteGoal_Mutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "editMetricEditorModal_deleteGoal_Mutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c5165433566f2e4ea416c12ce384001f",
    "id": null,
    "metadata": {},
    "name": "editMetricEditorModal_deleteGoal_Mutation",
    "operationKind": "mutation",
    "text": "mutation editMetricEditorModal_deleteGoal_Mutation(\n  $input: DeleteNodeInput!\n) {\n  deleteNode(input: $input) {\n    success\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a7e83df1411410a582e74400f8256c24';
export default node;
