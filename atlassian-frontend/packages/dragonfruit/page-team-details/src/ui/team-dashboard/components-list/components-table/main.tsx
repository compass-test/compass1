import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useApolloClient } from '@apollo/client';

import DynamicTable from '@atlaskit/dynamic-table';
import EmptyState from '@atlaskit/empty-state';
import Tooltip from '@atlaskit/tooltip';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import { useRecentComponents } from '@atlassian/dragonfruit-component-create-modal';
import { ComponentName, ComponentRow } from '@atlassian/dragonfruit-components';
import { useCompassScorecardTeamDashboardComponentsListView } from '@atlassian/dragonfruit-feature-flags';
import {
  CompassQuerySort,
  CompassQuerySortOrder,
  QueryError,
  QueryErrorExtension,
} from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import { ScorecardsHealthInfo } from '@atlassian/dragonfruit-scorecards';
import {
  DeleteOwnerModal,
  useDeleteModalController,
} from '@atlassian/dragonfruit-teams';
import { getComponentLinkUrl, useIntl } from '@atlassian/dragonfruit-utils';

import { Actions } from './actions';
import { useErrorFlags } from './flags';
import messages from './messages';
import { ActionsWrapper, DescriptionStyled, LinkContainer } from './styled';

type Props = {
  emptyState: JSX.Element;
  error?: String;
  loading: boolean;
  onSort?: (sorts: CompassQuerySort[]) => void;
  results?: ComponentRow[];
  queryError?: QueryError;
  testId?: string;
  teamId: string;
};

