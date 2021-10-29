import {
  ContextId,
  ExtensionId,
  EnvironmentType,
} from '@atlassian/forge-ui-types';
import { GraphQLError } from 'graphql';

export interface GQLUser {
  accountId: string;
  name: string;
  picture: string;
  __typename?: 'GQLUser';
}

export interface GQLExtension {
  id: string;
  environmentId: string;
  environmentType: EnvironmentType;
  properties: any;
  type: string;
  installationId: string;
  appVersion?: string;
  appOwner?: GQLUser;
  consentUrl?: string;
  currentUserConsent?: {
    user: {
      aaid: GQLUser['accountId'];
    };
    appEnvironmentVersion: {
      id: string;
    };
    consentedAt: string;
  };
  requiresUserConsent?: boolean;

  __typename?: 'GQLExtension';
}

export interface GQLExtensionContextExtensionsByTypeVariables {
  type: string;
}

export interface GQLExtensionContextsVariables {
  contextIds: ContextId[];
}

export interface GQLExtensionContext<TExtension = GQLExtension> {
  id: string;
  extensionsByType: TExtension[];
  __typename?: 'GQLExtensionContext';
}

export interface GQLCustomUITunnelDefinition {
  resourceKey: string;
  tunnelUrl: string;
}

export interface GQLAppTunnels {
  faasTunnelUrl: string;
  customUI: GQLCustomUITunnelDefinition[];
  __typename?: 'GQLAppTunnels';
}

export interface GQLMutationResponse {
  success: boolean;
  errors: GQLMutationError[] | null;
}

export interface GQLMutationError<Fields = unknown> {
  message: string;
  extensions: {
    statusCode: number;
    errorType: string;
    fields?: Fields;
  };
}

export interface GQLEffect {
  type: string;
  [key: string]: any;
}

export interface GQLAuxEffectsInvocationPayload {
  config?: object;
  context: object;
  effects: GQLEffect[];
  state: object;
}

export interface GQLInvokeAuxEffectsInput {
  contextIds: ContextId[];
  extensionId: ExtensionId;
  payload: GQLAuxEffectsInvocationPayload;
  function?: string;
}

export interface GQLAuxEffectsResult {
  effects: GQLEffect[];
  __typename?: 'GQLAuxEffectsResult';
}

export interface GQLInvokeAuxEffectsResponse extends GQLMutationResponse {
  result?: GQLAuxEffectsResult;
}

export interface GQLInvokeExtensionPayload {
  call: {
    functionKey: string;
    payload: object;
  };
  context: {
    [key: string]: any;
  };
}

export interface GQLInvokeExtensionInput {
  contextIds: ContextId[];
  extensionId: ExtensionId;
  payload: GQLInvokeExtensionPayload;
  entryPoint: 'resolver';
}

export interface GQLInvokeExtensionResponse extends GQLMutationResponse {
  response: {
    body: any;
  };
  errors: Array<GQLMutationError<{ authInfoUrl?: string }>>;
}

export interface GQLUserAuthTokenForExtensionInput {
  extensionId: ExtensionId;
}

export interface GQLUserAuthTokenForExtensionResponse
  extends GQLMutationResponse {
  authToken?: {
    token: string;
    ttl: number;
  };
}

export interface GQLUnderlyingServiceError extends GraphQLError {
  extensions: {
    errorSource: 'UNDERLYING_SERVICE';
  };
}

export interface GQLGatewayError extends GraphQLError {
  extensions: {
    errorSource: 'GRAPHQL_GATEWAY';
  };
}

export const isGQLGatewayError = (err: GraphQLError): err is GQLGatewayError =>
  err.extensions &&
  err.extensions.errorSource &&
  err.extensions.errorSource === 'GRAPHQL_GATEWAY';

export const isGQLUnderlyingServiceError = (
  err: GraphQLError,
): err is GQLUnderlyingServiceError =>
  err.extensions &&
  err.extensions.errorSource &&
  err.extensions.errorSource === 'UNDERLYING_SERVICE';

export type {
  // eslint-disable-next-line no-undef
  GQLExtension as Extension,
  // eslint-disable-next-line no-undef
  GQLExtensionContext as ExtensionContext,
};
