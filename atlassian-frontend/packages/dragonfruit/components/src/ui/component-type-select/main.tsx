import React from 'react';

import Select, { SelectProps } from '@atlaskit/select';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { Modify, useIntl } from '@atlassian/dragonfruit-utils';

import { ComponentTypeIcon } from '../../common/ui/component-type-icon';

import { LabelContainer, OptionContainer } from './styled';

type CompassComponentTypeOption = {
  label: string;
  value: CompassComponentType;
};

type BaseProps = SelectProps<CompassComponentTypeOption>;

type ComponentTypesProps = Modify<
  BaseProps,
  {
    testId?: string;
    value: CompassComponentType;
    onChange: (value: CompassComponentType) => void;
  }
>;

export function ComponentTypeSelect(props: ComponentTypesProps) {
  const { onChange, value, testId, ...forwardProps } = props;

  const { formatMessage } = useIntl();

  const options: CompassComponentTypeOption[] = [
    {
      label: formatMessage(CommonMessages.service),
      value: CompassComponentType.SERVICE,
    },
    {
      label: formatMessage(CommonMessages.library),
      value: CompassComponentType.LIBRARY,
    },
    {
      label: formatMessage(CommonMessages.application),
      value: CompassComponentType.APPLICATION,
    },
    {
      label: formatMessage(CommonMessages.other),
      value: CompassComponentType.OTHER,
    },
  ];

  const currentValue = value
    ? options.find((option) => option.value === value)
    : options[0]; // Default to the first option, a value must always be selected

  const handleChange: BaseProps['onChange'] = (option, meta) => {
    if (meta.action === 'select-option' && option && !Array.isArray(option)) {
      onChange(option.value);
    }
  };

  const formatOptionLabel = (props: CompassComponentTypeOption) => {
    return (
      <OptionContainer>
        <ComponentTypeIcon label={''} type={props.value} />
        <LabelContainer>{props.label}</LabelContainer>
      </OptionContainer>
    );
  };

  return (
    <Select<CompassComponentTypeOption>
      id={testId}
      aria-label="Component Type"
      options={options}
      isSearchable={false}
      {...forwardProps}
      formatOptionLabel={formatOptionLabel}
      value={currentValue}
      onChange={handleChange}
    />
  );
}
