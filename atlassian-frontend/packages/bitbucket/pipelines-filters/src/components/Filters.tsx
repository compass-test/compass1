import React, { CSSProperties, useCallback, useEffect, useState } from 'react';

import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import Select, { StylesConfig } from '@atlaskit/select';
import Tooltip from '@atlaskit/tooltip';

import {
  FiltersProps,
  PipelineType,
  Search,
  StateProps,
  Status,
  Trigger,
  Uuid,
} from '../types';

import { BranchesListFilter } from './BranchesListFilter';
import { SearchFilter } from './SearchFilter';
import StaticStatusIcon from './StatusIcon/StaticStatusIcon';
import * as styles from './styled';
import { UsersEmptyState, UsersFilter } from './UsersFilter';

const DEBOUNCE_FILTER_CHANGED_TIMER = 400;

const defaultStatuses = [
  {
    label: 'Successful',
    icon: 'success',
    value: ['PASSED', 'SUCCESSFUL'],
  },
  {
    label: 'Failed',
    icon: 'failed',
    value: ['FAILED', 'ERROR'],
  },
  {
    label: 'In progress',
    icon: 'building',
    value: ['PENDING', 'BUILDING', 'IN_PROGRESS'],
  },
  {
    label: 'Paused',
    icon: 'paused',
    value: ['PAUSED', 'HALTED'],
  },
  {
    label: 'Stopped',
    icon: 'stopped',
    value: ['STOPPED', 'SKIPPED'],
  },
];
const defaultTriggerTypes = [
  { label: 'Push', value: 'Push' },
  { label: 'Rerun / Manual', value: 'Manual' },
  { label: 'Scheduled', value: 'Scheduled' },
];
const formatPipelineTypeOption = (pipelineType: PipelineType) =>
  pipelineType.pattern
    ? {
        label: `${pipelineType.type}: ${pipelineType.pattern}`,
        value: `${pipelineType.type}: ${pipelineType.pattern}`,
      }
    : {
        label: `${pipelineType.type}`,
        value: `${pipelineType.type}`,
      };

