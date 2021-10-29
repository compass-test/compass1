import React from 'react';

import { ValueType } from '@atlaskit/select';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import IconSelect, { Props } from '../icon-select';
import { OptionWithIcon } from '../icon-select/types';

import messages from './messages';

const ComponentTypeOptions = () => {
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

const ComponentTypeSelect = (props: Props) => {
  const { formatMessage } = useIntl();

  return (
    <IconSelect
      {...props}
      options={ComponentTypeOptions()}
      placeholder={formatMessage(messages.placeholder)}
      classNamePrefix="dragonfruit-component-type-select"
    />
  );
};

export default ComponentTypeSelect;
