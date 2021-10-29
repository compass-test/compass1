import { useCallbackOne as useCallback } from 'use-memo-one';
import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from '@apollo/react-hooks';
import { ContextId, ExtensionId } from '@atlassian/forge-ui-types';

import {
  GQLInvokeExtensionInput,
  GQLInvokeExtensionPayload,
  GQLInvokeExtensionResponse,
} from '../graphql/types';

export interface MutationVariables {
  input: GQLInvokeExtensionInput;
}

export interface MutationData {
  invokeExtension: GQLInvokeExtensionResponse;
}

export const invokeExtensionMutation = gql`
  mutation forge_ui_invokeExtension($input: InvokeExtensionInput!) {
    invokeExtension(input: $input) {
      success
      response {
        body
      }
      errors {
        message
        extensions {
          errorType
          statusCode
          ... on InvokeExtensionPayloadErrorExtension {
            fields {
              authInfoUrl
            }
          }
        }
      }
    }
  }
`;

export const useInvokeExtension: Function = (
  contextIds: ContextId[],
  extensionId: ExtensionId,
  options?: MutationHookOptions<MutationData, MutationVariables>,
) => {
  const [mutationFunction] = useMutation<MutationData, MutationVariables>(
    invokeExtensionMutation,
    options,
  );
  return useCallback(
    ({ call, context }: GQLInvokeExtensionPayload) =>
      mutationFunction({
        variables: {
          input: {
            contextIds,
            extensionId,
            payload: {
              call,
              context,
            },
            entryPoint: 'resolver',
          },
        },
      }),
    [contextIds, extensionId, mutationFunction],
  );
};
