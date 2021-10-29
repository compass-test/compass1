/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Product = "ADMIN" | "COMPASS" | "CONFLUENCE" | "DAC" | "JIRA" | "OPSGENIE" | "PERFORMANCE_PORTAL" | "WATERMELON" | "%future added value";
export type mainReportsPageQueryVariables = {
    product: Product;
};
export type mainReportsPageQueryResponse = {
    readonly searchMetrics: {
        readonly metrics: ReadonlyArray<{
            readonly product: Product | null;
            readonly eventKey?: string | null;
            readonly " $fragmentRefs": FragmentRefs<"uiReportsMetricFragment">;
        }> | null;
    } | null;
};
export type mainReportsPageQuery = {
    readonly response: mainReportsPageQueryResponse;
    readonly variables: mainReportsPageQueryVariables;
};



/*
query mainReportsPageQuery(
  $product: Product!
) {
  searchMetrics(limit: 500, products: [$product]) {
    metrics {
      __typename
      product
      ... on BrowserMetric {
        __isBrowserMetric: __typename
        eventKey
      }
      ...uiReportsMetricFragment
      id
    }
  }
}

fragment dailyReportFragment on Metric {
  __isMetric: __typename
  id
  ...dataSeries_useProcessedData
}

fragment dataSeries_useDataWithoutWeekends on Metric {
  __isMetric: __typename
  id
  name
  product
}

fragment dataSeries_useProcessedData on Metric {
  __isMetric: __typename
  ...dataSeries_useDataWithoutWeekends
}

fragment uiReportsMetricFragment on Metric {
  __isMetric: __typename
  ...dailyReportFragment
  ...weeklyReportFragment
  ...weeklyEndOfMonthReportFragment
}

fragment weeklyEndOfMonthReportFragment on Metric {
  __isMetric: __typename
  id
  ...dataSeries_useProcessedData
}

fragment weeklyReportFragment on Metric {
  __isMetric: __typename
  id
  ...dataSeries_useProcessedData
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "product"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "limit",
    "value": 500
  },
  {
    "items": [
      {
        "kind": "Variable",
        "name": "products.0",
        "variableName": "product"
      }
    ],
    "kind": "ListValue",
    "name": "products"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "product",
  "storageKey": null
},
v3 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "mainReportsPageQuery",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "uiReportsMetricFragment"
              }
            ],
            "storageKey": null
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
    "name": "mainReportsPageQuery",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isMetric"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8d17d37dbc0ce2ae69d1979b7b476557",
    "id": null,
    "metadata": {},
    "name": "mainReportsPageQuery",
    "operationKind": "query",
    "text": "query mainReportsPageQuery(\n  $product: Product!\n) {\n  searchMetrics(limit: 500, products: [$product]) {\n    metrics {\n      __typename\n      product\n      ... on BrowserMetric {\n        __isBrowserMetric: __typename\n        eventKey\n      }\n      ...uiReportsMetricFragment\n      id\n    }\n  }\n}\n\nfragment dailyReportFragment on Metric {\n  __isMetric: __typename\n  id\n  ...dataSeries_useProcessedData\n}\n\nfragment dataSeries_useDataWithoutWeekends on Metric {\n  __isMetric: __typename\n  id\n  name\n  product\n}\n\nfragment dataSeries_useProcessedData on Metric {\n  __isMetric: __typename\n  ...dataSeries_useDataWithoutWeekends\n}\n\nfragment uiReportsMetricFragment on Metric {\n  __isMetric: __typename\n  ...dailyReportFragment\n  ...weeklyReportFragment\n  ...weeklyEndOfMonthReportFragment\n}\n\nfragment weeklyEndOfMonthReportFragment on Metric {\n  __isMetric: __typename\n  id\n  ...dataSeries_useProcessedData\n}\n\nfragment weeklyReportFragment on Metric {\n  __isMetric: __typename\n  id\n  ...dataSeries_useProcessedData\n}\n"
  }
};
})();
(node as any).hash = 'cb3f7c2025a35dce141d7ca05a737af5';
export default node;
