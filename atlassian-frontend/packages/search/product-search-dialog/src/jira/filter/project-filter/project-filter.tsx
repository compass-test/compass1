import React, { FunctionComponent, useCallback } from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import debouncePromise from 'debounce-promise';

import Avatar from '@atlaskit/avatar';

import {
  ColumnFilterGroup,
  FilterColLabelText,
  FilterShowMore,
  FilterShowMoreItem,
} from '@atlassian/search-dialog';

import { useFilterContext, ProjectFilterOption } from '../../filter-context';
import { FilterOptionSource } from '../../../common/filters/types';
import { useJiraSearchClientContext } from '../../clients';

import { messages } from '../../../messages';
import {
  ProductFilterItem,
  OnChangeHandler,
} from '../../../common/product-search-filter';
import { useSearchSessionId } from '../../../common/search-session-provider';
import { useAnalytics } from '../../../common/analytics';
import { onFilterSelect } from '../../../common/analytics/events';
import { isSingleAvatar } from '../../clients/response-types';
import { AsyncSelectFilterComponent } from '@atlassian/search-dialog';

export interface ProjectFilterProps {
  isLoading: boolean;
}

const renderFilterResult = ({ iconUrl, name }: ProjectFilterOption) => (
  <FilterShowMoreItem
    icon={
      <Avatar
        borderColor="transparent"
        src={iconUrl}
        appearance="square"
        size={'small'}
        name={name}
      />
    }
    label={name}
  />
);

const INPUT_DEBOUNCE_TIME = 250;

export interface ProjectFilterItemProps {
  id: string;
  isChecked: boolean;
  filterSource: FilterOptionSource;
  updateFilters: OnChangeHandler;
  iconUrl: string;
  name: string;
}

export const ProjectFilterItem: FunctionComponent<ProjectFilterItemProps> = (
  props,
) => {
  const { id, isChecked, filterSource, updateFilters, iconUrl, name } = props;

  const icon = React.useMemo(
    () => (
      <Avatar
        borderColor="transparent"
        src={iconUrl}
        appearance="square"
        size={'small'}
        name={name}
      />
    ),
    [iconUrl, name],
  );

  return (
    <ProductFilterItem
      value={id}
      icon={icon}
      filterType="project"
      label={name}
      onChange={updateFilters}
      isChecked={isChecked}
      filterSource={filterSource}
      LabelComponent={FilterColLabelText}
    />
  );
};

const ProjectFilter: FunctionComponent<
  ProjectFilterProps & InjectedIntlProps
> = ({ intl, isLoading }) => {
  const {
    projectFilters: {
      availableFilters,
      updateFilter,
      addFilters: addProjectFilters,
    },
    siteFilters: { availableFilters: availableSiteFilters },
  } = useFilterContext();

  const searchSessionId = useSearchSessionId();
  const { searchClient } = useJiraSearchClientContext();
  const { fireAnalyticsEvent } = useAnalytics();

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadOptions = useCallback(
    debouncePromise(
      (query: string) =>
        searchClient
          .searchProjects(
            query,
            {
              sessionId: searchSessionId,
              referrerId: null,
            },
            availableSiteFilters.filter((site) => site.isChecked),
          )
          .promise()
          .then((projectResults) =>
            projectResults.items.map(
              ({ resultId, name, attributes: { avatar } }) => {
                const value: ProjectFilterOption = {
                  id: resultId,
                  name,
                  iconUrl: isSingleAvatar(avatar)
                    ? avatar.url
                    : avatar.urls['24x24'],
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
          filterType: 'project',
        }),
      );
      addProjectFilters([{ ...value, isChecked: true, isVisible: true }]);
    },
    [addProjectFilters, fireAnalyticsEvent],
  );

  const updateFilters = useCallback(
    (value, _, checked) => updateFilter(value, checked),
    [updateFilter],
  );

  return (
    <ColumnFilterGroup
      title={intl.formatMessage(messages.project_filters_title)}
      isLoading={isLoading}
      avatarShape={['small-square', 'square']}
    >
      <>
        {availableFilters
          .filter((f) => f.isVisible)
          .map(({ id, name, iconUrl, isChecked, filterSource }) => {
            return (
              <ProjectFilterItem
                key={`project_filter_${id}`}
                id={id}
                name={name}
                isChecked={!!isChecked}
                iconUrl={iconUrl}
                filterSource={filterSource}
                updateFilters={updateFilters}
              />
            );
          })}
        <FilterShowMore<ProjectFilterOption>
          placeholderText={intl.formatMessage(
            messages.project_filters_find_more,
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

export default injectIntl(ProjectFilter);
