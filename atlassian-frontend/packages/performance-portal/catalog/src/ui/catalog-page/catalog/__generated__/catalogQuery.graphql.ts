/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Product = "ADMIN" | "COMPASS" | "CONFLUENCE" | "DAC" | "JIRA" | "OPSGENIE" | "PERFORMANCE_PORTAL" | "WATERMELON" | "%future added value";
export type SearchMetricsSortBy = "EVENT_KEY" | "NAME" | "OWNER" | "PRODUCT" | "%future added value";
export type SearchMetricsSortOrder = "ASC" | "DESC" | "%future added value";
export type catalogQueryVariables = {
    limit?: number | null;
    offset?: number | null;
    products?: Array<Product> | null;
    searchString?: string | null;
    sortBy?: SearchMetricsSortBy | null;
    sortOrder?: SearchMetricsSortOrder | null;
};
export type catalogQueryResponse = {
    readonly searchMetrics: {
        readonly " $fragmentRefs": FragmentRefs<"metricTableFragment">;
    } | null;
};
export type catalogQuery = {
    readonly response: catalogQueryResponse;
    readonly variables: catalogQueryVariables;
};



/*
query catalogQuery(
  $limit: Int
  $offset: Int
  $products: [Product!]
  $searchString: String
  $sortBy: SearchMetricsSortBy
  $sortOrder: SearchMetricsSortOrder
) {
  searchMetrics(limit: $limit, offset: $offset, products: $products, searchString: $searchString, sortBy: $sortBy, sortOrder: $sortOrder) {
    ...metricTableFragment
  }
}

fragment eventKey_metric on BrowserMetric {
  __isBrowserMetric: __typename
  eventKey
}

fragment metricName_metric on Metric {
  __isMetric: __typename
  name
  ... on BrowserMetric {
    __isBrowserMetric: __typename
    eventKey
  }
}

fragment metricTableFragment on MetricPaginatedResults {
  metrics {
    __typename
    id
    owner {
      id
      __typename
      ... on Team {
        teamName
      }
    }
    ... on BrowserMetric {
      __isBrowserMetric: __typename
      eventKey
    }
    ...metricName_metric
    ...eventKey_metric
    ...product_metric
  }
  totalCount
}

fragment product_metric on Metric {
  __isMetric: __typename
  product
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "limit"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "offset"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "products"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchString"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sortBy"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sortOrder"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "limit",
    "variableName": "limit"
  },
  {
    "kind": "Variable",
    "name": "offset",
    "variableName": "offset"
  },
  {
    "kind": "Variable",
    "name": "products",
    "variableName": "products"
  },
  {
    "kind": "Variable",
    "name": "searchString",
    "variableName": "searchString"
  },
  {
    "kind": "Variable",
    "name": "sortBy",
    "variableName": "sortBy"
  },
  {
    "kind": "Variable",
    "name": "sortOrder",
    "variableName": "sortOrder"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "catalogQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MetricPaginatedResults",
        "kind": "LinkedField",
        "name": "searchMetrics",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "metricTableFragment"
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
    "name": "catalogQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MetricPaginatedResults",
        "kind": "LinkedField",
        "name": "searchMetrics",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "metrics",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "owner",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
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
                "storageKey": null
              },
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isMetric"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "product",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "eventKey",
                    "storageKey": null
                  }
                ],
                "type": "BrowserMetric",
                "abstractKey": "__isBrowserMetric"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bad2888c9dc67fc6307df18a5e48e0a9",
    "id": null,
    "metadata": {},
    "name": "catalogQuery",
    "operationKind": "query",
    "text": "query catalogQuery(\n  $limit: Int\n  $offset: Int\n  $products: [Product!]\n  $searchString: String\n  $sortBy: SearchMetricsSortBy\n  $sortOrder: SearchMetricsSortOrder\n) {\n  searchMetrics(limit: $limit, offset: $offset, products: $products, searchString: $searchString, sortBy: $sortBy, sortOrder: $sortOrder) {\n    ...metricTableFragment\n  }\n}\n\nfragment eventKey_metric on BrowserMetric {\n  __isBrowserMetric: __typename\n  eventKey\n}\n\nfragment metricName_metric on Metric {\n  __isMetric: __typename\n  name\n  ... on BrowserMetric {\n    __isBrowserMetric: __typename\n    eventKey\n  }\n}\n\nfragment metricTableFragment on MetricPaginatedResults {\n  metrics {\n    __typename\n    id\n    owner {\n      id\n      __typename\n      ... on Team {\n        teamName\n      }\n    }\n    ... on BrowserMetric {\n      __isBrowserMetric: __typename\n      eventKey\n    }\n    ...metricName_metric\n    ...eventKey_metric\n    ...product_metric\n  }\n  totalCount\n}\n\nfragment product_metric on Metric {\n  __isMetric: __typename\n  product\n}\n"
  }
};
})();
(node as any).hash = '2f0450403d11387d62e7afa05eadc7e9';
export default node;
