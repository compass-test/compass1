import React, { FunctionComponent, useCallback } from 'react';
import { FilterItem, FilterItemProps } from '@atlassian/search-dialog';
import {
  useAnalytics,
  onFilterSelect,
  onFilterUnselect,
  selectEvent,
} from '../analytics';
import { FilterOptionSource } from '../../common/filters/types';
import { ProductFilterType } from '../../common/clients/common-types';
import { useSessionUserInput } from '../../extensible/user-input-provider';
import { OptionData, Option } from '@atlaskit/user-picker/types';

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
  smartValue?: Option<OptionData>;
  allOptions?: OptionData[];
  collabGraphSessionId?: string;
}

export const ProductFilterItem: FunctionComponent<Props> = ({
  onChange,
  filterType,
  filterSource,
  isDisabled = false,
  smartValue,
  allOptions,
  collabGraphSessionId = '',
  ...rest
}: Props) => {
  const { fireAnalyticsEvent } = useAnalytics();
  const { stickySearchEnabled, isStickyUpdated } = useSessionUserInput();
  const onChangeCallback = useCallback(
    (id: string, checked: boolean) => {
      if (checked) {
        fireAnalyticsEvent(
          onFilterSelect({
            filterId: id,
            filterSource,
            filterType,
            isSticky: stickySearchEnabled,
            isStickyUpdated,
          }),
        );
        if (smartValue && allOptions) {
          fireAnalyticsEvent(
            selectEvent(
              smartValue,
              allOptions,
              'quickSearch',
              collabGraphSessionId,
            ),
          );
        }
      } else {
        fireAnalyticsEvent(
          onFilterUnselect({
            filterId: id,
            filterSource,
            filterType,
            isSticky: stickySearchEnabled,
            isStickyUpdated,
          }),
        );
      }

      onChange?.(id, filterType, checked);
    },
    [
      onChange,
      filterType,
      fireAnalyticsEvent,
      filterSource,
      stickySearchEnabled,
      isStickyUpdated,
      smartValue,
      allOptions,
      collabGraphSessionId,
    ],
  );

  return (
    <FilterItem {...rest} onChange={onChangeCallback} isDisabled={isDisabled} />
  );
};
