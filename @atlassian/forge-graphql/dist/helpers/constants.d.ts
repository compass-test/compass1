declare const COMPOUND_MUTATION_NAME = "compoundMutation";
declare const DETACH_EVENT_SOURCES_MUTATION_NAME = "detachEventSources";
declare const EVENTS_UNIMPLEMENTED = "Events API is not implemented.";
declare const TIER_MISSING_VALUE = "Tier must have a valid value";
declare const COMPASS_CATALOG_SCHEMA_CHANGE = "The compass catalog schema has changed. Try upgrading SDK package version.";
declare const FORGE_GRAPHQL_SDK_ERROR_SOURCE = "FORGE_GRAPHQL";
declare const NOT_IMPLEMENTED_ERROR_TYPE = "NOT_IMPLEMENTED";
declare const NOT_FOUND_ERROR_TYPE = "NOT_FOUND";
declare const INTERNAL_SERVER_ERROR_TYPE = "INTERNAL_SERVER_ERROR";
declare const SDK_SCHEMA_ERROR: {
    message: string;
    errorSource: string;
    errorType: string;
    statusCode: number;
};
declare const COMPONENT_NOT_FOUND = "Component not found";
declare const GRAPHQL_GATEWAY_SOURCE = "GRAPHQL_GATEWAY";
declare const QUERY_ERROR = "QueryError";
export { COMPOUND_MUTATION_NAME, DETACH_EVENT_SOURCES_MUTATION_NAME, EVENTS_UNIMPLEMENTED, COMPASS_CATALOG_SCHEMA_CHANGE, FORGE_GRAPHQL_SDK_ERROR_SOURCE, NOT_IMPLEMENTED_ERROR_TYPE, NOT_FOUND_ERROR_TYPE, INTERNAL_SERVER_ERROR_TYPE, SDK_SCHEMA_ERROR, COMPONENT_NOT_FOUND, TIER_MISSING_VALUE, GRAPHQL_GATEWAY_SOURCE, QUERY_ERROR };
