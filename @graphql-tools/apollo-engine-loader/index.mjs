import { AggregateError, parseGraphQLSDL } from '@graphql-tools/utils';
import { fetch } from 'cross-fetch';
import syncFetch from 'sync-fetch';

const DEFAULT_APOLLO_ENDPOINT = 'https://engine-graphql.apollographql.com/api/graphql';
/**
 * This loader loads a schema from Apollo Engine
 */
class ApolloEngineLoader {
    getFetchArgs(options) {
        return [
            options.engine.endpoint || DEFAULT_APOLLO_ENDPOINT,
            {
                method: 'POST',
                headers: {
                    'x-api-key': options.engine.apiKey,
                    'apollo-client-name': 'Apollo Language Server',
                    'apollo-client-reference-id': '146d29c0-912c-46d3-b686-920e52586be6',
                    'apollo-client-version': '2.6.8',
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    ...options.headers,
                },
                body: JSON.stringify({
                    query: SCHEMA_QUERY,
                    variables: {
                        id: options.graph,
                        tag: options.variant,
                    },
                }),
            },
        ];
    }
    async canLoad(ptr) {
        return this.canLoadSync(ptr);
    }
    canLoadSync(ptr) {
        return typeof ptr === 'string' && ptr === 'apollo-engine';
    }
    async load(pointer, options) {
        if (!(await this.canLoad(pointer))) {
            return [];
        }
        const fetchArgs = this.getFetchArgs(options);
        const response = await fetch(...fetchArgs);
        const { data, errors } = await response.json();
        if (errors) {
            throw new AggregateError(errors, 'Introspection from Apollo Engine failed');
        }
        const source = parseGraphQLSDL(pointer, data.service.schema.document, options);
        return [source];
    }
    loadSync(pointer, options) {
        if (!this.canLoadSync(pointer)) {
            return [];
        }
        const fetchArgs = this.getFetchArgs(options);
        const response = syncFetch(...fetchArgs);
        const { data, errors } = response.json();
        if (errors) {
            throw new AggregateError(errors, 'Introspection from Apollo Engine failed');
        }
        const source = parseGraphQLSDL(pointer, data.service.schema.document, options);
        return [source];
    }
}
/**
 * @internal
 */
const SCHEMA_QUERY = /* GraphQL */ `
  query GetSchemaByTag($tag: String!, $id: ID!) {
    service(id: $id) {
      ... on Service {
        __typename
        schema(tag: $tag) {
          document
        }
      }
    }
  }
`;

export { ApolloEngineLoader, SCHEMA_QUERY };
