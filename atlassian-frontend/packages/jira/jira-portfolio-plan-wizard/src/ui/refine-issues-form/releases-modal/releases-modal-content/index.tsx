import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import compose from 'lodash/fp/compose';
import difference from 'lodash/fp/difference';
import isEmpty from 'lodash/fp/isEmpty';
import remove from 'lodash/fp/remove';
import uniq from 'lodash/fp/uniq';

import { Checkbox } from '@atlaskit/checkbox';
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search';
import Lozenge from '@atlaskit/lozenge';
import Select from '@atlaskit/select';
import Spinner from '@atlaskit/spinner';
import TableTree, { Cell, Header, Headers } from '@atlaskit/table-tree';
import Textfield from '@atlaskit/textfield';

import { Release, ReleaseSelectionMode } from '../../../../common/types';
import { useIntl as useIntlDI } from '../../../../common/utils/intl';

import msgs from './messages';
import ProjectSelect, { SelectActions } from './project-select';
import ScrollContainer from './scroll-container';
import { ScrollViewport, ScrollViewportRow } from './scroll-viewport';
import {
  AK_SELECT_PADDING_ADJUST,
  Column,
  CONTROLS_HEIGHT,
  ControlsContainer,
  Description,
  LoadingContainer,
  ProjectSelectContainer,
  ProjectTitle,
  SearchContainer,
  TableTreeContainer,
} from './styled';
import { FlatRow, FlatRows } from './table-flat-tree';
import {
  FieldValue,
  ProjectTableItem,
  Props,
  ReleaseTableItem,
  TableContent,
  TableContentProject,
  TableContentRelease,
} from './types';
import {
  filterTableItemsByProject,
  mergeProjectsAndReleases,
  queryTableItems,
  setModeTableItems,
} from './utils';

const ITEM_HEIGHT = 45;

export const DisabledTable = ({ useIntl = useIntlDI }) => {
  const { formatMessage } = useIntl();
  return (
    <TableTree>
      <Headers>
        <Header width="5%">
          <Checkbox isDisabled testId="toggle-all-release" />
        </Header>
        <Header width="40%">{formatMessage(msgs.tableHeaderTitle)}</Header>
        <Header width="15%">{formatMessage(msgs.tableHeaderStatus)}</Header>
        <Header width="20%">{formatMessage(msgs.tableHeaderStartDate)}</Header>
        <Header width="20%">
          {formatMessage(msgs.tableHeaderReleaseDate)}
        </Header>
      </Headers>
    </TableTree>
  );
};

