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
import { useFilterContext, SpaceFilterOption } from '../../filter-context';
import { FilterOptionSource } from '../../../common/filters/types';
import { useSearchSessionId } from '../../../common/search-session-provider';
import debouncePromise from 'debounce-promise';
import { useClients } from '../../clients';
import { useAnalytics } from '../../../common/analytics';
import { onFilterSelect } from '../../../common/analytics/events';
import { AsyncSelectFilterComponent } from '@atlassian/search-dialog';

export interface SpaceFilterProps {
  isLoading: boolean;
}

const renderFilterResult = ({ iconUrl, spaceName }: SpaceFilterOption) => (
  <FilterShowMoreItem
    icon={
      <Avatar
        borderColor="transparent"
        src={iconUrl}
        appearance="square"
        size={'small'}
        name={spaceName}
      />
    }
    label={spaceName}
  />
);

const INPUT_DEBOUNCE_TIME = 250;

export interface SpaceFilterItemProps {
  id: string;
  isChecked: boolean;
  filterSource: FilterOptionSource;
  updateFilters: OnChangeHandler;
  iconUrl: string;
  spaceName: string;
}

export const SpaceFilterItem: FunctionComponent<SpaceFilterItemProps> = (
  props,
) => {
  const {
    id,
    isChecked,
    filterSource,
    updateFilters,
    iconUrl,
    spaceName,
  } = props;

  const icon = React.useMemo(
    () => (
      <Avatar
        borderColor="transparent"
        src={iconUrl}
        appearance="square"
        size={'small'}
        name={spaceName}
      />
    ),
    [iconUrl, spaceName],
  );

  return (
    <ProductFilterItem
      value={id}
      icon={icon}
      filterType="space"
      label={spaceName}
      onChange={updateFilters}
      isChecked={isChecked}
      filterSource={filterSource}
      LabelComponent={FilterColLabelText}
    />
  );
};

const SpaceFilter: FunctionComponent<SpaceFilterProps & InjectedIntlProps> = ({
  intl,
  isLoading,
}) => {
  const {
    spaceFilters: {
      availableFilters,
      updateFilter,
      addFilters: addSpaceFilters,
    },
    siteFilters: { availableFilters: availableSiteFilters },
  } = useFilterContext();

  const searchSessionId = useSearchSessionId();
  const { searchClient } = useClients();
  const { fireAnalyticsEvent } = useAnalytics();

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadOptions = useCallback(
    debouncePromise(
      (query: string) =>
        searchClient
          .searchSpaces(
            query,
            {
              sessionId: searchSessionId,
              referrerId: null,
            },
            availableSiteFilters.filter((site) => site.isChecked),
          )
          .promise()
          .then((spaceResults) =>
            spaceResults.items.map((result) => {
              const value: SpaceFilterOption = {
                id: result.key,
                spaceName: result.name,
                iconUrl: result.avatarUrl,
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
          filterType: 'space',
        }),
      );
      addSpaceFilters([{ ...value, isChecked: true, isVisible: true }]);
    },
    [addSpaceFilters, fireAnalyticsEvent],
  );

  const updateFilters = useCallback(
    (value, _, checked) => updateFilter(value, checked),
    [updateFilter],
  );

  return (
    <ColumnFilterGroup
      title={intl.formatMessage(messages.space_filters_title)}
      isLoading={isLoading}
      avatarShape={['small-square', 'square']}
    >
      <>
        {availableFilters
          .filter((f) => f.isVisible)
          .map(({ id, spaceName, iconUrl, isChecked, filterSource }) => {
            return (
              <SpaceFilterItem
                key={`space_filter_${id}`}
                id={id}
                spaceName={spaceName}
                isChecked={!!isChecked}
                iconUrl={iconUrl}
                filterSource={filterSource}
                updateFilters={updateFilters}
              />
            );
          })}
        <FilterShowMore<SpaceFilterOption>
          placeholderText={intl.formatMessage(messages.space_filters_find_more)}
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

export default injectIntl(SpaceFilter);
