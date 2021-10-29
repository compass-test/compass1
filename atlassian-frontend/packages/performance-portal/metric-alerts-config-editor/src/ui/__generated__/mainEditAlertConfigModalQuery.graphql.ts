/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BrowserMetricEventType = "CUSTOM" | "INLINE_RESULT" | "PAGE_LOAD" | "PAGE_SEGMENT_LOAD" | "WEB_VITALS" | "%future added value";
export type mainEditAlertConfigModalQueryVariables = {
    id: string;
};
export type mainEditAlertConfigModalQueryResponse = {
    readonly metric: {
        readonly opsgenieTeamId: string | null;
        readonly eventType?: BrowserMetricEventType | null;
        readonly " $fragmentRefs": FragmentRefs<"thresholdsSectionFragment">;
    } | null;
};
export type mainEditAlertConfigModalQuery = {
    readonly response: mainEditAlertConfigModalQueryResponse;
    readonly variables: mainEditAlertConfigModalQueryVariables;
};



/*
query mainEditAlertConfigModalQuery(
  $id: ID!
) {
  metric(id: $id) {
    __typename
    opsgenieTeamId
    ... on BrowserMetric {
      __isBrowserMetric: __typename
      eventType
    }
    ...thresholdsSectionFragment
    id
  }
}

fragment advancedEditThresholdItem_alertConfig_Fragment on AlertConfig {
  env
  pageLoadType
  metricType
  percentile
  cohortType
  cohortValue
  thresholdValue
  thresholdType
  comparisonType
  priority
  ignoreWeekend
}

fragment advancedEditThresholdItem_metricData_Fragment on Metric {
  __isMetric: __typename
  ... on BrowserMetric {
    __isBrowserMetric: __typename
    eventType
  }
  ...splitFieldFragment
  ...cohortFieldFragment
  ...metricTypeFieldFragment
}

fragment cohortFieldFragment on BrowserMetric {
  __isBrowserMetric: __typename
  knownCohortValues {
    cohortType
    cohortValues
  }
}

fragment metricTypeFieldFragment on BrowserMetric {
  __isBrowserMetric: __typename
  eventType
}

fragment simpleEditThresholdItemFragment on AlertConfig {
  metricType
  percentile
  thresholdValue
  thresholdType
  priority
}

fragment simpleEditThresholdItem_metricData_Fragment on Metric {
  __isMetric: __typename
  ... on BrowserMetric {
    __isBrowserMetric: __typename
    eventType
  }
  ...metricTypeFieldFragment
}

fragment splitFieldFragment on BrowserMetric {
  __isBrowserMetric: __typename
  availableCohortTypes
}

fragment thresholdItem_alertConfig_Fragment on AlertConfig {
  id
  ...simpleEditThresholdItemFragment
  ...advancedEditThresholdItem_alertConfig_Fragment
}

fragment thresholdItem_metric_Fragment on Metric {
  __isMetric: __typename
  ...simpleEditThresholdItem_metricData_Fragment
  ...advancedEditThresholdItem_metricData_Fragment
}

fragment thresholdList_alertConfigs_Fragment on AlertConfig {
  id
  ...thresholdItem_alertConfig_Fragment
}

fragment thresholdList_metric_Fragment on Metric {
  __isMetric: __typename
  ... on BrowserMetric {
    __isBrowserMetric: __typename
    eventType
  }
  ...thresholdItem_metric_Fragment
}

fragment thresholdsSectionFragment on Metric {
  __isMetric: __typename
  ...thresholdList_metric_Fragment
  alertConfigs {
    id
    env
    pageLoadType
    metricType
    percentile
    cohortType
    cohortValue
    thresholdValue
    thresholdType
    comparisonType
    priority
    ignoreWeekend
    ...thresholdList_alertConfigs_Fragment
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "opsgenieTeamId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventType",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cohortType",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "mainEditAlertConfigModalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "metric",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/)
            ],
            "type": "BrowserMetric",
            "abstractKey": "__isBrowserMetric"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "thresholdsSectionFragment"
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
    "name": "mainEditAlertConfigModalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "metric",
        "plural": false,
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
            "concreteType": "AlertConfig",
            "kind": "LinkedField",
            "name": "alertConfigs",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "env",
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
                "name": "metricType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "percentile",
                "storageKey": null
              },
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cohortValue",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "thresholdValue",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "thresholdType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "comparisonType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "priority",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "ignoreWeekend",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "availableCohortTypes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "KnownCohortValues",
                "kind": "LinkedField",
                "name": "knownCohortValues",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cohortValues",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "BrowserMetric",
            "abstractKey": "__isBrowserMetric"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b2b016f1b4d8925cdd77a07bb8b97d77",
    "id": null,
    "metadata": {},
    "name": "mainEditAlertConfigModalQuery",
    "operationKind": "query",
    "text": "query mainEditAlertConfigModalQuery(\n  $id: ID!\n) {\n  metric(id: $id) {\n    __typename\n    opsgenieTeamId\n    ... on BrowserMetric {\n      __isBrowserMetric: __typename\n      eventType\n    }\n    ...thresholdsSectionFragment\n    id\n  }\n}\n\nfragment advancedEditThresholdItem_alertConfig_Fragment on AlertConfig {\n  env\n  pageLoadType\n  metricType\n  percentile\n  cohortType\n  cohortValue\n  thresholdValue\n  thresholdType\n  comparisonType\n  priority\n  ignoreWeekend\n}\n\nfragment advancedEditThresholdItem_metricData_Fragment on Metric {\n  __isMetric: __typename\n  ... on BrowserMetric {\n    __isBrowserMetric: __typename\n    eventType\n  }\n  ...splitFieldFragment\n  ...cohortFieldFragment\n  ...metricTypeFieldFragment\n}\n\nfragment cohortFieldFragment on BrowserMetric {\n  __isBrowserMetric: __typename\n  knownCohortValues {\n    cohortType\n    cohortValues\n  }\n}\n\nfragment metricTypeFieldFragment on BrowserMetric {\n  __isBrowserMetric: __typename\n  eventType\n}\n\nfragment simpleEditThresholdItemFragment on AlertConfig {\n  metricType\n  percentile\n  thresholdValue\n  thresholdType\n  priority\n}\n\nfragment simpleEditThresholdItem_metricData_Fragment on Metric {\n  __isMetric: __typename\n  ... on BrowserMetric {\n    __isBrowserMetric: __typename\n    eventType\n  }\n  ...metricTypeFieldFragment\n}\n\nfragment splitFieldFragment on BrowserMetric {\n  __isBrowserMetric: __typename\n  availableCohortTypes\n}\n\nfragment thresholdItem_alertConfig_Fragment on AlertConfig {\n  id\n  ...simpleEditThresholdItemFragment\n  ...advancedEditThresholdItem_alertConfig_Fragment\n}\n\nfragment thresholdItem_metric_Fragment on Metric {\n  __isMetric: __typename\n  ...simpleEditThresholdItem_metricData_Fragment\n  ...advancedEditThresholdItem_metricData_Fragment\n}\n\nfragment thresholdList_alertConfigs_Fragment on AlertConfig {\n  id\n  ...thresholdItem_alertConfig_Fragment\n}\n\nfragment thresholdList_metric_Fragment on Metric {\n  __isMetric: __typename\n  ... on BrowserMetric {\n    __isBrowserMetric: __typename\n    eventType\n  }\n  ...thresholdItem_metric_Fragment\n}\n\nfragment thresholdsSectionFragment on Metric {\n  __isMetric: __typename\n  ...thresholdList_metric_Fragment\n  alertConfigs {\n    id\n    env\n    pageLoadType\n    metricType\n    percentile\n    cohortType\n    cohortValue\n    thresholdValue\n    thresholdType\n    comparisonType\n    priority\n    ignoreWeekend\n    ...thresholdList_alertConfigs_Fragment\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e5005995f08a7ffc7d71394a93b3b3fa';
export default node;
