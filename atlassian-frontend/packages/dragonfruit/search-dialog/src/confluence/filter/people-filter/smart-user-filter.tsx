import React, { FunctionComponent } from 'react';
import { OptionType, FilterComponentProps } from '@atlassian/search-dialog';
import { OptionData, SmartUserPicker } from '@atlaskit/user-picker';
import { FilterOptionSource } from '../../../common/filters/types';
import { useClients } from '../../../confluence/clients';
import { PeopleFilterOption } from '../../../confluence/filter-context';

export const mapOptionDataToOptionType = (
  optionData: OptionData,
): OptionType<PeopleFilterOption> => {
  return {
    label: optionData.name,
    value: {
      avatarUrl: optionData.avatarUrl,
      displayName: optionData.name,
      id: optionData.id,
      isChecked: true,
      isVisible: true,
      filterSource: FilterOptionSource.SMART_USER_PICKER,
    },
  };
};

export const mapOptionTypeToOptionData = (
  optionType: OptionType<PeopleFilterOption>,
): OptionData => {
  return {
    avatarUrl: optionType.value.avatarUrl,
    name: optionType.value.displayName,
    id: optionType.value.id,
  };
};

const SmartUserFilter: FunctionComponent<FilterComponentProps<
  PeopleFilterOption
>> = (props: FilterComponentProps<PeopleFilterOption>) => {
  const { cloudId } = useClients();
  const filterOptions = (options: OptionData[], query: string) => {
    return query === ''
      ? props.defaultOptions.map(mapOptionTypeToOptionData)
      : options;
  };
  return (
    <SmartUserPicker
      fieldId="quickSearch"
      productKey="confluence"
      menuPosition="fixed"
      captureMenuScroll
      width={250}
      placeholder={props.placeholderText}
      principalId="Context"
      siteId={cloudId}
      debounceTime={150}
      autoFocus
      onBlur={() => {
        props.refocusEditLink();
        props.onMenuClosed();
      }}
      onChange={(value, action) => {
        const optionDataValue = value as OptionData;
        props.onConfirm(mapOptionDataToOptionType(optionDataValue));
        props.onMenuClosed();
      }}
      filterOptions={filterOptions}
    />
  );
};

export default SmartUserFilter;
