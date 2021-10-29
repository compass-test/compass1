import { CompassLink, CompassExternalAliasInput, AttachCompassComponentDataManagerInput, CreateEventSourceInput, CompassRelationshipType, CompassComponentType, EventSource, CompassComponentLabel, CompassExternalAlias, CompassRelationship } from './graphql-types';
interface AddEventSourceInput {
    componentId: string;
    eventSource: CreateEventSourceInput;
}
interface UpdateEventSourcesInput {
    componentId: string;
    oldEventSources: Array<EventSource>;
    newEventSources: Array<CreateEventSourceInput>;
}
declare type CreateLinkInput = Pick<CompassLink, 'name' | 'type' | 'url'>;
declare type Link = Pick<CompassLink, 'id' | 'name' | 'type' | 'url'>;
interface Relationship {
    nodeId: string;
    type: CompassRelationshipType;
}
declare type DataManagerInput = Pick<AttachCompassComponentDataManagerInput, 'externalSourceURL'>;
interface Component {
    id: string;
    name: string;
    type: CompassComponentType;
    description?: string;
    fields?: Record<string, object>;
    ownerId?: string;
    links?: Array<Link>;
    relationships?: Array<Relationship>;
    labels?: Array<string>;
    dataManager?: DataManagerInput;
    eventSources?: Array<CreateEventSourceInput>;
    externalAliases?: Array<CompassExternalAlias>;
}
interface BaseComponentInput {
    name?: string;
    description?: string;
    fields?: Record<string, Array<string>>;
    ownerId?: string;
    links?: Array<CreateLinkInput>;
    relationships?: Array<Relationship>;
    labels?: Array<string>;
    dataManager?: DataManagerInput;
    externalAlias?: CompassExternalAliasInput;
    eventSources?: Array<CreateEventSourceInput>;
}
interface GqlError {
    message: string;
    extensions?: {
        errorSource: string;
        classification: string;
    };
}
interface MutationError {
    message: string;
    extensions?: {
        statusCode: number;
        errorType: string;
    };
}
interface SdkError {
    message: string;
    statusCode?: number;
    errorType?: string;
    errorSource?: string;
}
interface UpdateBaseComponentOptions {
    transformFields: boolean;
}
interface SyncComponentByExternalAliasInput extends BaseComponentInput {
    cloudId: string;
    externalAlias: CompassExternalAliasInput;
    name: string;
    type: CompassComponentType;
    links?: Array<Link | CreateLinkInput>;
    eventSources?: Array<EventSource | CreateEventSourceInput>;
    options?: {
        createComponentIfNotFound: boolean;
    };
}
interface SyncComponentByExternalAliasVariables {
    cloudId: string;
    externalAlias: CompassExternalAliasInput;
    newComponent: Component;
    options: {
        createComponentIfNotFound: boolean;
    };
}
interface CreateComponentInput extends BaseComponentInput {
    cloudId: string;
    name: string;
    type: CompassComponentType;
}
interface UpdateComponentInput extends BaseComponentInput {
    id: string;
    currentComponent?: Component;
    links?: Array<Link | CreateLinkInput>;
    eventSources?: Array<EventSource | CreateEventSourceInput>;
}
interface EventSourcesPayload {
    eventSources?: Array<EventSource>;
}
interface EventSourcePayload {
    eventSource?: EventSource;
}
interface ApiPayload<T = undefined> {
    errors: Array<SdkError>;
    success: boolean;
    data?: T;
}
interface LabelsPayload {
    labelNames: Array<CompassComponentLabel>;
}
interface ComponentPayload {
    component: Component | null;
}
interface ExternalAliasPayload {
    externalAlias: CompassExternalAlias;
}
interface LinkPayload {
    link: CompassLink;
}
interface RelationshipPayload {
    relationship: CompassRelationship;
}
interface IdPayload {
    id: string;
}
export { Component, SyncComponentByExternalAliasVariables, DataManagerInput, Link, SyncComponentByExternalAliasInput, CreateComponentInput, UpdateComponentInput, Relationship, AddEventSourceInput, UpdateBaseComponentOptions, UpdateEventSourcesInput, ApiPayload, ComponentPayload, EventSourcesPayload, EventSourcePayload, GqlError, MutationError, SdkError, LabelsPayload, ExternalAliasPayload, LinkPayload, RelationshipPayload, IdPayload, CreateLinkInput, };
