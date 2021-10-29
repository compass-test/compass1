import React, { FunctionComponent, useCallback } from 'react';
import {
  ColumnFilterGroup,
  FilterColLabelText,
  FilterShowMore,
  FilterShowMoreItem,
} from '@atlassian/search-dialog';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { messages } from '../../../messages';
import SmartUserFilter from './smart-user-filter';
import {
  ProductFilterItem,
  OnChangeHandler,
} from '../../../common/product-search-filter';
import Avatar from '@atlaskit/avatar';
import { PeopleFilterOption, useFilterContext } from '../../filter-context';
import { FilterOptionSource } from '../../../common/filters/types';
import { useSearchSessionId } from '../../../common/search-session-provider';
import debouncePromise from 'debounce-promise';
import { useClients } from '../../clients';
import { useAnalytics } from '../../../common/analytics';
import { onFilterSelect } from '../../../common/analytics/events';
import { AsyncSelectFilterComponent } from '@atlassian/search-dialog';
import { useFeatures } from '../../confluence-features';

export interface PeopleFilterProps {
  isLoading: boolean;
}

const INPUT_DEBOUNCE_TIME = 250;

const renderFilterResult = ({ avatarUrl, displayName }: PeopleFilterOption) => (
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

export interface PeopleFilterItemProps {
  id: string;
  isChecked: boolean;
  filterSource: FilterOptionSource;
  updateFilters: OnChangeHandler;
  avatarUrl: string;
  displayName: string;
}

export const PeopleFilterItem: FunctionComponent<PeopleFilterItemProps> = (
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
      filterType="contributor"
      label={displayName}
      onChange={updateFilters}
      isChecked={isChecked}
      filterSource={filterSource}
      LabelComponent={FilterColLabelText}
    />
  );
};

const PeopleFilter: FunctionComponent<
  PeopleFilterProps & InjectedIntlProps
> = ({ intl, isLoading }) => {
  const searchSessionId = useSearchSessionId();
  const {
    peopleFilters: {
      availableFilters,
      updateFilter,
      addFilters: addPeopleFilters,
    },
    siteFilters: { availableFilters: availableSiteFilters },
  } = useFilterContext();

  const { isSmartUserPickerFFEnabled, isMultiSite } = useFeatures();
  const { searchClient } = useClients();
  const { fireAnalyticsEvent } = useAnalytics();

  const isSmartUserPickerEnabled = !isMultiSite && isSmartUserPickerFFEnabled;

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadOptions = useCallback(
    debouncePromise(
      (query: string) =>
        searchClient
          .searchUsers(
            query,
            {
              sessionId: searchSessionId,
              referrerId: null,
            },
            availableSiteFilters.filter((site) => site.isChecked),
          )
          .promise()
          .then((peopleResults) =>
            peopleResults.items.map((result) => {
              const value: PeopleFilterOption = {
                id: result.userId,
                displayName: result.name,
                avatarUrl: result.avatarUrl,
                filterSource: FilterOptionSource.SEARCH,
                isChecked: false,
                isVisible: false,
              };
              return {
                label: renderFilterResult(value),
                value,
              };
            }),
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
          filterType: 'contributor',
        }),
      );
      addPeopleFilters([{ ...value, isChecked: true, isVisible: true }]);
    },
    [addPeopleFilters, fireAnalyticsEvent],
  );

  const updateFilters = useCallback(
    (value, _, checked) => updateFilter(value, checked),
    [updateFilter],
  );

  const filterProps = {
    placeholderText: intl.formatMessage(messages.contributor_filters_find_more),
    loadOptions,
    defaultOptions: availableFilters
      .filter((f) => !f.isVisible)
      .map((option) => ({
        label: renderFilterResult(option),
        value: option,
      })),
    addFilter: addFilters,
    buttonText: intl.formatMessage(messages.show_more_filters),
    isDisabled: false,
  };

  return (
    <ColumnFilterGroup
      title={intl.formatMessage(messages.contributor_filters_title)}
      isLoading={isLoading}
      avatarShape="circle"
    >
      <>
        {availableFilters
          .filter((f) => f.isVisible)
          .map(({ id, displayName, avatarUrl, isChecked, filterSource }) => {
            return (
              <PeopleFilterItem
                key={`people_filter_${id}`}
                id={id}
                avatarUrl={avatarUrl}
                displayName={displayName}
                updateFilters={updateFilters}
                isChecked={!!isChecked}
                filterSource={filterSource}
              />
            );
          })}
        {isSmartUserPickerEnabled ? (
          <FilterShowMore<PeopleFilterOption>
            {...filterProps}
            filterComponent={SmartUserFilter}
          />
        ) : (
          <FilterShowMore<PeopleFilterOption>
            {...filterProps}
            filterComponent={AsyncSelectFilterComponent}
          />
        )}
      </>
    </ColumnFilterGroup>
  );
};

export default injectIntl(PeopleFilter);
