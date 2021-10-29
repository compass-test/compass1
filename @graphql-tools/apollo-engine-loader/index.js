'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const utils = require('@graphql-tools/utils');
const crossFetch = require('cross-fetch');
const syncFetch = _interopDefault(require('sync-fetch'));

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
        const response = await crossFetch.fetch(...fetchArgs);
        const { data, errors } = await response.json();
        if (errors) {
            throw new utils.AggregateError(errors, 'Introspection from Apollo Engine failed');
        }
        const source = utils.parseGraphQLSDL(pointer, data.service.schema.document, options);
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
            throw new utils.AggregateError(errors, 'Introspection from Apollo Engine failed');
        }
        const source = utils.parseGraphQLSDL(pointer, data.service.schema.document, options);
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

exports.ApolloEngineLoader = ApolloEngineLoader;
exports.SCHEMA_QUERY = SCHEMA_QUERY;