const Filters = ({
  users,
  url,
  parseFilterPathParam,
  statuses = defaultStatuses,
  triggerTypes = defaultTriggerTypes,
  onUpdateFilter,
  pipelineDefinitions,
  getBranches,
  showSearchFilter,
  showUsersFilter,
  defaultBranchValue,
  onBranchChange,
}: FiltersProps) => {
  const filters = url ? parseFilterPathParam(url) : null;

  const getDefaultStatusItem = (
    selectedStatus: string[] | null | undefined,
  ) => {
    const defaultStatusItem = statuses?.filter((status) =>
      isEqual(status.value, selectedStatus),
    )[0];
    if (defaultStatusItem === null || defaultStatusItem === undefined) {
      return defaultStatusItem;
    }
    return {
      label: (
        <p>
          <StaticStatusIcon
            iconName={defaultStatusItem.icon}
            iconText={defaultStatusItem.label}
          />
        </p>
      ),
      value: defaultStatusItem.value,
    };
  };

  const getDefaultTriggerTypeItem = (
    selectedTriggerType: string | null | undefined,
  ) => {
    const defaultTriggerTypeItem = (triggerTypes as any).filter(
      (triggerType: Trigger) => isEqual(triggerType.value, selectedTriggerType),
    )[0];
    if (
      defaultTriggerTypeItem === null ||
      defaultTriggerTypeItem === undefined
    ) {
      return defaultTriggerTypeItem;
    }
    return {
      label: defaultTriggerTypeItem.label,
      value: defaultTriggerTypeItem.value,
    };
  };

  const [selectedStatus, setSelectedStatus] = useState(filters?.selectedStatus);
  const [selectedTriggerType, setSelectedTriggerType] = useState(
    filters?.selectedTriggerType,
  );
  const [selectedPipelineType, setSelectedPipelineType] = useState(
    filters?.selectedPipelineType,
  );
  const [search, setSearch] = useState(filters?.search);
  const [uuid, setUuid] = useState(filters?.uuid);
  const [defaultStatusItem] = useState(
    filters ? getDefaultStatusItem(filters.selectedStatus) : null,
  );
  const [defaultTriggerTypeItem] = useState(
    filters ? getDefaultTriggerTypeItem(filters.selectedTriggerType) : null,
  );

  const [selectedPipelineTypeItem, setSelectedPipelineTypeItem] = useState<any>(
    null,
  );

  useEffect(() => {
    const selectedPipelineTypeItem = (pipelineDefinitions as any)?.filter(
      (pipelineType: PipelineType) =>
        isEqual(
          formatPipelineTypeOption(pipelineType).value,
          selectedPipelineType,
        ),
    )[0];
    setSelectedPipelineTypeItem(
      selectedPipelineTypeItem
        ? formatPipelineTypeOption(selectedPipelineTypeItem)
        : null,
    );
  }, [pipelineDefinitions, selectedPipelineType]);

  const notifyFiltersChanged = () => {
    const filters = {
      selectedStatus,
      selectedTriggerType,
      selectedPipelineType,
      search,
      uuid,
    };
    onUpdateFilter(filters);
  };

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedNotifyFiltersChanged = useCallback(
    debounce(notifyFiltersChanged, DEBOUNCE_FILTER_CHANGED_TIMER),
    [selectedStatus, selectedTriggerType, selectedPipelineType, search, uuid],
  );

  useEffect(() => {
    debouncedNotifyFiltersChanged();

    return debouncedNotifyFiltersChanged.cancel;
  }, [
    selectedStatus,
    selectedTriggerType,
    selectedPipelineType,
    search,
    uuid,
    debouncedNotifyFiltersChanged,
  ]);

  const getStatusItems = () =>
    (statuses as any).map((x: Status) => ({
      label: (
        <p>
          <StaticStatusIcon iconName={x.icon} iconText={x.label} />
        </p>
      ),
      value: x.value,
    }));

  const getTriggerTypeItems = () =>
    (triggerTypes as any).map((triggerType: Trigger) => ({
      label: triggerType.label,
      value: triggerType.value,
    }));

  const getPipelineTypeItems = () => {
    if (pipelineDefinitions) {
      return pipelineDefinitions.map(formatPipelineTypeOption);
    }
    return undefined;
  };

  const onStatusChange = (item: any) => {
    setSelectedStatus(item !== null ? item?.value : null);
  };

  const onTriggerTypeChange = (item: any) => {
    setSelectedTriggerType(item !== null ? item.value : null);
  };

  const onPipelineTypeChange = (item: any) => {
    setSelectedPipelineType(item !== null ? item.value : null);
  };

  const onSearchChange = (search: Search) => {
    setSearch(search);
  };

  const onUserAvatarClick = (userUuid: Uuid) => {
    setUuid(uuid === userUuid ? null : userUuid);
  };

  const additionalStyles = () => ({
    control: (css: CSSProperties, state: StateProps) => ({
      ...css,
      ...styles.subtleSelector(css, state),
      height: 30,
      width: 165,
    }),
    dropdownIndicator: (css: CSSProperties) => ({
      ...css,
      padding: '8px 8px 8px 0px',
    }),
    clearIndicator: (css: CSSProperties) => ({
      ...css,
      padding: '8px 0px 8px 8px',
    }),
  });

  return (
    <styles.Wrapper>
      {showSearchFilter && (
        <SearchFilter handleFilterChange={onSearchChange} search={search} />
      )}
      {showUsersFilter &&
        (!!users.length ? (
          <UsersFilter
            selectedUser={uuid}
            users={users}
            onUserAvatarClick={onUserAvatarClick}
          />
        ) : (
          <UsersEmptyState />
        ))}
      <BranchesListFilter
        getBranches={getBranches}
        defaultBranchValue={defaultBranchValue}
        onBranchChange={onBranchChange}
      />
      <Select
        defaultValue={defaultStatusItem}
        options={getStatusItems()}
        onChange={onStatusChange}
        name="status"
        placeholder="Status"
        isClearable={true}
        isSearchable={false}
        styles={additionalStyles() as StylesConfig}
      />
      <Select
        defaultValue={defaultTriggerTypeItem}
        options={getTriggerTypeItems()}
        onChange={onTriggerTypeChange}
        name="triggerType"
        placeholder="Trigger type"
        isClearable={true}
        isSearchable={false}
        styles={additionalStyles() as StylesConfig}
      />
      <Tooltip
        content={
          pipelineDefinitions === undefined
            ? 'Select a branch to then filter by pipeline type'
            : ''
        }
      >
        <Select
          value={selectedPipelineTypeItem}
          options={getPipelineTypeItems()}
          onChange={onPipelineTypeChange}
          name="pipelineType"
          placeholder="Pipeline type"
          isClearable={true}
          isDisabled={pipelineDefinitions === undefined}
          styles={additionalStyles() as StylesConfig}
        />
      </Tooltip>
    </styles.Wrapper>
  );
};

export default Filters;
