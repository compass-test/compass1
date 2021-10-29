"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOCK_GQL_ERROR = exports.MOCK_COMPONENT_AGG = exports.MOCK_MUTATION_ERROR = exports.MOCK_QUERY_ERROR = exports.MOCK_ERROR_MESSAGE = exports.MOCK_ERROR_TYPE = exports.MOCK_DATA_MANAGER_EXTERNAL_SOURCE_URL = exports.MOCK_LABEL_2 = exports.MOCK_LABEL = exports.MOCK_RELATIONSHIP_2 = exports.MOCK_RELATIONSHIP = exports.MOCK_GET_LINK_2 = exports.MOCK_GET_LINK = exports.MOCK_LINK_2 = exports.MOCK_LINK = exports.MOCK_EXTERNAL_ALIAS_ID = exports.MOCK_EXTERNAL_ALIAS_2 = exports.MOCK_GET_COMPLEX_COMPONENT = exports.MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER = exports.MOCK_COMPONENT_WITH_EXTERNAL_ALIASES = exports.MOCK_GET_COMPONENT_WITH_EXTERNAL_ALIAS = exports.MOCK_COMPONENT_WITH_EXTERNAL_ALIAS = exports.MOCK_COMPONENT_WITH_NULL_DATA_MANAGER = exports.MOCK_COMPONENT_WITH_EMPTY_DATA_MANAGER = exports.MOCK_GET_CHANGED_COMPONENT = exports.MOCK_CHANGED_COMPONENT = exports.MOCK_BASE_COMPONENT_WITH_ID = exports.MOCK_GET_COMPONENT_WITH_DATA_MANAGER = exports.MOCK_GET_COMPONENT_WITH_EVENT_SOURCES = exports.MOCK_GET_COMPONENT_WITH_EVENT_SOURCE = exports.MOCK_EVENT_SOURCE_ID_2 = exports.MOCK_EXTERNAL_EVENT_SOURCE_ID_2 = exports.MOCK_COMPONENT_WITH_DATA_MANAGER = exports.MOCK_COMPONENT_WITH_EVENT_SOURCE = exports.MOCK_COMPLEX_COMPONENT = exports.MOCK_GET_COMPONENT_WITH_EXTERNAL_ALIASES = exports.MOCK_GET_BASE_COMPONENT_WITH_EXTERNAL_ALIAS = exports.MOCK_GET_EVENT_SOURCE = exports.MOCK_EVENT_SOURCE = exports.MOCK_EXTERNAL_EVENT_SOURCE_ID = exports.MOCK_EVENT_SOURCE_ID = exports.MOCK_EXTERNAL_ALIAS = exports.MOCK_CLOUD_ID = exports.MOCK_COMPONENT_ID = exports.MOCK_BASE_COMPONENT_WITHOUT_FIELDS = exports.MOCK_BASE_COMPONENT = void 0;
const graphql_types_1 = require("../../graphql-types");
const helpers_1 = require("../../helpers");
// Generic mocks
const MOCK_COMPONENT_ID = 'mock-component-id';
exports.MOCK_COMPONENT_ID = MOCK_COMPONENT_ID;
const MOCK_COMPONENT_ID_2 = 'mock-component-id-2';
const MOCK_COMPONENT_ID_3 = 'mock-component-id-3';
const MOCK_CLOUD_ID = 'mock-cloud-id';
exports.MOCK_CLOUD_ID = MOCK_CLOUD_ID;
const MOCK_COMPONENT_NAME = 'mock-component-name';
const MOCK_COMPONENT_DESC = 'mock component description';
const MOCK_COMPONENT_DESC_2 = 'mock component description 2';
// Errors
const MOCK_ERROR_TYPE = 'MockErrorType';
exports.MOCK_ERROR_TYPE = MOCK_ERROR_TYPE;
const MOCK_ERROR_MESSAGE = 'Mock error message';
exports.MOCK_ERROR_MESSAGE = MOCK_ERROR_MESSAGE;
const MOCK_GQL_ERROR = {
    message: MOCK_ERROR_MESSAGE,
    extensions: {
        errorSource: helpers_1.GRAPHQL_GATEWAY_SOURCE,
        classification: MOCK_ERROR_TYPE
    }
};
exports.MOCK_GQL_ERROR = MOCK_GQL_ERROR;
const MOCK_QUERY_ERROR = {
    __typename: helpers_1.QUERY_ERROR,
    message: MOCK_ERROR_MESSAGE,
    extensions: {
        errorType: MOCK_ERROR_TYPE,
        statusCode: 500
    }
};
exports.MOCK_QUERY_ERROR = MOCK_QUERY_ERROR;
const MOCK_MUTATION_ERROR_MESSAGE = 'Mock mutation error message';
const MOCK_MUTATION_ERROR = {
    message: MOCK_MUTATION_ERROR_MESSAGE,
    extensions: {
        errorType: MOCK_ERROR_TYPE,
        statusCode: 501
    }
};
exports.MOCK_MUTATION_ERROR = MOCK_MUTATION_ERROR;
// External Alias
const MOCK_EXTERNAL_ALIAS = {
    externalId: 'mock-external-id',
    externalSource: 'mock-external-source'
};
exports.MOCK_EXTERNAL_ALIAS = MOCK_EXTERNAL_ALIAS;
const MOCK_EXTERNAL_ALIAS_ID = {
    externalAliasId: 'mock-external-id',
    externalSource: 'mock-external-source'
};
exports.MOCK_EXTERNAL_ALIAS_ID = MOCK_EXTERNAL_ALIAS_ID;
const MOCK_EXTERNAL_ALIAS_2 = {
    externalId: 'mock-external-id-2',
    externalSource: 'mock-external-source-2'
};
exports.MOCK_EXTERNAL_ALIAS_2 = MOCK_EXTERNAL_ALIAS_2;
// Event sources
const MOCK_EVENT_SOURCE_ID = 'mock-event-source-id';
exports.MOCK_EVENT_SOURCE_ID = MOCK_EVENT_SOURCE_ID;
const MOCK_EVENT_SOURCE_ID_2 = 'mock-event-source-id-2';
exports.MOCK_EVENT_SOURCE_ID_2 = MOCK_EVENT_SOURCE_ID_2;
const MOCK_EXTERNAL_EVENT_SOURCE_ID = 'mock-external-event-source-id';
exports.MOCK_EXTERNAL_EVENT_SOURCE_ID = MOCK_EXTERNAL_EVENT_SOURCE_ID;
const MOCK_EXTERNAL_EVENT_SOURCE_ID_2 = 'mock-external-event-source-id-2';
exports.MOCK_EXTERNAL_EVENT_SOURCE_ID_2 = MOCK_EXTERNAL_EVENT_SOURCE_ID_2;
const MOCK_EVENT_SOURCE = (externalEventSourceId = MOCK_EXTERNAL_EVENT_SOURCE_ID) => ({
    eventType: graphql_types_1.CompassEventType.Deployment,
    externalEventSourceId,
});
exports.MOCK_EVENT_SOURCE = MOCK_EVENT_SOURCE;
const MOCK_GET_EVENT_SOURCE = (externalEventSourceId = MOCK_EXTERNAL_EVENT_SOURCE_ID) => ({
    id: MOCK_EVENT_SOURCE_ID,
    eventType: graphql_types_1.CompassEventType.Deployment,
    externalEventSourceId,
});
exports.MOCK_GET_EVENT_SOURCE = MOCK_GET_EVENT_SOURCE;
// Data manager
const MOCK_DATA_MANAGER_EXTERNAL_SOURCE_URL = 'https://mock-data-manager-external-source.com';
exports.MOCK_DATA_MANAGER_EXTERNAL_SOURCE_URL = MOCK_DATA_MANAGER_EXTERNAL_SOURCE_URL;
const MOCK_DATA_MANAGER = {
    externalSourceURL: MOCK_DATA_MANAGER_EXTERNAL_SOURCE_URL
};
// Labels
const MOCK_LABEL = 'mock-label';
exports.MOCK_LABEL = MOCK_LABEL;
const MOCK_LABEL_2 = 'mock-label-2';
exports.MOCK_LABEL_2 = MOCK_LABEL_2;
// Links
const MOCK_LINK = {
    name: 'mock-link-name',
    type: graphql_types_1.CompassLinkType.Document,
    url: 'https://mock-link-url.com'
};
exports.MOCK_LINK = MOCK_LINK;
const MOCK_LINK_2 = {
    name: 'mock-link-name-2',
    type: graphql_types_1.CompassLinkType.Document,
    url: 'https://mock-link-url-2.com'
};
exports.MOCK_LINK_2 = MOCK_LINK_2;
const MOCK_GET_LINK = {
    id: 'mock-link-id',
    name: 'mock-link-name',
    type: graphql_types_1.CompassLinkType.Document,
    url: 'https://mock-link-url.com'
};
exports.MOCK_GET_LINK = MOCK_GET_LINK;
const MOCK_GET_LINK_2 = {
    id: 'mock-link-id-2',
    name: 'mock-link-name-2',
    type: graphql_types_1.CompassLinkType.Document,
    url: 'https://mock-link-url-2.com'
};
exports.MOCK_GET_LINK_2 = MOCK_GET_LINK_2;
// Relationships
const MOCK_RELATIONSHIP = {
    nodeId: MOCK_COMPONENT_ID_2,
    type: graphql_types_1.CompassRelationshipType.DependsOn
};
exports.MOCK_RELATIONSHIP = MOCK_RELATIONSHIP;
const MOCK_RELATIONSHIP_2 = {
    nodeId: MOCK_COMPONENT_ID_3,
    type: graphql_types_1.CompassRelationshipType.DependsOn
};
exports.MOCK_RELATIONSHIP_2 = MOCK_RELATIONSHIP_2;
// Components
const MOCK_BASE_COMPONENT = {
    name: MOCK_COMPONENT_NAME,
    description: MOCK_COMPONENT_DESC,
    type: graphql_types_1.CompassComponentType.Service,
    fields: {
        tier: ['1']
    }
};
exports.MOCK_BASE_COMPONENT = MOCK_BASE_COMPONENT;
const MOCK_BASE_COMPONENT_WITHOUT_FIELDS = {
    name: MOCK_COMPONENT_NAME,
    description: MOCK_COMPONENT_DESC,
    type: graphql_types_1.CompassComponentType.Application,
};
exports.MOCK_BASE_COMPONENT_WITHOUT_FIELDS = MOCK_BASE_COMPONENT_WITHOUT_FIELDS;
const MOCK_BASE_COMPONENT_WITH_ID = {
    id: MOCK_COMPONENT_ID,
    ...MOCK_BASE_COMPONENT
};
exports.MOCK_BASE_COMPONENT_WITH_ID = MOCK_BASE_COMPONENT_WITH_ID;
const MOCK_CHANGED_COMPONENT = {
    ...MOCK_BASE_COMPONENT_WITH_ID,
    description: MOCK_COMPONENT_DESC_2,
    links: [MOCK_LINK, MOCK_LINK_2],
    relationships: [MOCK_RELATIONSHIP, MOCK_RELATIONSHIP_2],
    labels: [MOCK_LABEL, MOCK_LABEL_2],
};
exports.MOCK_CHANGED_COMPONENT = MOCK_CHANGED_COMPONENT;
const MOCK_GET_CHANGED_COMPONENT = {
    ...MOCK_BASE_COMPONENT_WITH_ID,
    description: MOCK_COMPONENT_DESC_2,
    links: [MOCK_GET_LINK, MOCK_GET_LINK_2],
    relationships: [MOCK_RELATIONSHIP, MOCK_RELATIONSHIP_2],
    labels: [MOCK_LABEL, MOCK_LABEL_2],
};
exports.MOCK_GET_CHANGED_COMPONENT = MOCK_GET_CHANGED_COMPONENT;
const MOCK_GET_BASE_COMPONENT_WITH_EXTERNAL_ALIAS = {
    ...MOCK_BASE_COMPONENT_WITH_ID,
    externalAlias: [MOCK_EXTERNAL_ALIAS_ID]
};
exports.MOCK_GET_BASE_COMPONENT_WITH_EXTERNAL_ALIAS = MOCK_GET_BASE_COMPONENT_WITH_EXTERNAL_ALIAS;
const MOCK_COMPLEX_COMPONENT = {
    ...MOCK_BASE_COMPONENT,
    links: [MOCK_LINK, MOCK_LINK_2],
    relationships: [MOCK_RELATIONSHIP, MOCK_RELATIONSHIP_2],
    labels: [MOCK_LABEL, MOCK_LABEL_2],
};
exports.MOCK_COMPLEX_COMPONENT = MOCK_COMPLEX_COMPONENT;
const MOCK_GET_COMPLEX_COMPONENT = {
    ...MOCK_BASE_COMPONENT_WITH_ID,
    links: [MOCK_GET_LINK, MOCK_GET_LINK_2],
    relationships: [MOCK_RELATIONSHIP, MOCK_RELATIONSHIP_2],
    labels: [MOCK_LABEL, MOCK_LABEL_2],
};
exports.MOCK_GET_COMPLEX_COMPONENT = MOCK_GET_COMPLEX_COMPONENT;
const MOCK_COMPONENT_WITH_EVENT_SOURCE = {
    ...MOCK_BASE_COMPONENT,
    eventSources: [
        MOCK_EVENT_SOURCE()
    ]
};
exports.MOCK_COMPONENT_WITH_EVENT_SOURCE = MOCK_COMPONENT_WITH_EVENT_SOURCE;
const MOCK_GET_COMPONENT_WITH_EVENT_SOURCE = {
    ...MOCK_BASE_COMPONENT_WITH_ID,
    eventSources: [
        {
            ...MOCK_EVENT_SOURCE(),
            id: MOCK_EVENT_SOURCE_ID
        }
    ]
};
exports.MOCK_GET_COMPONENT_WITH_EVENT_SOURCE = MOCK_GET_COMPONENT_WITH_EVENT_SOURCE;
const MOCK_GET_COMPONENT_WITH_EVENT_SOURCES = {
    ...MOCK_BASE_COMPONENT_WITH_ID,
    eventSources: [{
            ...MOCK_EVENT_SOURCE(),
            id: MOCK_EVENT_SOURCE_ID
        }, {
            ...MOCK_EVENT_SOURCE(MOCK_EXTERNAL_EVENT_SOURCE_ID_2),
            id: MOCK_EVENT_SOURCE_ID_2
        }]
};
exports.MOCK_GET_COMPONENT_WITH_EVENT_SOURCES = MOCK_GET_COMPONENT_WITH_EVENT_SOURCES;
const MOCK_COMPONENT_WITH_DATA_MANAGER = {
    ...MOCK_COMPLEX_COMPONENT,
    dataManager: MOCK_DATA_MANAGER
};
exports.MOCK_COMPONENT_WITH_DATA_MANAGER = MOCK_COMPONENT_WITH_DATA_MANAGER;
const MOCK_GET_COMPONENT_WITH_DATA_MANAGER = {
    ...MOCK_GET_COMPLEX_COMPONENT,
    dataManager: MOCK_DATA_MANAGER
};
exports.MOCK_GET_COMPONENT_WITH_DATA_MANAGER = MOCK_GET_COMPONENT_WITH_DATA_MANAGER;
const MOCK_COMPONENT_WITH_EMPTY_DATA_MANAGER = {
    ...MOCK_COMPLEX_COMPONENT,
    dataManager: {}
};
exports.MOCK_COMPONENT_WITH_EMPTY_DATA_MANAGER = MOCK_COMPONENT_WITH_EMPTY_DATA_MANAGER;
const MOCK_COMPONENT_WITH_NULL_DATA_MANAGER = {
    ...MOCK_COMPLEX_COMPONENT,
    dataManager: null
};
exports.MOCK_COMPONENT_WITH_NULL_DATA_MANAGER = MOCK_COMPONENT_WITH_NULL_DATA_MANAGER;
const MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER = {
    ...MOCK_GET_COMPLEX_COMPONENT,
    dataManager: null
};
exports.MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER = MOCK_GET_COMPONENT_WITH_NULL_DATA_MANAGER;
const MOCK_COMPONENT_WITH_EXTERNAL_ALIAS = (externalAlias) => ({
    ...MOCK_BASE_COMPONENT,
    externalAlias,
});
exports.MOCK_COMPONENT_WITH_EXTERNAL_ALIAS = MOCK_COMPONENT_WITH_EXTERNAL_ALIAS;
const MOCK_GET_COMPONENT_WITH_EXTERNAL_ALIAS = (externalAlias) => ({
    ...MOCK_BASE_COMPONENT_WITH_ID,
    externalAlias,
});
exports.MOCK_GET_COMPONENT_WITH_EXTERNAL_ALIAS = MOCK_GET_COMPONENT_WITH_EXTERNAL_ALIAS;
const MOCK_COMPONENT_WITH_EXTERNAL_ALIASES = (externalAliases) => ({
    ...MOCK_BASE_COMPONENT,
    externalAliases,
});
exports.MOCK_COMPONENT_WITH_EXTERNAL_ALIASES = MOCK_COMPONENT_WITH_EXTERNAL_ALIASES;
const MOCK_GET_COMPONENT_WITH_EXTERNAL_ALIASES = (externalAliases) => ({
    ...MOCK_BASE_COMPONENT_WITH_ID,
    externalAliases,
});
exports.MOCK_GET_COMPONENT_WITH_EXTERNAL_ALIASES = MOCK_GET_COMPONENT_WITH_EXTERNAL_ALIASES;
const MOCK_COMPONENT_AGG = {
    ...MOCK_BASE_COMPONENT,
    fields: [],
    labels: [MOCK_LABEL],
    links: [MOCK_LINK],
    relationships: [MOCK_RELATIONSHIP],
    dataManager: {
        ecosystemAppId: 'mock-app-id',
        externalSourceURL: MOCK_DATA_MANAGER_EXTERNAL_SOURCE_URL,
        lastSyncEvents: []
    },
    eventSources: [{
            eventType: graphql_types_1.CompassEventType.Deployment,
            externalEventSourceId: MOCK_EXTERNAL_EVENT_SOURCE_ID
        }],
    externalAliases: [MOCK_EXTERNAL_ALIAS]
};
exports.MOCK_COMPONENT_AGG = MOCK_COMPONENT_AGG;
//# sourceMappingURL=constants.js.map