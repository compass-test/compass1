import { CompassEventType, CompassComponentType, CompassLinkType, CompassRelationshipType, CompassExternalAliasInput, CompassExternalAlias, QueryError } from "../../graphql-types";
declare const MOCK_COMPONENT_ID = "mock-component-id";
declare const MOCK_CLOUD_ID = "mock-cloud-id";
declare const MOCK_ERROR_TYPE = "MockErrorType";
declare const MOCK_ERROR_MESSAGE = "Mock error message";
declare const MOCK_GQL_ERROR: {
    message: string;
    extensions: {
        errorSource: string;
        classification: string;
    };
};
declare const MOCK_QUERY_ERROR: {
    __typename: QueryError;
    message: string;
    extensions: {
        errorType: string;
        statusCode: number;
    };
};
declare const MOCK_MUTATION_ERROR: {
    message: string;
    extensions: {
        errorType: string;
        statusCode: number;
    };
};
declare const MOCK_EXTERNAL_ALIAS: {
    externalId: string;
    externalSource: string;
};
declare const MOCK_EXTERNAL_ALIAS_ID: {
    externalAliasId: string;
    externalSource: string;
};
declare const MOCK_EXTERNAL_ALIAS_2: {
    externalId: string;
    externalSource: string;
};
declare const MOCK_EVENT_SOURCE_ID = "mock-event-source-id";
declare const MOCK_EVENT_SOURCE_ID_2 = "mock-event-source-id-2";
declare const MOCK_EXTERNAL_EVENT_SOURCE_ID = "mock-external-event-source-id";
declare const MOCK_EXTERNAL_EVENT_SOURCE_ID_2 = "mock-external-event-source-id-2";
declare const MOCK_EVENT_SOURCE: (externalEventSourceId?: string) => {
    eventType: CompassEventType;
    externalEventSourceId: string;
};
declare const MOCK_GET_EVENT_SOURCE: (externalEventSourceId?: string) => {
    id: string;
    eventType: CompassEventType;
    externalEventSourceId: string;
};
declare const MOCK_DATA_MANAGER_EXTERNAL_SOURCE_URL = "https://mock-data-manager-external-source.com";
declare const MOCK_LABEL = "mock-label";
declare const MOCK_LABEL_2 = "mock-label-2";
declare const MOCK_LINK: {
    name: string;
    type: CompassLinkType;
    url: string;
};
declare const MOCK_LINK_2: {
    name: string;
    type: CompassLinkType;
    url: string;
};
declare const MOCK_GET_LINK: {
    id: string;
    name: string;
    type: CompassLinkType;
    url: string;
};
declare const MOCK_GET_LINK_2: {
    id: string;
    name: string;
    type: CompassLinkType;
    url: string;
};
declare const MOCK_RELATIONSHIP: {
    nodeId: string;
    type: CompassRelationshipType;
};
declare const MOCK_RELATIONSHIP_2: {
    nodeId: string;
    type: CompassRelationshipType;
};
declare const MOCK_BASE_COMPONENT: {
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
};
declare const MOCK_BASE_COMPONENT_WITHOUT_FIELDS: {
    name: string;
    description: string;
    type: CompassComponentType;
};
declare const MOCK_BASE_COMPONENT_WITH_ID: {
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
    id: string;
};
declare const MOCK_CHANGED_COMPONENT: {
    description: string;
    links: {
        name: string;
        type: CompassLinkType;
        url: string;
    }[];
    relationships: {
        nodeId: string;
        type: CompassRelationshipType;
    }[];
    labels: string[];
    name: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
    id: string;
};
declare const MOCK_GET_CHANGED_COMPONENT: {
    description: string;
    links: {
        id: string;
        name: string;
        type: CompassLinkType;
        url: string;
    }[];
    relationships: {
        nodeId: string;
        type: CompassRelationshipType;
    }[];
    labels: string[];
    name: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
    id: string;
};
declare const MOCK_GET_BASE_COMPONENT_WITH_EXTERNAL_ALIAS: {
    externalAlias: {
        externalAliasId: string;
        externalSource: string;
    }[];
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
    id: string;
};
declare const MOCK_COMPLEX_COMPONENT: {
    links: {
        name: string;
        type: CompassLinkType;
        url: string;
    }[];
    relationships: {
        nodeId: string;
        type: CompassRelationshipType;
    }[];
    labels: string[];
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
};
declare const MOCK_GET_COMPLEX_COMPONENT: {
    links: {
        id: string;
        name: string;
        type: CompassLinkType;
        url: string;
    }[];
    relationships: {
        nodeId: string;
        type: CompassRelationshipType;
    }[];
    labels: string[];
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
    id: string;
};
declare const MOCK_COMPONENT_WITH_EVENT_SOURCE: {
    eventSources: {
        eventType: CompassEventType;
        externalEventSourceId: string;
    }[];
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
};
declare const MOCK_GET_COMPONENT_WITH_EVENT_SOURCE: {
    eventSources: {
        id: string;
        eventType: CompassEventType;
        externalEventSourceId: string;
    }[];
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
    id: string;
};
declare const MOCK_GET_COMPONENT_WITH_EVENT_SOURCES: {
    eventSources: {
        id: string;
        eventType: CompassEventType;
        externalEventSourceId: string;
    }[];
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
    id: string;
};
declare const MOCK_COMPONENT_WITH_DATA_MANAGER: {
    dataManager: {
        externalSourceURL: string;
    };
    links: {
        name: string;
        type: CompassLinkType;
        url: string;
    }[];
    relationships: {
        nodeId: string;
        type: CompassRelationshipType;
    }[];
    labels: string[];
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
};
declare const MOCK_GET_COMPONENT_WITH_DATA_MANAGER: {
    dataManager: {
        externalSourceURL: string;
    };
    links: {
        id: string;
        name: string;
        type: CompassLinkType;
        url: string;
    }[];
    relationships: {
        nodeId: string;
        type: CompassRelationshipType;
    }[];
    labels: string[];
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
    id: string;
};
declare const MOCK_COMPONENT_WITH_EMPTY_DATA_MANAGER: {
    dataManager: any;
    links: {
        name: string;
        type: CompassLinkType;
        url: string;
    }[];
    relationships: {
        nodeId: string;
        type: CompassRelationshipType;
    }[];
    labels: string[];
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
};
declare const MOCK_COMPONENT_WITH_NULL_DATA_MANAGER: {
    dataManager: any;
    links: {
        name: string;
        type: CompassLinkType;
        url: string;
    }[];
    relationships: {
        nodeId: string;
        type: CompassRelationshipType;
    }[];
    labels: string[];
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
};
declare const MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER: {
    dataManager: any;
    links: {
        id: string;
        name: string;
        type: CompassLinkType;
        url: string;
    }[];
    relationships: {
        nodeId: string;
        type: CompassRelationshipType;
    }[];
    labels: string[];
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
    id: string;
};
declare const MOCK_COMPONENT_WITH_EXTERNAL_ALIAS: (externalAlias?: CompassExternalAliasInput) => {
    externalAlias: CompassExternalAliasInput;
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
};
declare const MOCK_GET_COMPONENT_WITH_EXTERNAL_ALIAS: (externalAlias?: CompassExternalAlias) => {
    externalAlias: CompassExternalAlias;
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
    id: string;
};
declare const MOCK_COMPONENT_WITH_EXTERNAL_ALIASES: (externalAliases?: Array<CompassExternalAliasInput>) => {
    externalAliases: CompassExternalAliasInput[];
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
};
declare const MOCK_GET_COMPONENT_WITH_EXTERNAL_ALIASES: (externalAliases?: Array<CompassExternalAlias>) => {
    externalAliases: CompassExternalAlias[];
    name: string;
    description: string;
    type: CompassComponentType;
    fields: {
        tier: string[];
    };
    id: string;
};
declare const MOCK_COMPONENT_AGG: any;
export { MOCK_BASE_COMPONENT, MOCK_BASE_COMPONENT_WITHOUT_FIELDS, MOCK_COMPONENT_ID, MOCK_CLOUD_ID, MOCK_EXTERNAL_ALIAS, MOCK_EVENT_SOURCE_ID, MOCK_EXTERNAL_EVENT_SOURCE_ID, MOCK_EVENT_SOURCE, MOCK_GET_EVENT_SOURCE, MOCK_GET_BASE_COMPONENT_WITH_EXTERNAL_ALIAS, MOCK_GET_COMPONENT_WITH_EXTERNAL_ALIASES, MOCK_COMPLEX_COMPONENT, MOCK_COMPONENT_WITH_EVENT_SOURCE, MOCK_COMPONENT_WITH_DATA_MANAGER, MOCK_EXTERNAL_EVENT_SOURCE_ID_2, MOCK_EVENT_SOURCE_ID_2, MOCK_GET_COMPONENT_WITH_EVENT_SOURCE, MOCK_GET_COMPONENT_WITH_EVENT_SOURCES, MOCK_GET_COMPONENT_WITH_DATA_MANAGER, MOCK_BASE_COMPONENT_WITH_ID, MOCK_CHANGED_COMPONENT, MOCK_GET_CHANGED_COMPONENT, MOCK_COMPONENT_WITH_EMPTY_DATA_MANAGER, MOCK_COMPONENT_WITH_NULL_DATA_MANAGER, MOCK_COMPONENT_WITH_EXTERNAL_ALIAS, MOCK_GET_COMPONENT_WITH_EXTERNAL_ALIAS, MOCK_COMPONENT_WITH_EXTERNAL_ALIASES, MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER, MOCK_GET_COMPLEX_COMPONENT, MOCK_EXTERNAL_ALIAS_2, MOCK_EXTERNAL_ALIAS_ID, MOCK_LINK, MOCK_LINK_2, MOCK_GET_LINK, MOCK_GET_LINK_2, MOCK_RELATIONSHIP, MOCK_RELATIONSHIP_2, MOCK_LABEL, MOCK_LABEL_2, MOCK_DATA_MANAGER_EXTERNAL_SOURCE_URL, MOCK_ERROR_TYPE, MOCK_ERROR_MESSAGE, MOCK_QUERY_ERROR, MOCK_MUTATION_ERROR, MOCK_COMPONENT_AGG, MOCK_GQL_ERROR };
