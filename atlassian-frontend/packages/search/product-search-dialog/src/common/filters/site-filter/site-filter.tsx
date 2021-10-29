import React, { FunctionComponent, useCallback } from 'react';
import {
  ColumnFilterGroup,
  FilterColLabelText,
  FilterShowMore,
  FilterShowMoreItem,
} from '@atlassian/search-dialog';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { messages } from '../../../messages';
import { FilterOptionSource, SiteFilterOption } from '../types';
import {
  ProductFilterItem,
  OnChangeHandler,
} from '../../product-search-filter';
import { useSessionUserInput } from '../../../extensible/user-input-provider';
import { useAnalytics, onFilterSelect } from '../../analytics';
import { AsyncSelectFilterComponent } from '@atlassian/search-dialog';

export const MAX_SELECTED_SITES = 5;
export interface SiteFilterProps {
  availableFilters: SiteFilterOption[];
  onChange: (value: SiteFilterOption, isChecked: boolean) => any;
}

type SiteFilterItemProps = SiteFilterOption & {
  onChange: OnChangeHandler;
  isDisabled: boolean;
};

export const SiteFilterItem: FunctionComponent<SiteFilterItemProps> = (
  props,
) => {
  const { id, isChecked, filterSource, onChange, siteName, isDisabled } = props;

  return (
    <ProductFilterItem
      value={id}
      filterType="site"
      label={siteName}
      onChange={onChange}
      isChecked={isChecked}
      filterSource={filterSource}
      isDisabled={isDisabled}
      LabelComponent={FilterColLabelText}
    />
  );
};

const renderFilterResult = ({ avatarUrl, siteName }: SiteFilterOption) => (
  <FilterShowMoreItem label={siteName} />
);

const SiteFilter: FunctionComponent<SiteFilterProps & InjectedIntlProps> = ({
  availableFilters,
  onChange,
  intl,
}) => {
  // There is an assumption that there is exactly one filter selected initially in `availableFilters`.
  // This assumption will change in the future (milestone 3 of the search in start project).
  const { fireAnalyticsEvent } = useAnalytics();
  const { stickySearchEnabled, isStickyUpdated } = useSessionUserInput();

  const options = availableFilters.map((f) => ({
    label: f.siteName,
    value: f,
  }));

  const visibleSites = options.filter((f) => f.value.isVisible);

  const onChangeCallback = useCallback(
    (value, _, checked) => {
      onChange(value, checked);
    },
    [onChange],
  );

  const addFilter = useCallback(
    ({ value }) => {
      fireAnalyticsEvent(
        onFilterSelect({
          filterId: value.id,
          filterSource: FilterOptionSource.EXTERNAL,
          filterType: 'site',
          isSticky: stickySearchEnabled,
          isStickyUpdated,
        }),
      );

      onChange(value.id, true);
    },
    [fireAnalyticsEvent, stickySearchEnabled, isStickyUpdated, onChange],
  );

  const showMoreOptions = availableFilters
    .filter((o) => !o.isVisible)
    .map((option) => ({
      label: renderFilterResult(option),
      value: option,
    }));

  const loadOptions = useCallback(
    (query: string) =>
      Promise.resolve(
        showMoreOptions.filter(
          (option) =>
            option.value.siteName.indexOf(query.trim().toLowerCase()) !== -1,
        ),
      ),
    [showMoreOptions],
  );
  const checkedSites = availableFilters.filter((f) => f.isChecked);

  return (
    <ColumnFilterGroup
      title={intl.formatMessage(messages.site_filters_title)}
      isLoading={false}
    >
      <>
        {visibleSites.map(({ value }) => {
          return (
            <SiteFilterItem
              {...value}
              key={`site_filter_${value.id}`}
              onChange={onChangeCallback}
              isDisabled={
                checkedSites.length === MAX_SELECTED_SITES && !value.isChecked
              }
            />
          );
        })}
        {/* We only show the show more if there are options to be selected from it */}
        {showMoreOptions.length > 0 ? (
          <FilterShowMore<SiteFilterOption>
            placeholderText={intl.formatMessage(
              messages.site_filters_find_more,
            )}
            addFilter={addFilter}
            defaultOptions={showMoreOptions}
            loadOptions={loadOptions}
            buttonText={intl.formatMessage(messages.show_more_filters)}
            isDisabled={checkedSites.length === MAX_SELECTED_SITES}
            filterComponent={AsyncSelectFilterComponent}
          />
        ) : null}
      </>
    </ColumnFilterGroup>
  );
};

export default injectIntl(SiteFilter);
