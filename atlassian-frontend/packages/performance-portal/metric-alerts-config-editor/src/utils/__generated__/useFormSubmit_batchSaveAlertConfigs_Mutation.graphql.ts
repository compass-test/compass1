/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AlertConfigPriority = "P1" | "P2" | "P3" | "P4" | "P5" | "%future added value";
export type AlertConfigThresholdType = "ABSOLUTE_DIFF" | "PERCENT_DIFF" | "%future added value";
export type ComparisonType = "DoD" | "WoW" | "%future added value";
export type BatchSaveAlertConfigs = {
    alertConfigsToCreate?: Array<CreateAlertConfigInput> | null;
    alertConfigsToUpdate?: Array<UpdateAlertConfigInput> | null;
    alertConfigsToDelete?: Array<string> | null;
};
export type CreateAlertConfigInput = {
    metricId: string;
    env: string;
    pageLoadType?: string | null;
    metricType: string;
    cohortType: string;
    cohortValue: string;
    percentile: number;
    thresholdValue: number;
    thresholdType: AlertConfigThresholdType;
    comparisonType: ComparisonType;
    priority: AlertConfigPriority;
    ignoreWeekend?: boolean | null;
};
export type UpdateAlertConfigInput = {
    id: string;
    patch: UpdateAlertConfigPatchInput;
};
export type UpdateAlertConfigPatchInput = {
    metricId?: string | null;
    env?: string | null;
    pageLoadType?: string | null;
    metricType?: string | null;
    cohortType?: string | null;
    cohortValue?: string | null;
    percentile?: number | null;
    thresholdValue?: number | null;
    thresholdType?: AlertConfigThresholdType | null;
    comparisonType?: ComparisonType | null;
    priority?: AlertConfigPriority | null;
    ignoreWeekend?: boolean | null;
};
export type useFormSubmit_batchSaveAlertConfigs_MutationVariables = {
    input: BatchSaveAlertConfigs;
};
export type useFormSubmit_batchSaveAlertConfigs_MutationResponse = {
    readonly batchSaveAlertConfigs: {
        readonly success: boolean;
        readonly errors: ReadonlyArray<{
            readonly message: string | null;
        }> | null;
    } | null;
};
export type useFormSubmit_batchSaveAlertConfigs_Mutation = {
    readonly response: useFormSubmit_batchSaveAlertConfigs_MutationResponse;
    readonly variables: useFormSubmit_batchSaveAlertConfigs_MutationVariables;
};



/*
mutation useFormSubmit_batchSaveAlertConfigs_Mutation(
  $input: BatchSaveAlertConfigs!
) {
  batchSaveAlertConfigs(input: $input) {
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
    "concreteType": "BatchSaveAlertConfigsPayload",
    "kind": "LinkedField",
    "name": "batchSaveAlertConfigs",
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
    "name": "useFormSubmit_batchSaveAlertConfigs_Mutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useFormSubmit_batchSaveAlertConfigs_Mutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "957c731433ad413d46778e6e73dc3172",
    "id": null,
    "metadata": {},
    "name": "useFormSubmit_batchSaveAlertConfigs_Mutation",
    "operationKind": "mutation",
    "text": "mutation useFormSubmit_batchSaveAlertConfigs_Mutation(\n  $input: BatchSaveAlertConfigs!\n) {\n  batchSaveAlertConfigs(input: $input) {\n    success\n    errors {\n      message\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '902ee425ddc6d7d66c85cf4a5ef700e4';
export default node;
