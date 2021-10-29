import React, { FunctionComponent, useCallback } from 'react';
import { FilterItem, FilterItemProps } from '@atlassian/search-dialog';
import { useAnalytics, onFilterSelect, onFilterUnselect } from '../analytics';
import { FilterOptionSource } from '../../common/filters/types';
import { ProductFilterType } from '../../common/clients/common-types';

export type OnChangeHandler = (
  value: string,
  type: ProductFilterType,
  isChecked: boolean,
) => any;

interface Props extends Omit<FilterItemProps, 'onChange'> {
  filterType: ProductFilterType;
  LabelComponent: React.ElementType;
  onChange?: OnChangeHandler;
  defaultChecked?: boolean;
  filterSource: FilterOptionSource;
  isDisabled?: boolean;
}

export const ProductFilterItem: FunctionComponent<Props> = ({
  onChange,
  filterType,
  filterSource,
  isDisabled = false,
  ...rest
}: Props) => {
  const { fireAnalyticsEvent } = useAnalytics();
  const onChangeCallback = useCallback(
    (id: string, checked: boolean) => {
      if (checked) {
        fireAnalyticsEvent(
          onFilterSelect({
            filterId: id,
            filterSource,
            filterType,
          }),
        );
      } else {
        fireAnalyticsEvent(
          onFilterUnselect({
            filterId: id,
            filterSource,
            filterType,
          }),
        );
      }

      onChange?.(id, filterType, checked);
    },
    [onChange, fireAnalyticsEvent, filterType, filterSource],
  );

  return (
    <FilterItem {...rest} onChange={onChangeCallback} isDisabled={isDisabled} />
  );
};
