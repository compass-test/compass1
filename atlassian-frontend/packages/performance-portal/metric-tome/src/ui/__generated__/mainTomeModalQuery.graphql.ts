/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ExperienceEventType = "CUSTOM" | "INLINE_RESULT" | "PAGE_LOAD" | "PAGE_SEGMENT_LOAD" | "WEB_VITALS" | "%future added value";
export type PageLoadType = "COMBINED" | "INITIAL" | "TRANSITION" | "%future added value";
export type mainTomeModalQueryVariables = {
    experienceId: string;
};
export type mainTomeModalQueryResponse = {
    readonly experience: {
        readonly experienceType: ExperienceEventType;
        readonly populations: ReadonlyArray<{
            readonly metric: string | null;
            readonly pageLoadType: PageLoadType | null;
            readonly cohort: string;
            readonly sloConfiguration: {
                readonly tomeUrl: string;
            } | null;
        }>;
    } | null;
};
export type mainTomeModalQuery = {
    readonly response: mainTomeModalQueryResponse;
    readonly variables: mainTomeModalQueryVariables;
};



/*
query mainTomeModalQuery(
  $experienceId: ID!
) {
  experience(experienceId: $experienceId) {
    experienceType
    populations(sloEnabled: true, onlySLOConfigured: true) {
      metric
      pageLoadType
      cohort
      sloConfiguration {
        tomeUrl
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "experienceId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "experienceId",
    "variableName": "experienceId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "experienceType",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "onlySLOConfigured",
      "value": true
    },
    {
      "kind": "Literal",
      "name": "sloEnabled",
      "value": true
    }
  ],
  "concreteType": "ExperiencePopulation",
  "kind": "LinkedField",
  "name": "populations",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "metric",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pageLoadType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cohort",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SLOConfiguration",
      "kind": "LinkedField",
      "name": "sloConfiguration",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "tomeUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": "populations(onlySLOConfigured:true,sloEnabled:true)"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "mainTomeModalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Experience",
        "kind": "LinkedField",
        "name": "experience",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mainTomeModalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Experience",
        "kind": "LinkedField",
        "name": "experience",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
    "cacheID": "032e59b36e4f61c5909a296ca9a4907c",
    "id": null,
    "metadata": {},
    "name": "mainTomeModalQuery",
    "operationKind": "query",
    "text": "query mainTomeModalQuery(\n  $experienceId: ID!\n) {\n  experience(experienceId: $experienceId) {\n    experienceType\n    populations(sloEnabled: true, onlySLOConfigured: true) {\n      metric\n      pageLoadType\n      cohort\n      sloConfiguration {\n        tomeUrl\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '3057375344419e304da43a3131a93334';
export default node;
