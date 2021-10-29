import gql from 'graphql-tag';
import { useContext } from 'react';
import { useCallbackOne as useCallback } from 'use-memo-one';
import {
  ForgeEffectsInvoker,
  ExtensionInstanceIds,
} from '@atlassian/forge-ui-types';
import { useMutation } from '@apollo/react-hooks';
import {
  GQLInvokeAuxEffectsInput,
  GQLInvokeAuxEffectsResponse,
  isGQLUnderlyingServiceError,
  isGQLGatewayError,
} from '../graphql/types';
import { createAuxEffectsInvoker } from './lib/createAuxEffectsInvoker';
import { MetalClientContext, MetalClientValueProps } from '../../context';
import { catalog } from '@atlassiansox/metal-client';
import { ApolloError } from 'apollo-client';
import { ErrorMetricName } from '@atlassiansox/metal-client/dist/client/es/catalog';

export const invokeAuxEffectsMutation = gql`
  mutation forge_ui_invokeAuxEffects($input: InvokeAuxEffectsInput!) {
    invokeAuxEffects(input: $input) {
      success
      errors {
        message
        extensions {
          errorType
          statusCode
        }
      }
      result {
        effects
      }
    }
  }
`;

export class APIError extends Error {
  constructor(message: string) {
    super(message);
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export interface MutationVariables {
  input: GQLInvokeAuxEffectsInput;
}

export interface MutationData {
  invokeAuxEffects: GQLInvokeAuxEffectsResponse;
}

function getMetricNameFromApolloError(error: ApolloError): ErrorMetricName {
  const err = error.graphQLErrors.find(
    (err) => isGQLUnderlyingServiceError(err) || isGQLGatewayError(err),
  );

  return err
    ? isGQLUnderlyingServiceError(err)
      ? catalog.error.COMPONENT_API
      : catalog.error.COMPONENT_GRAPHQL
    : catalog.error.UNCAUGHT;
}

function onError(
  name: ErrorMetricName,
  message: string,
  metalContext: MetalClientValueProps,
): never {
  const { metalClient, page } = metalContext;
  if (metalClient) {
    Promise.resolve(metalClient).then((metalClient) => {
      metalClient.error.submit({
        component: 'renderer',
        page,
        name,
      });
    });
  }
  /**
   * useMutation does not throw the error but instead calls this handler,
   * so we need to rethrow the message so that the error boundary can render it
   */
  throw new APIError(message);
}

export function useInvokeAuxEffects(
  extensionInstanceIds: ExtensionInstanceIds,
  extensionData?: Record<string, any>,
): ForgeEffectsInvoker {
  const metalContext = useContext(MetalClientContext);
  const [mutationFunction] = useMutation<MutationData, MutationVariables>(
    invokeAuxEffectsMutation,
    {
      onError: (error: ApolloError) =>
        onError(
          getMetricNameFromApolloError(error),
          error.message,
          metalContext,
        ),
    },
  );

  const { contextIds, extensionId, localId } = extensionInstanceIds;
  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    createAuxEffectsInvoker(
      extensionInstanceIds,
      mutationFunction,
      (message: string) =>
        onError(catalog.error.COMPONENT_API, message, metalContext),
      extensionData,
    ),
    [contextIds.sort().join(','), extensionId, localId],
  );
}
