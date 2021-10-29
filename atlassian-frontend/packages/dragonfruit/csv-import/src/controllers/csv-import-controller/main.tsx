import React from 'react';

import { MissingFieldError, MutationUpdaterFn } from '@apollo/client';

import {
  AddComponentLabelsMutation,
  CompassComponentLabelsFragment,
  CompassComponentLabelsFragmentDoc,
  CompassQuerySortOrder,
  CompassSearchComponentFragment,
  SearchComponentsDocument,
  SearchComponentsQuery,
  SearchComponentsQueryVariables,
  useAddComponentLabels,
  useCreateComponent,
  useImperativeQuery,
  useUpdateComponentDescription,
} from '@atlassian/dragonfruit-graphql';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';

import { useCsvImportReducer } from '../../services/csv-import-reducer';

import { CsvImportContextProvider } from './context';
import { CsvImportContextValue } from './context/types';

type CsvImportControllerProps = {
  children: React.ReactNode;
};

export const IMPORT_CSV_LABEL = 'csv-import';

export function CsvImportController(props: CsvImportControllerProps) {
  const reducer = useCsvImportReducer();
  const { cloudId } = useTenantInfo();

  const [createComponent] = useCreateComponent();
  const [updateComponentDescription] = useUpdateComponentDescription();
  const [addComponentLabels] = useAddComponentLabels();
  const searchComponents = useImperativeQuery<
    SearchComponentsQuery,
    SearchComponentsQueryVariables
  >(SearchComponentsDocument, { fetchPolicy: 'network-only' });

  /**
   * Complete the configuration step and start "planning".
   */
  function confirmConfiguration() {
    reducer.configurationComplete();

    loadExistingComponents();
  }

  async function retrievePaginatedExistingComponents(
    next?: string,
  ): Promise<CompassSearchComponentFragment[]> {
    const response = await searchComponents({
      cloudId,
      query: {
        first: 250,
        fieldFilters: [],
        sort: [{ name: 'title', order: CompassQuerySortOrder.ASC }],
        after: next,
      },
    });

    if (response?.errors) {
      throw new Error(
        response.errors[0].message ?? 'Error searching for existing components',
      );
    }

    const searchResults = response?.data?.compass?.searchComponents;

    if (searchResults?.__typename === 'QueryError') {
      throw new Error(
        searchResults.message ?? 'Error searching for existing components',
      );
    }

    if (searchResults?.__typename !== 'CompassSearchComponentConnection') {
      throw new Error('Error searching for existing components');
    }

    // Get the next page of results if it exist
    if (
      searchResults.pageInfo.hasNextPage &&
      searchResults.pageInfo.endCursor
    ) {
      return await retrievePaginatedExistingComponents(
        searchResults.pageInfo.endCursor,
      );
    }

    // Because of the cache merge strategy; the final page of results contains all of our components
    return (searchResults?.nodes ?? [])
      .map(result => result.component)
      .filter(notEmpty);
  }

  function loadExistingComponents() {
    reducer.previewRequest();

    retrievePaginatedExistingComponents()
      .then(components => {
        reducer.previewSuccess(components);
      })
      .catch(error => {
        reducer.previewFailure(error.message);
      });
  }

  // Helper to update cached labels on Components.
  const updateComponentLabels = (
    componentId: string,
  ): MutationUpdaterFn<AddComponentLabelsMutation> => (proxy, { data }) => {
    const id = proxy.identify({
      __typename: 'CompassComponent',
      id: componentId,
    });

    if (!id) {
      return;
    }

    let component;
    try {
      // Try to get the cached labels on a component.
      component = proxy.readFragment<CompassComponentLabelsFragment>({
        id,
        fragment: CompassComponentLabelsFragmentDoc,
        fragmentName: 'CompassComponentLabels',
      });
    } catch (e) {
      // readFragment throws MissingFieldError when a field is missing in cache.
      // Components that are being created or updated may not have the `labels` field cached.
      // We need to catch and handle this exception, otherwise all imports fail.
      // https://www.apollographql.com/docs/react/caching/cache-interaction/#readfragment
      if (
        e instanceof MissingFieldError &&
        e.path.length === 1 &&
        e.path[0] === 'labels'
      ) {
        component = {
          id,
        };
      } else {
        // Throw for all other exceptions
        throw e;
      }
    }

    if (component) {
      const labels = component.labels ?? [];
      proxy.writeFragment({
        id,
        fragment: CompassComponentLabelsFragmentDoc,
        fragmentName: 'CompassComponentLabels',
        data: {
          ...component,
          labels: labels.concat(
            data?.compass?.addComponentLabels?.addedLabels ?? [],
          ),
        },
      });
    }
  };

  function confirmPreview() {
    reducer.previewComplete();
    startImport();
  }

  function startImport() {
    // We dispatch a "thunk" here so that we can fetch the latest state
    reducer.dispatch(async (dispatch, getState) => {
      const state = getState();

      if (state.step !== 'IMPORTING') {
        return;
      }

      // Use a for loop so that we can process each component in sequence
      for (const csvRowNumber of Object.keys(state.importComponents)) {
        const importComponent = state.importComponents[csvRowNumber];
        const importPlan = importComponent.importPlan;
        // Set the import item as in_progress
        reducer.importItemRequest(csvRowNumber);
        if (importPlan.action === 'CREATE') {
          await createComponent(cloudId, importComponent.data)
            .then(async response => {
              const mutation = response.data?.compass?.createComponent;

              if (mutation?.errors) {
                throw new Error(
                  mutation.errors[0].message ?? 'Error creating component',
                );
              }

              const component = mutation?.componentDetails;

              if (component?.__typename !== 'CompassComponent') {
                throw new Error('Error creating component');
              }

              await addComponentLabels(
                {
                  componentId: component.id,
                  labelNames: [IMPORT_CSV_LABEL],
                },
                {
                  update: updateComponentLabels(component.id),
                },
              );

              reducer.importItemSuccess(csvRowNumber, component.id);
            })
            .catch(err => {
              reducer.importItemFailure(
                csvRowNumber,
                err.message ?? 'Error creating component',
              );
            });
        } else if (importPlan.action === 'UPDATE') {
          await updateComponentDescription({
            id: importPlan.updateComponentId,
            description: importComponent.data.description,
          })
            .then(async response => {
              const mutation = response.data?.compass?.updateComponent;

              if (mutation?.errors) {
                throw new Error(
                  mutation.errors[0].message ?? 'Error updating component',
                );
              }

              const component = mutation?.componentDetails;

              if (component?.__typename !== 'CompassComponent') {
                throw new Error('Error updating component');
              }

              await addComponentLabels(
                {
                  componentId: component.id,
                  labelNames: [IMPORT_CSV_LABEL],
                },
                {
                  update: updateComponentLabels(component.id),
                },
              );

              reducer.importItemSuccess(csvRowNumber, component.id);
            })
            .catch(err => {
              reducer.importItemFailure(
                csvRowNumber,
                err.message ?? 'Error updating component',
              );
            });
        } else if (importComponent.importPlan.action === 'SKIP') {
          reducer.importItemSkip(
            csvRowNumber,
            importComponent.importPlan.skipReason,
          );
        }
      }

      // Wait for an extra second so that the user gets to see the progress bar at 100%
      setTimeout(() => {
        reducer.importComplete();
      }, 1000);
    });
  }

  const providerValue: CsvImportContextValue = {
    state: reducer.state,
    resetWizard: reducer.resetWizard,
    importParsedCsv: reducer.importParsedCsv,
    confirmConfiguration,
    confirmPreview,
    startImport,
  };

  return (
    <CsvImportContextProvider value={providerValue}>
      {props.children}
    </CsvImportContextProvider>
  );
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