const ReleasesModalContent: React.FC<Props> = ({
  onChange,
  defaultValue,
  defaultMode,
  allProjects,
  allReleases,
  loading,
  plan,
  useIntl = useIntlDI,
  isSettingsMode,
}) => {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<ReleaseSelectionMode>(
    defaultMode || ReleaseSelectionMode.EXCLUDE,
  );
  const [selectedReleases, setSelectedReleases] = useState<Release['id'][]>(
    defaultValue ? defaultValue : [],
  );
  const otherModeSelectedReleases = useRef<FieldValue>({
    mode,
    selectedReleases,
  });
  const [items, setItems] = useState<ProjectTableItem[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<
    TableContentProject[]
  >([]);
  const projectsInScope: TableContentProject[] = isEmpty(selectedProjects)
    ? (allProjects || []).map((project) => ({
        type: 'Project',
        payload: project,
      }))
    : selectedProjects;
  // We dont want to deal with project and releases directly due to table-tree and its type safety
  // so we deal with TableContentProject and TableContentRelease
  const [{ projects, releases }, setProjectsAndReleasesInView] = useState<{
    projects: TableContentProject[];
    releases: TableContentRelease[];
  }>({ projects: [], releases: [] });

  // Swap modes
  useEffect(
    () => {
      const otherReleases = otherModeSelectedReleases.current.selectedReleases;
      otherModeSelectedReleases.current = { mode, selectedReleases };
      setSelectedReleases(otherReleases || []);
    },
    // We dont want to run the hook when setSelectedReleases changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode],
  );

  // Whenever issue sources change we don't want to keep stale projects and releases around
  useEffect(() => {
    const { items, projects, releases } = getReleases(mode);

    setProjectsAndReleasesInView({ projects, releases });

    if (allReleases) {
      // Note: Very important to use call back because other hooks also running
      setSelectedReleases((currentSelectedReleases) => {
        return currentSelectedReleases.filter((releaseId) =>
          releases.some(
            (release) => String(release.payload.id) === String(releaseId),
          ),
        );
      });
    }

    if (allProjects) {
      setSelectedProjects([]);
    }

    setItems(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allReleases, allProjects, plan.excludedVersions, mode]);

  const getReleases = (releasesMode: ReleaseSelectionMode) => {
    let items = setModeTableItems(
      releasesMode,
      plan.excludedVersions,
    )(mergeProjectsAndReleases(allProjects, allReleases));

    const projects: TableContentProject[] = items.map((items) => ({
      type: 'Project',
      payload: items.content.payload,
    }));
    const releases: TableContentRelease[] = uniq(
      Object.values(items).reduce<TableContentRelease[]>((result, item) => {
        const childReleases: TableContentRelease[] = item.children.map(
          (releaseItem) => ({
            payload: releaseItem.content.payload,
            type: 'Release',
          }),
        );
        return result.concat(childReleases);
      }, []),
    );

    if (allReleases) {
      items.forEach((item) => {
        item.children = item.children.filter(
          (child) => !child.content.payload.archived,
        );
      });
    }

    return { items, projects, releases };
  };

  const allReleasesInSelectedProjects = releases
    .filter((release) =>
      projectsInScope.some(
        ({ payload }) => release.payload.projectId === payload.id,
      ),
    )
    .map(({ payload }) => payload.id);

  const isAllReleasesInSelectedProjectSelected = !allReleasesInSelectedProjects.some(
    (releaseId) => !selectedReleases.includes(releaseId),
  );

  // Keep form updated
  useEffect(() => {
    onChange && onChange({ mode, selectedReleases });
  }, [selectedReleases, mode, onChange]);

  const { formatMessage } = useIntl();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const listOption = [
    {
      value: ReleaseSelectionMode.EXCLUDE,
      label: formatMessage(msgs.optionModeExclude),
    },
    {
      value: ReleaseSelectionMode.REINCLUDE,
      label: formatMessage(msgs.optionModeReInclude),
    },
  ];

  const releasedStatusIncludedInPlan = () => {
    const { releases } = getReleases(ReleaseSelectionMode.EXCLUDE);
    const releasedStatusIncludedInPlan = releases.some(
      (r) => r.payload.released,
    );
    return releasedStatusIncludedInPlan;
  };

  const toggleAllReleases = useCallback(() => {
    const newSelection = isAllReleasesInSelectedProjectSelected
      ? difference(selectedReleases, allReleasesInSelectedProjects)
      : uniq(selectedReleases.concat(allReleasesInSelectedProjects));

    setSelectedReleases(newSelection);
  }, [
    allReleasesInSelectedProjects,
    isAllReleasesInSelectedProjectSelected,
    selectedReleases,
  ]);

  const toggleAll = (
    <Checkbox
      isChecked={selectedReleases.length > 0}
      isIndeterminate={
        selectedReleases.length > 0 && !isAllReleasesInSelectedProjectSelected
      }
      name={
        isAllReleasesInSelectedProjectSelected
          ? formatMessage(msgs.tableHeaderDeselectAll)
          : formatMessage(msgs.tableHeaderSelectAll)
      }
      onChange={toggleAllReleases}
      testId="toggle-all-release"
    />
  );

  const ItemCheckbox = useMemo(() => {
    return ({ item }: { item: TableContent }) => {
      if (!releases || !projects) {
        return null;
      }

      if (item.type === 'Release') {
        const { id, name } = item.payload;
        const isSelected = selectedReleases.includes(id);

        return (
          <Checkbox
            isChecked={isSelected}
            name={`toggle-release-${id}-${name}`}
            onChange={(value) => {
              if (!releases) {
                return;
              }

              setSelectedReleases((selectedReleases) =>
                isSelected
                  ? remove((excludedId) => excludedId === id, selectedReleases)
                  : selectedReleases.concat(id),
              );
            }}
            testId={`toggle-release-${id}`}
          />
        );
      } else {
        const { id, name } = item.payload;
        const everyReleaseInProject = releases
          .filter((release) => release.payload.projectId === id)
          .map((release) => release.payload.id);

        const selectedReleasesInProject = everyReleaseInProject.filter(
          (releaseId) => selectedReleases.includes(releaseId),
        );

        const isAllSelected =
          selectedReleasesInProject.length === everyReleaseInProject.length;

        return (
          <Checkbox
            isChecked={selectedReleasesInProject.length > 0}
            isIndeterminate={!isAllSelected}
            name={`toggle-project-${id}-${name}`}
            onChange={(value) => {
              if (!releases) {
                return;
              }
              const newSelection = isAllSelected
                ? remove(
                    (selectedId) =>
                      everyReleaseInProject.some((id) => id === selectedId),
                    selectedReleases,
                  )
                : uniq(selectedReleases.concat(everyReleaseInProject));

              setSelectedReleases(newSelection);
            }}
            testId={`toggle-project-${id}`}
          />
        );
      }
    };
  }, [projects, releases, selectedReleases]);

  const tableChildren = () => {
    if (loading) {
      return (
        <LoadingContainer>
          <Spinner size="xlarge" />
        </LoadingContainer>
      );
    }

    if (items.length === 0) {
      return (
        <>
          <DisabledTable />
          <LoadingContainer>
            {formatMessage(
              mode === ReleaseSelectionMode.EXCLUDE
                ? msgs.tableNoAvailableReleasesExclude
                : msgs.tableNoAvailableReleasesInclude,
            )}
          </LoadingContainer>
        </>
      );
    }

    return (
      <>
        <Headers>
          <Header width="5%">{toggleAll}</Header>
          <Header width="40%">{formatMessage(msgs.tableHeaderTitle)}</Header>
          <Header width="15%">{formatMessage(msgs.tableHeaderStatus)}</Header>
          <Header width="20%">
            {formatMessage(msgs.tableHeaderStartDate)}
          </Header>
          <Header width="20%">
            {formatMessage(msgs.tableHeaderReleaseDate)}
          </Header>
        </Headers>
        <FlatRows
          items={compose(
            queryTableItems(searchQuery),
            filterTableItemsByProject(
              projectsInScope.map(({ payload }) => payload),
            ),
          )(items)}
        >
          {(
            items: (ProjectTableItem | ReleaseTableItem)[],
          ): React.ReactNode => (
            <ScrollViewport
              containerRef={scrollContainerRef}
              itemHeight={ITEM_HEIGHT}
              items={items}
              renderRow={(tableItem, offsetY) => {
                // ProjectTableItem
                if (tableItem.hasOwnProperty('children')) {
                  const projectTableItem = tableItem as ProjectTableItem;
                  const item = projectTableItem.content;
                  const {
                    payload: { avatarUrl, name },
                  } = item;

                  return (
                    <ScrollViewportRow
                      key={`project-${item.payload.id}`}
                      offsetY={offsetY}
                    >
                      <FlatRow
                        itemId={projectTableItem.content.payload.id}
                        hasChildren={projectTableItem.hasChildren}
                      >
                        <Cell>
                          <Column>
                            <ItemCheckbox item={item} />
                          </Column>
                        </Cell>
                        <Cell>
                          <ProjectTitle>
                            {avatarUrl ? <img src={avatarUrl} /> : null}
                            {name}
                          </ProjectTitle>
                        </Cell>
                        <Cell>{/* release status */}</Cell>
                        <Cell>{/* start date */}</Cell>
                        <Cell>{/* release date */}</Cell>
                      </FlatRow>
                    </ScrollViewportRow>
                  );
                }

                // ReleaseTableItem
                const projectTableItem = tableItem as ReleaseTableItem;
                const item = projectTableItem.content;
                const {
                  payload: {
                    name,
                    released,
                    startDate,
                    userStartDate,
                    userReleaseDate,
                  },
                } = item;

                const start = userStartDate || startDate;
                const end = userReleaseDate;

                return (
                  <ScrollViewportRow
                    key={`release-${item.payload.id}`}
                    offsetY={offsetY}
                  >
                    <FlatRow itemId={projectTableItem.content.payload.id}>
                      <Cell>
                        <Column>
                          <ItemCheckbox item={item} />
                        </Column>
                      </Cell>
                      <Cell>{name}</Cell>
                      <Cell>
                        <Column>
                          {released && (
                            <Lozenge appearance="success">
                              {formatMessage(msgs.released)}
                            </Lozenge>
                          )}
                        </Column>
                      </Cell>
                      <Cell>{start ? <Column>{start}</Column> : null}</Cell>
                      <Cell>{end ? <Column>{end}</Column> : null}</Cell>
                    </FlatRow>
                  </ScrollViewportRow>
                );
              }}
            />
          )}
        </FlatRows>
      </>
    );
  };

  const getDescription = () => {
    if (mode === ReleaseSelectionMode.EXCLUDE) {
      return formatMessage(msgs.descriptionExclude);
    }
    if (isSettingsMode) {
      return formatMessage(msgs.descriptionSelectReinclude);
    }
    if (releasedStatusIncludedInPlan()) {
      return formatMessage(msgs.descriptionSelectReinclude);
    }
    return formatMessage(msgs.descriptionReInclude);
  };

  return (
    <ScrollContainer ref={scrollContainerRef}>
      <Description>{getDescription()}</Description>
      <ControlsContainer>
        <Select
          options={listOption}
          defaultValue={
            mode === ReleaseSelectionMode.EXCLUDE
              ? listOption[0]
              : listOption[1]
          }
          onChange={(option) => {
            if (Array.isArray(option) || !option) {
              return;
            }
            setMode((option as { value: ReleaseSelectionMode }).value);
          }}
          styles={{
            control: (base) => ({
              ...base,
              height: CONTROLS_HEIGHT,
              minHeight: CONTROLS_HEIGHT,
            }),
            valueContainer: (base) => ({
              ...base,
              height: CONTROLS_HEIGHT - AK_SELECT_PADDING_ADJUST,
              minHeight: CONTROLS_HEIGHT - AK_SELECT_PADDING_ADJUST,
            }),
            indicatorsContainer: (base) => ({
              ...base,
              height: CONTROLS_HEIGHT - AK_SELECT_PADDING_ADJUST,
              minHeight: CONTROLS_HEIGHT - AK_SELECT_PADDING_ADJUST,
            }),
          }}
          isSearchable={false}
        />
        <SearchContainer>
          <ProjectSelectContainer>
            <ProjectSelect
              loading={loading}
              projects={projects.map((project) => project.payload)}
              selectedProjects={selectedProjects.map(
                (project) => project.payload,
              )}
              onProjectClick={(project) => {
                // Actions
                if (project === SelectActions.ALL_PROJECTS) {
                  setSelectedProjects(
                    items
                      ? items.map((item) => ({
                          type: 'Project',
                          payload: item.content.payload,
                        }))
                      : [],
                  );
                  return;
                }

                if (project === SelectActions.CLEAR_SELECTED) {
                  setSelectedProjects([]);
                  return;
                }

                // Important to do callback for selectedProjects here
                setSelectedProjects((selectedProjects) => {
                  const alreadySelected = selectedProjects.some(
                    ({ payload }) => payload.id === project.id,
                  );

                  return alreadySelected
                    ? remove(
                        ({ payload }) => payload.id === project.id,
                        selectedProjects,
                      )
                    : selectedProjects.concat({
                        type: 'Project',
                        payload: project,
                      });
                });
              }}
            />
          </ProjectSelectContainer>

          <Textfield
            isCompact
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            placeholder={formatMessage(msgs.searchForRelease)}
            elemAfterInput={
              <EditorSearchIcon label={formatMessage(msgs.searchForRelease)} />
            }
          />
        </SearchContainer>
      </ControlsContainer>

      <TableTreeContainer>
        <TableTree>{tableChildren()}</TableTree>
      </TableTreeContainer>
    </ScrollContainer>
  );
};

export default ReleasesModalContent;
