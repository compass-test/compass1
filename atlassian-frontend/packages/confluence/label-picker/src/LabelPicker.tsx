/** @jsx jsx */

import { jsx } from '@emotion/core';
import { defineMessages, FormattedMessage } from 'react-intl';

import { components, CreatableSelect } from '@atlaskit/select';

import {
  getNewOptionData,
  Label,
  LabelPickerProps,
  useCreatableLabelPicker,
} from './useCreatableLabelPicker';

export function LabelPicker<IsMulti extends boolean = false>(
  props: LabelPickerProps<IsMulti>,
) {
  const {
    defaultValue,
    isMulti,
    menuPortalTarget,
    onChange,
    placeholder,
    value,
  } = props;

  const selectProps = useCreatableLabelPicker<IsMulti>(props);

  return (
    <CreatableSelect
      cacheOptions
      components={{
        LoadingMessage,
        NoOptionsMessage,
      }}
      defaultOptions
      defaultValue={defaultValue}
      formatCreateLabel={formatCreateLabel}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      hideSelectedOptions
      isClearable
      isMulti={isMulti}
      menuPortalTarget={menuPortalTarget}
      onChange={onChange}
      placeholder={placeholder || <FormattedMessage {...i18n.placeholder} />}
      value={value}
      {...selectProps}
    />
  );
}

const formatCreateLabel = (inputValue: string) => (
  <FormattedMessage
    {...i18n.createLabel}
    values={{ inputValue: getNewOptionData(inputValue)?.name }}
  />
);

const getOptionLabel = (label: Label) => label.name || '';

const getOptionValue = (label: Label) => label.id;

const i18n = defineMessages({
  createLabel: {
    id: 'confluence-label-picker.create-label',
    defaultMessage: 'Create "{inputValue}"',
    description:
      'The label for the "create new ..." option in the menu. Is given the current input value.',
  },
  loadingMessage: {
    id: 'confluence-label-picker.loading-message',
    defaultMessage: 'Loading labels',
    description:
      "Text to display while the user's query for labels is executing",
  },
  noOptionsMessage: {
    id: 'confluence-label-picker.no-options-message',
    defaultMessage: 'No label found',
    description:
      "Text to display when the user's query for labels has completed without yielding any results",
  },
  placeholder: {
    id: 'confluence-label-picker.placeholder',
    defaultMessage: 'Select a label',
    description:
      "Placeholder text to display while the user hasn't selected any label, hasn't input any query for labels",
  },
});

const LoadingMessage: typeof components.LoadingMessage = (props) => (
  <components.LoadingMessage {...props}>
    <FormattedMessage {...i18n.loadingMessage} />
  </components.LoadingMessage>
);

const NoOptionsMessage: typeof components.NoOptionsMessage = (props) => (
  <components.NoOptionsMessage {...props}>
    <FormattedMessage {...i18n.noOptionsMessage} />
  </components.NoOptionsMessage>
);
