import { PLACEHOLDER_EXPERIENCE } from '../aggregator-client-context';
import {
  AggregatorClient,
  ScopedAggregatorResponse,
  SearchContext,
} from '../../common/clients';
import { useSearchSessionId } from '../../common/search-session-provider';
import {
  PostQuerySupplierArgs,
  ResultSuppliers,
} from '../product-router/product';
import {
  SearchResult,
  SearchResultSection,
  Section,
} from '../product-router/product/result-types';
import { useTypedAggregatorClient } from '../aggregator-client-context/aggregator-client-context';

/**
 * A definition of a {@link Section} in the search platform which is backed by
 * xpsearch-aggregator. Contains a resultMapper for transforming results for the
 * specified scope into a common format.
 */
interface AggregatorSection<T, R extends ScopedAggregatorResponse<T>>
  extends Section {
  scope: T;
  resultMapper: (t: R) => SearchResult[];
}

export const createSearchSupplier = <
  Response extends ScopedAggregatorResponse<Scope>,
  FilterInterface,
  Scope = Response['id']
>(
  aggregatorClient: AggregatorClient<Response, FilterInterface>,
  sections: AggregatorSection<Scope, Response>[],
  context: SearchContext,
  experience: string,
) => async ({
  query,
  sectionIds: allPermissionedScopes,
}: PostQuerySupplierArgs) => {
  const permittedSections = sections.filter(
    (section) => allPermissionedScopes.indexOf(section.id) >= 0,
  );
  const scopes: Scope[] = permittedSections.map((section) => section.scope);

  const { response } = await aggregatorClient.search({
    query,
    scopes,
    modelParams: [],
    experience,
    context,
  });

  const sectionsWithResults: SearchResultSection[] = permittedSections.map(
    ({ scope, id, title, resultMapper, ...rest }) => {
      const results = response.retrieveScope(scope);

      if (results === null) {
        throw new Error(
          `Scope ${scope} was not found in the response, despite being requested`,
        );
      }

      return {
        ...rest,
        id,
        title,
        size: results.size,
        searchResults: resultMapper(results) || [],
      };
    },
  );

  const scopesWithSize = response.rawData.scopes.filter(({ size }) => size);
  const reponseHasSize = scopesWithSize.length > 0;

  const totalSizeAsReportedByAPI = reponseHasSize
    ? response.rawData.scopes.reduce(
        (count, scope) => count + (scope.size || 0),
        0,
      )
    : undefined;

  return {
    size: totalSizeAsReportedByAPI,
    sections: sectionsWithResults,
  };
};

/**
 * Returns a {@link ResultSuppliers} object containing suppliers for pre and post query which
 * are backed by the search platform.
 *
 * The suppliers consider registered scopes, that is scopes that have had permissions evaluated for. I.e,
 * these suppliers will not request scopes that the {@link SearchDialogProduct} permission supplier has
 * returned no permission for.
 *
 * @param id The product id to generate suppliers for
 * @param sections the sections in the search dialog to generate suppliers for. These sections are returned in each supplier,
 * with results from the search platform attached to them.
 * @returns a {@link ResultSuppliers} object containing a pre and post query supplier
 */
export const useDefaultSuppliers = <
  Response extends ScopedAggregatorResponse<Scope>,
  Scope = Response['id']
>(
  id: string,
  sections: AggregatorSection<Scope, Response>[],
): ResultSuppliers => {
  const aggregatorClient = useTypedAggregatorClient<Response, Scope>();

  const sessionId = useSearchSessionId();

  const search = createSearchSupplier(
    aggregatorClient,
    sections,
    {
      sessionId,
      referrerId: '',
    },
    PLACEHOLDER_EXPERIENCE,
  );

  return {
    preQueryItemSupplier: (args) => search({ ...args, query: '' }),
    postQueryItemSupplier: search,
  };
};
