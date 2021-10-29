import { MutationHookOptions, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useRef } from 'react';
import { ExtensionId, ProductEnvironment } from '@atlassian/forge-ui-types';
import {
  GQLUserAuthTokenForExtensionInput,
  GQLUserAuthTokenForExtensionResponse,
} from '../../web-client/graphql/types';

export const authTokenForExtensionMutation = gql`
  mutation forge_ui_userAuthTokenForExtension(
    $input: UserAuthTokenForExtensionInput!
  ) {
    userAuthTokenForExtension(input: $input) {
      success
      errors {
        message
      }
      authToken {
        token
        ttl
      }
    }
  }
`;

interface MutationVariables {
  input: GQLUserAuthTokenForExtensionInput;
}

interface MutationData {
  userAuthTokenForExtension: GQLUserAuthTokenForExtensionResponse;
}

interface AuthToken {
  token: string;
  expiry: number; // expiry in ms
}

const validProducts = ['confluence', 'jira'] as const;
export type Product = typeof validProducts[number];

export type OAuthFetchClient = (
  restPath: string,
  product: Product,
  init: any,
) => Promise<Response>;

interface useProductFetchClientOptions {
  extensionId: ExtensionId;
  environment: ProductEnvironment;
  cloudId: string;
  options?: MutationHookOptions<MutationData, MutationVariables>;
}

function createProductUrl(
  environment: ProductEnvironment,
  product: Product,
  cloudId: string,
  restPath: string,
): string {
  const apiBase =
    environment === ProductEnvironment.PRODUCTION
      ? 'api.atlassian.com'
      : 'api.stg.atlassian.com';

  const baseUrl = `https://${apiBase}/ex/${product}/${cloudId}`;
  const productUrl = new URL(`${baseUrl}${restPath}`).toString();

  if (!productUrl.startsWith(`${baseUrl}/`)) {
    throw new Error('Invalid product URL');
  }

  return productUrl;
}

function isTokenValid(token: AuthToken | undefined): token is AuthToken {
  return !!(token && token.expiry > Date.now());
}

function isProduct(product: unknown): product is Product {
  return validProducts.includes(product as Product);
}

const MILLIS_IN_SECOND = 1000;

export function useProductFetchClient({
  extensionId,
  environment,
  cloudId,
  options,
}: useProductFetchClientOptions): OAuthFetchClient {
  const [mutationFunction] = useMutation<MutationData, MutationVariables>(
    authTokenForExtensionMutation,
    options,
  );
  const authTokenRef = useRef<AuthToken | undefined>(undefined);

  async function fetchOAuthToken(extensionId: ExtensionId) {
    const { data } = await mutationFunction({
      variables: {
        input: {
          extensionId,
        },
      },
    });

    if (data?.userAuthTokenForExtension) {
      const { success, authToken } = data.userAuthTokenForExtension;

      if (success && authToken) {
        const { token, ttl } = authToken;

        return { token, expiry: Date.now() + ttl * MILLIS_IN_SECOND };
      }
    }
    throw new Error('An unexpected error occurred when fetching an auth token');
  }

  return async (restPath, product, init) => {
    if (!isProduct(product)) {
      throw new Error(`Invalid product: ${product}`);
    }
    if (!isTokenValid(authTokenRef.current)) {
      authTokenRef.current = await fetchOAuthToken(extensionId);
    }

    const headers = new Headers(init.headers);

    headers.set('Authorization', `Bearer ${authTokenRef.current.token}`);

    return fetch(createProductUrl(environment, product, cloudId, restPath), {
      ...init,
      headers,
    });
  };
}
