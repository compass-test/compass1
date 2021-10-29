import React, { FunctionComponent, useCallback } from 'react';
import {
  ColumnFilterGroup,
  FilterColLabelText,
  FilterShowMore,
  FilterShowMoreItem,
} from '@atlassian/search-dialog';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { messages } from '../../../messages';
import {
  ProductFilterItem,
  OnChangeHandler,
} from '../../../common/product-search-filter';
import Avatar from '@atlaskit/avatar';
import { AssigneeFilterOption, useFilterContext } from '../../filter-context';
import { FilterOptionSource } from '../../../common/filters/types';
import { useSearchSessionId } from '../../../common/search-session-provider';
import debouncePromise from 'debounce-promise';
import { useJiraSearchClientContext } from '../../clients';
import { useAnalytics } from '../../../common/analytics';
import { onFilterSelect } from '../../../common/analytics/events';
import { AsyncSelectFilterComponent } from '@atlassian/search-dialog';

export interface AssigneeFilterProps {
  isLoading: boolean;
}

const INPUT_DEBOUNCE_TIME = 250;

const renderFilterResult = ({
  avatarUrl,
  displayName,
}: AssigneeFilterOption) => (
  <FilterShowMoreItem
    icon={
      <Avatar
        borderColor="transparent"
        src={avatarUrl}
        appearance="circle"
        size={'small'}
        name={displayName}
      />
    }
    label={displayName}
  />
);

export interface AssigneeFilterItemProps {
  id: string;
  isChecked: boolean;
  filterSource: FilterOptionSource;
  updateFilters: OnChangeHandler;
  avatarUrl: string;
  displayName: string;
}

export const AssigneeFilterItem: FunctionComponent<AssigneeFilterItemProps> = (
  props,
) => {
  const {
    id,
    isChecked,
    filterSource,
    updateFilters,
    avatarUrl,
    displayName,
  } = props;

  const icon = React.useMemo(
    () => (
      <Avatar
        borderColor="transparent"
        src={avatarUrl}
        appearance="circle"
        size={'small'}
        name={displayName}
      />
    ),
    [avatarUrl, displayName],
  );

  return (
    <ProductFilterItem
      value={id}
      icon={icon}
      filterType="assignee"
      label={displayName}
      onChange={updateFilters}
      isChecked={isChecked}
      filterSource={filterSource}
      LabelComponent={FilterColLabelText}
    />
  );
};

const AssigneeFilter: FunctionComponent<
  AssigneeFilterProps & InjectedIntlProps
> = ({ intl, isLoading }) => {
  const searchSessionId = useSearchSessionId();
  const {
    assigneeFilters: {
      availableFilters,
      updateFilter,
      addFilters: addAssigneeFilters,
    },
    siteFilters: { availableFilters: availableSiteFilters },
  } = useFilterContext();

  const { searchClient } = useJiraSearchClientContext();
  const { fireAnalyticsEvent } = useAnalytics();

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadOptions = useCallback(
    debouncePromise(
      (query: string) =>
        searchClient
          .searchPeople(
            query,
            {
              sessionId: searchSessionId,
              referrerId: null,
            },
            availableSiteFilters.filter((site) => site.isChecked),
          )
          .promise()
          .then((assigneeResults) =>
            assigneeResults.items.map(
              ({ name, attributes: { userId, avatarUrl } }) => {
                const value: AssigneeFilterOption = {
                  id: userId,
                  displayName: name,
                  avatarUrl: avatarUrl,
                  filterSource: FilterOptionSource.SEARCH,
                  isChecked: false,
                  isVisible: false,
                };
                return {
                  label: renderFilterResult(value),
                  value,
                };
              },
            ),
          )
          .catch(() => []), // Swallow the error here and show no results instead
      INPUT_DEBOUNCE_TIME,
    ),
    [searchClient, searchSessionId, availableSiteFilters],
  );

  const addFilters = useCallback(
    ({ value }) => {
      fireAnalyticsEvent(
        onFilterSelect({
          filterId: value.id,
          filterSource: value.filterSource || FilterOptionSource.SEARCH,
          filterType: 'assignee',
        }),
      );
      addAssigneeFilters([{ ...value, isChecked: true, isVisible: true }]);
    },
    [addAssigneeFilters, fireAnalyticsEvent],
  );

  const updateFilters = useCallback(
    (value, _, checked) => updateFilter(value, checked),
    [updateFilter],
  );

  return (
    <ColumnFilterGroup
      title={intl.formatMessage(messages.assignee_filters_title)}
      isLoading={isLoading}
      avatarShape="circle"
    >
      <>
        {availableFilters
          .filter((f) => f.isVisible)
          .map(({ id, displayName, avatarUrl, isChecked, filterSource }) => {
            return (
              <AssigneeFilterItem
                key={`assignee_filter_${id}`}
                id={id}
                avatarUrl={avatarUrl}
                displayName={displayName}
                updateFilters={updateFilters}
                isChecked={!!isChecked}
                filterSource={filterSource}
              />
            );
          })}
        <FilterShowMore<AssigneeFilterOption>
          placeholderText={intl.formatMessage(
            messages.assignee_filters_find_more,
          )}
          loadOptions={loadOptions}
          defaultOptions={availableFilters
            .filter((f) => !f.isVisible)
            .map((option) => ({
              label: renderFilterResult(option),
              value: option,
            }))}
          addFilter={addFilters}
          buttonText={intl.formatMessage(messages.show_more_filters)}
          isDisabled={false}
          filterComponent={AsyncSelectFilterComponent}
        />
      </>
    </ColumnFilterGroup>
  );
};

export default injectIntl(AssigneeFilter);
