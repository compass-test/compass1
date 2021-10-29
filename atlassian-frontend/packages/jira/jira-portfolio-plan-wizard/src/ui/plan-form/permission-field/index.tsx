import React from 'react';

import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import UnlockFilledIcon from '@atlaskit/icon/glyph/unlock-filled';
import Select, { components, OptionProps, ValueType } from '@atlaskit/select';

import { Plan } from '../../../common/types';
import { useIntl } from '../../../common/utils/intl';

import messages from './messages';
import {
  OptionExplain,
  OptionIconWrapper,
  OptionLabel,
  OptionWrapper,
} from './styled';

type Permission = Plan['permission'];

type Props = {
  value: Permission;
  onChange: (arg0: Permission) => void;
  isDisabled?: boolean;
  id?: string;
};

type PermissionOption = { label: string; value: Permission };

const options: PermissionOption[] = [
  { label: 'Private', value: 'private' },
  { label: 'Open', value: 'open' },
];

const Option: React.FC<OptionProps<PermissionOption>> = (props) => {
  const { formatMessage } = useIntl();
  const [Icon, label, explain] = ((): [
    typeof LockFilledIcon,
    string,
    string,
  ] => {
    switch (props.data.value as Permission) {
      case 'private':
        return [
          LockFilledIcon,
          formatMessage(messages.private),
          formatMessage(messages.privateExplained),
        ];
      case 'open':
        return [
          UnlockFilledIcon,
          formatMessage(messages.open),
          formatMessage(messages.openExplained),
        ];
    }
  })();

  return (
    <components.Option {...props}>
      <OptionWrapper>
        <OptionIconWrapper isSelected={props.isSelected}>
          <Icon label={props.data.label} />
        </OptionIconWrapper>
        <div>
          <OptionLabel isSelected={props.isSelected}>{label}</OptionLabel>
          <OptionExplain isSelected={props.isSelected}>{explain}</OptionExplain>
        </div>
      </OptionWrapper>
    </components.Option>
  );
};

const PermissionField: React.FC<Props> = ({
  value,
  onChange,
  isDisabled,
  id,
}) => {
  const selected: ValueType<PermissionOption, false> =
    options.find(({ value: v }) => v === value) ?? null;

  const handleSelectChange = (selected: ValueType<PermissionOption>) => {
    return onChange((selected as PermissionOption).value);
  };

  return (
    <Select
      id={id}
      components={{ Option }}
      value={selected}
      options={options}
      onChange={handleSelectChange}
      isSearchable={false}
      isDisabled={isDisabled}
    />
  );
};

export default PermissionField;
