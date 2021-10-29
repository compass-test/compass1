import React, { FunctionComponent, useCallback } from 'react';
import { RowFilterGroup } from '@atlassian/search-dialog';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { messages } from '../../../messages';
import {
  ProductFilterItem,
  OnChangeHandler,
} from '../../../common/product-search-filter';
import { useFilterContext } from '../../filter-context';
import { FilterOptionSource } from '../../../common/filters/types';
import { FilterRowLabelText } from '@atlassian/search-dialog';

export interface BinaryStatusCategoryFilterItemProps {
  id: string;
  isChecked: boolean;
  filterSource: FilterOptionSource;
  updateFilters: OnChangeHandler;
  title: string;
}

export const BinaryStatusCategoryFilterItem: FunctionComponent<BinaryStatusCategoryFilterItemProps> = (
  props,
) => {
  const { id, isChecked, filterSource, updateFilters, title } = props;
  return (
    <ProductFilterItem
      value={id}
      filterType="binary_status_category"
      label={title}
      onChange={updateFilters}
      isChecked={isChecked}
      filterSource={filterSource}
      LabelComponent={FilterRowLabelText}
    />
  );
};

const BinaryStatusCategoryFilter: FunctionComponent<InjectedIntlProps> = ({
  intl,
}) => {
  const {
    binaryStatusCategoryFilters: { availableFilters, updateFilter },
  } = useFilterContext();

  const updateFilters = useCallback(
    (value, _, checked) => updateFilter(value, checked),
    [updateFilter],
  );

  return (
    <RowFilterGroup
      title={intl.formatMessage(messages.binary_status_category_filters_title)}
      isLoading={false}
    >
      <>
        {availableFilters.map(({ id, title, isChecked, filterSource }) => {
          return (
            <BinaryStatusCategoryFilterItem
              key={`issue_filter_${id}`}
              id={id}
              title={intl.formatMessage(title)}
              updateFilters={updateFilters}
              isChecked={!!isChecked}
              filterSource={filterSource}
            />
          );
        })}
      </>
    </RowFilterGroup>
  );
};

export default injectIntl(BinaryStatusCategoryFilter);