export const ComponentsTable: React.FC<Props> = ({
  emptyState,
  error,
  loading,
  onSort,
  results,
  queryError,
  testId,
  teamId,
}) => {
  const { formatMessage } = useIntl();
  const { showErrorFlag } = useErrorFlags();

  const isCompassScorecardTeamDashboardComponentsListViewEnabled = useCompassScorecardTeamDashboardComponentsListView();

  const [
    { localComponents, highlightedComponents },
    { removeComponent },
  ] = useRecentComponents();

  const tableTestId = testId
    ? `dragonfruit-components.ui.component-list-${testId}`
    : 'dragonfruit-components.ui.component-list';

  useEffect(() => {
    const extensions = queryError?.extensions;
    if (extensions) {
      extensions.map(
        (ex: QueryErrorExtension) =>
          ex.errorType && showErrorFlag(ex.errorType),
      );
    }
  }, [queryError, showErrorFlag]);

  const [componentId, setComponentId] = useState('');
  const [
    { isDeleteModalOpen },
    { openDeleteModal, closeDeleteModal, deleteOwner },
  ] = useDeleteModalController();

  const onDelete = useCallback(
    (componentId) => {
      setComponentId(componentId);
      openDeleteModal();
    },
    [setComponentId, openDeleteModal],
  );

  const client = useApolloClient();

  const deleteOwnerWrapper = useCallback(async () => {
    const success = await deleteOwner(componentId, null);

    if (success) {
      const { cache } = client;
      cache.modify({
        id: cache.identify({ __typename: 'CompassCatalogQueryApi', id: '' }),
        fields: {
          searchComponents(existing, { readField }) {
            return {
              ...existing,
              nodes: existing.nodes.filter(
                (node: any) => componentId !== readField('id', node.component),
              ),
            };
          },
        },
      });
      // If this is a localComponent it won't not be in the apollo cache,
      // So we check and delete if needed.
      const checkForComponentInLocalComponents = (component: any) =>
        component.id === componentId;
      if (
        localComponents.length &&
        localComponents.some(checkForComponentInLocalComponents)
      ) {
        removeComponent(componentId);
      }
    }
    return success;
  }, [componentId, deleteOwner, client, localComponents, removeComponent]);

  const headerCells = [
    {
      key: 'title',
      content: formatMessage(CommonMessages.name),
      width: 26,
      isSortable: true,
    },
    {
      key: 'description',
      content: formatMessage(CommonMessages.description),
      width: isCompassScorecardTeamDashboardComponentsListViewEnabled ? 44 : 70,
      isSortable: false,
    },
    ...(isCompassScorecardTeamDashboardComponentsListViewEnabled
      ? [
          {
            key: 'scorecards',
            content: formatMessage(messages.scorecardsColumn),
            width: 24,
            isSortable: false,
          },
        ]
      : []),
    {
      key: 'actions',
      content: formatMessage(CommonMessages.actions),
      width: isCompassScorecardTeamDashboardComponentsListViewEnabled ? 6 : 4,
      isSortableFalse: false,
    },
  ];

  const tableHeader = {
    cells: headerCells,
  };

  if (localComponents.length) {
    const localSearchResults: ComponentRow[] = localComponents.map(
      (localComponent) => {
        const localResult: ComponentRow = {
          link: getComponentLinkUrl(localComponent.id),
          component: localComponent,
        };
        return localResult;
      },
    );
    const resultsIds = (results || []).reduce(
      (acc, res) => acc.add(res.component?.id),
      new Set(),
    );
    results = (results || []).concat(
      localSearchResults.filter((res) => !resultsIds?.has(res.component?.id)),
    );
  }

  const rows = useMemo(() => {
    return (results ?? [])
      .filter((r) => r.component && !r.component._isDeleted)
      .map((result) => {
        const component = result.component!;

        const cells = [
          {
            key: `${component.name}-${component.id}`,
            content: (
              <LinkContainer>
                <ComponentName
                  component={component}
                  componentDetailsUrl={routes.COMPONENT_DETAILS(component.id)}
                />
              </LinkContainer>
            ),
          },
          {
            key: `${component.id}-description`,
            content: (
              <Tooltip content={component.description}>
                <DescriptionStyled>{component.description}</DescriptionStyled>
              </Tooltip>
            ),
          },
          ...(isCompassScorecardTeamDashboardComponentsListViewEnabled
            ? [
                {
                  key: `${component.id}-scorecards`,
                  content: (
                    <ScorecardsHealthInfo
                      componentId={component.id}
                      key={component.id}
                    />
                  ),
                },
              ]
            : []),
          {
            key: `${component.id}-actions`,
            content: (
              <ActionsWrapper>
                <Actions onDelete={onDelete} component={component} />
              </ActionsWrapper>
            ),
          },
        ];

        return {
          key: `component-row.${component.id}`,
          cells: cells,
        };
      });
  }, [
    onDelete,
    results,
    isCompassScorecardTeamDashboardComponentsListViewEnabled,
  ]);

  const sort = useMemo(
    () => ({ key, sortOrder }: { key: string; sortOrder: 'ASC' | 'DESC' }) =>
      onSort &&
      onSort([
        {
          name: key,
          order:
            sortOrder === 'ASC'
              ? CompassQuerySortOrder.ASC
              : CompassQuerySortOrder.DESC,
        },
      ]),
    [onSort],
  );

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteOwnerModal
          updateOwner={deleteOwnerWrapper}
          onCancel={closeDeleteModal}
          componentId={componentId}
        />
      )}

      <DynamicTable
        isLoading={loading}
        head={tableHeader}
        rows={rows}
        onSort={sort}
        isFixedSize
        emptyView={
          error ? (
            <EmptyState
              header={formatMessage(messages.errorMessage)}
              description={`${formatMessage(
                messages.errorMessageDescription,
              )}: ${error}`}
              imageUrl={ErrorIcon}
            />
          ) : (
            emptyState
          )
        }
        testId={tableTestId}
        defaultSortOrder="ASC"
        highlightedRowIndex={
          highlightedComponents
            ? [...Array(highlightedComponents).keys()].map(
                (x) => rows.length - 1 - x,
              )
            : undefined
        }
      />
    </>
  );
};
