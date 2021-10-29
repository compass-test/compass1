import React, { useEffect, useMemo, useState } from 'react';

import { Link } from 'react-resource-router';

import DynamicTable from '@atlaskit/dynamic-table';
import EmptyState from '@atlaskit/empty-state';
import Tooltip from '@atlaskit/tooltip';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { StarredStatusButton } from '@atlassian/dragonfruit-common-ui';
import { ErrorIcon } from '@atlassian/dragonfruit-common-ui/assets';
import {
  LocalComponent,
  RecentComponentsProvider,
  useRecentComponents,
} from '@atlassian/dragonfruit-component-create-modal';
import { ComponentName, ComponentRow } from '@atlassian/dragonfruit-components';
import {
  UI_STARRED_COMPONENT,
  UI_STARRED_COMPONENT_DEFAULT_VALUE,
  useCompassInlineCreateComponentEnabled,
  useFeatureFlag,
} from '@atlassian/dragonfruit-feature-flags';
import {
  CompassComponentType,
  CompassQuerySort,
  CompassQuerySortOrder,
  QueryError,
  QueryErrorExtension,
} from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { useErrorFlags } from './flags';
import { InlineCreateComponent } from './inline-create-component';
import {
  DescriptionStyled,
  LinkContainer,
  StarStyled,
  TeamStyled,
} from './styled';

type Props = {
  componentType: CompassComponentType;
  emptyState: JSX.Element;
  error?: String;
  loading: boolean;
  // This flag is a little ad-hoc, we probably need to re-think this if we're
  // adding similar flags on other columns. We might want an array of display
  // columns pulling from an enum (assigned to a property on `ComponentsTable`
  // itself perhaps) instead of N booleans.
  showOwner?: boolean;
  showInlineCreate?: boolean;
  onSort?: (sorts: CompassQuerySort[]) => void;
  results?: ComponentRow[];
  queryError?: QueryError;
};

const ComponentsTableBase: React.FC<Props> = ({
  componentType,
  emptyState,
  error,
  loading,
  showOwner = true,
  showInlineCreate = true,
  onSort,
  results,
  queryError,
}) => {
  const [showForm, setShowForm] = useState(false);
  const { formatMessage } = useIntl();
  const { showErrorFlag } = useErrorFlags();

  useEffect(() => {
    const extensions = queryError?.extensions;
    if (extensions) {
      extensions.map(
        (ex: QueryErrorExtension) =>
          ex.errorType && showErrorFlag(ex.errorType),
      );
    }
  }, [queryError, showErrorFlag]);

  const headerCells = [
    {
      key: 'title',
      content: formatMessage(CommonMessages.name),
      width: 35,
      isSortable: false,
    },
    {
      key: 'description',
      content: formatMessage(CommonMessages.description),
      width: 40,
      isSortable: false,
    },
  ];

  if (showOwner) {
    headerCells.push({
      key: 'owner',
      content: formatMessage(CommonMessages.ownerTeam),
      width: 25,
      isSortable: false,
    });
  }

  // Starred header
  const starredListViewEnabled = useFeatureFlag<boolean>(
    UI_STARRED_COMPONENT,
    UI_STARRED_COMPONENT_DEFAULT_VALUE,
  );

  if (starredListViewEnabled.value) {
    headerCells.push({
      key: 'starred',
      content: '',
      width: 10,
      isSortable: false,
    });
  }

  const tableHeader = {
    cells: headerCells,
  };

  // hardcoded value
  const isStarred = false;

  const [{ localComponents, highlightedComponents }] = useRecentComponents();

  const rows = useMemo(() => {
    const filteredResults = (results ?? []).filter(
      (r) => r.component && !r.component._isDeleted,
    );
    const componentSet = (filteredResults || []).reduce(
      (acc, res) => acc.add(res.component?.id),
      new Set(),
    );
    const localComponentsToAdd = localComponents
      .filter((component: LocalComponent) => !componentSet.has(component.id))
      .map((component: LocalComponent) => ({
        component,
      }));

    return filteredResults
      .concat(localComponentsToAdd as ComponentRow[])
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
        ];

        if (showOwner) {
          cells.push({
            key: `${component.id}-owner`,
            content: (component.ownerId && component.ownerName ? (
              <LinkContainer>
                <TeamStyled>
                  <Link
                    href={`/compass/people/team/${encodeURIComponent(
                      component.ownerId.replace('ari:cloud:teams::team/', ''),
                    )}`}
                  >
                    {component.ownerName}
                  </Link>
                </TeamStyled>
              </LinkContainer>
            ) : null) as JSX.Element,
          });
        }

        if (starredListViewEnabled.value) {
          cells.push({
            key: `${component.id}-starred-status`,
            content: (
              <StarStyled className="starred-status-button">
                <StarredStatusButton
                  isStarred={isStarred}
                  onClick={() => {}}
                  appearance="link"
                />
              </StarStyled>
            ),
          });
        }

        return {
          key: `component-row.${component.id}`,
          cells: cells,
        };
      });
  }, [
    localComponents,
    isStarred,
    results,
    showOwner,
    starredListViewEnabled.value,
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

  const inlineCreateEnabled = useCompassInlineCreateComponentEnabled();

  return (
    <>
      <DynamicTable
        isLoading={loading}
        head={tableHeader}
        rows={rows}
        onSort={sort}
        emptyView={
          error ? (
            <EmptyState
              header={formatMessage(CommonMessages.somethingWentWrongFullStop)}
              description={error}
              imageUrl={ErrorIcon}
            />
          ) : (
            emptyState
          )
        }
        testId="dragonfruit.ui.component-list"
        highlightedRowIndex={
          highlightedComponents
            ? [...Array(highlightedComponents).keys()].map(
                (x) => rows.length - 1 - x,
              )
            : undefined
        }
      />
      {inlineCreateEnabled &&
        showInlineCreate &&
        !loading &&
        !error &&
        !!rows.length && (
          <InlineCreateComponent
            componentType={componentType}
            onCancel={() => setShowForm(false)}
            onSuccess={() => setShowForm(false)}
            formShown={showForm}
            setFormShown={() => setShowForm((val) => !val)}
          />
        )}
    </>
  );
};

export const ComponentsTable = (props: Props) => (
  <RecentComponentsProvider>
    <ComponentsTableBase {...props} />
  </RecentComponentsProvider>
);
