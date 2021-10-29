/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type editMetricEditorModalQueryVariables = {
    eventKey: string;
};
export type editMetricEditorModalQueryResponse = {
    readonly metricByEventKey: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"metricEditorModalFragment">;
    } | null;
};
export type editMetricEditorModalQuery = {
    readonly response: editMetricEditorModalQueryResponse;
    readonly variables: editMetricEditorModalQueryVariables;
};



/*
query editMetricEditorModalQuery(
  $eventKey: String!
) {
  metricByEventKey(eventKey: $eventKey) {
    __typename
    id
    ...metricEditorModalFragment
  }
}

fragment metricEditorFieldsFragment on Metric {
  __isMetric: __typename
  name
  product
  key
  owner {
    __typename
    ... on Team {
      id
    }
    id
  }
  slackChannel
  ... on PageLoadMetric {
    eventType
    toplineGoals {
      id
      name
      value
      percentile
      toplineType
    }
  }
}

fragment metricEditorModalFragment on Metric {
  __isMetric: __typename
  ...metricEditorFieldsFragment
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventKey"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "eventKey",
    "variableName": "eventKey"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "editMetricEditorModalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "metricByEventKey",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "metricEditorModalFragment"
          }
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
    "name": "editMetricEditorModalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "metricByEventKey",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isMetric"
          },
          (v4/*: any*/),
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
              (v3/*: any*/),
              (v2/*: any*/)
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
                  (v2/*: any*/),
                  (v4/*: any*/),
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3edc460b1b2409b13e1d5ed453c731de",
    "id": null,
    "metadata": {},
    "name": "editMetricEditorModalQuery",
    "operationKind": "query",
    "text": "query editMetricEditorModalQuery(\n  $eventKey: String!\n) {\n  metricByEventKey(eventKey: $eventKey) {\n    __typename\n    id\n    ...metricEditorModalFragment\n  }\n}\n\nfragment metricEditorFieldsFragment on Metric {\n  __isMetric: __typename\n  name\n  product\n  key\n  owner {\n    __typename\n    ... on Team {\n      id\n    }\n    id\n  }\n  slackChannel\n  ... on PageLoadMetric {\n    eventType\n    toplineGoals {\n      id\n      name\n      value\n      percentile\n      toplineType\n    }\n  }\n}\n\nfragment metricEditorModalFragment on Metric {\n  __isMetric: __typename\n  ...metricEditorFieldsFragment\n}\n"
  }
};
})();
(node as any).hash = '4cb5f78844e036a9eb93c84655c1088a';
export default node;
