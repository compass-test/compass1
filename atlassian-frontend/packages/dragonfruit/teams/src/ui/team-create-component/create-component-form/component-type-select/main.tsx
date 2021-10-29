import React from 'react';

import Select, { components, OptionType, ValueType } from '@atlaskit/select';
import type { OptionProps } from '@atlaskit/select/types';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { LabelText, LabelWrapper } from './styled';
import { ComponentTypesProps } from './types';
export interface OptionWithIcon extends OptionType {
  icon: JSX.Element;
}

const { Option } = components;

// Override formatting for the individual options within the dropdown list for a Select
const CustomOption: React.FC<OptionProps<OptionWithIcon>> = ({
  children,
  ...innerProps
}) => {
  const {
    data: { icon },
  } = innerProps;

  return (
    <Option {...innerProps}>
      <LabelWrapper>
        {icon} <LabelText>{children}</LabelText>
      </LabelWrapper>
    </Option>
  );
};

const ComponentTypeOptions = (): OptionWithIcon[] => {
  const { formatMessage } = useIntl();

  return [
    {
      label: formatMessage(messages.optionService),
      value: CompassComponentType.SERVICE,
      icon: <ComponentTypeIcon type={CompassComponentType.SERVICE} />,
    },
    {
      label: formatMessage(messages.optionApplication),
      value: CompassComponentType.APPLICATION,
      icon: <ComponentTypeIcon type={CompassComponentType.APPLICATION} />,
    },
    {
      label: formatMessage(messages.optionLibrary),
      value: CompassComponentType.LIBRARY,
      icon: <ComponentTypeIcon type={CompassComponentType.LIBRARY} />,
    },
    {
      label: formatMessage(messages.optionOther),
      value: CompassComponentType.OTHER,
      icon: <ComponentTypeIcon type={CompassComponentType.OTHER} />,
    },
  ];
};

export const GetComponentTypeOptionFromValue = (
  value: string | null | undefined,
): ValueType<OptionWithIcon> | null => {
  const options = ComponentTypeOptions();

  if (!value || !options) {
    return null;
  }

  const option = options.find(
    (option: ValueType<OptionWithIcon>) =>
      option?.value ===
      CompassComponentType[value as keyof typeof CompassComponentType],
  );
  return option === undefined ? null : option;
};

const ComponentTypeSelect = (props: ComponentTypesProps) => {
  const { formatMessage } = useIntl();

  return (
    <Select<OptionWithIcon>
      {...props}
      components={{
        Option: CustomOption,
      }}
      options={ComponentTypeOptions()}
      placeholder={formatMessage(messages.placeholder)}
      classNamePrefix="dragonfruit-teams-component-type-select"
    />
  );
};

export default ComponentTypeSelect;
