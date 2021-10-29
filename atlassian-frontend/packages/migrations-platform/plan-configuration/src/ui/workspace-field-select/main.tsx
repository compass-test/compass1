import React, { FC, useCallback, useMemo } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Avatar from '@atlaskit/avatar';

import ButtonGroup, {
  Props as ButtonGroupProps,
} from '../../common/ui/migration-button-group';
import FieldSelect, {
  Props as FieldSelectProps,
} from '../../common/ui/migration-field-select';

import messages from './messages';
import {
  ButtonGroupWrapper,
  SelectContainer,
  SelectLabel,
  SelectLabelContainer,
} from './styled';
import type { BBWorkspace } from './types';
import { workspaceToOption } from './utils';

type OnChange = NonNullable<FieldSelectProps<BBWorkspace>['onChange']>;

type ProxyFieldSelectProps = Omit<
  FieldSelectProps<BBWorkspace>,
  'name' | 'options' | 'defaultOption' | 'onChange'
>;

type ProxyButtonGroupProps = Omit<ButtonGroupProps, 'appearance'>;

export type Props = ProxyFieldSelectProps &
  ProxyButtonGroupProps & {
    options?: BBWorkspace[];
    defaultOption?: BBWorkspace;
    onChange?: (value?: BBWorkspace) => void;
    name?: string;
  };

const WorkspaceFieldSelect: FC<Props & InjectedIntlProps> = ({
  intl,
  options = [],
  defaultOption,
  onChange,
  productMeta,
  name = 'migration-workspace',
  label = intl.formatMessage(messages.label),
  placeholder = intl.formatMessage(messages.placeholder),
  getMigrationGatewayUrl,
  getCloudTrialUrl,
  ...props
}) => {
  // Map the BBWorkspace to BBWorkspaceOption
  const workspaceOptions = useMemo(() => {
    return options.map(workspaceToOption);
  }, [options]);
  const workspaceDefaultOption =
    defaultOption && workspaceToOption(defaultOption);

  // Map BBWorkspaceOption back to BBWorkspace in callback
  const onChangeWorkspaceOption = useCallback<OnChange>(
    (value) => {
      if (onChange && value) {
        // Bypassing the `react-select` OptionsType mismatch 
        // assuming the value is the single select
        const workspace: BBWorkspace = (value as any).data;

        // Update the consumer
        onChange(workspace);
      }
    },
    [onChange],
  );

  return (
    <SelectContainer>
      <FieldSelect<BBWorkspace>
        {...props}
        name={name}
        label={label}
        placeholder={placeholder}
        options={workspaceOptions}
        defaultOption={workspaceDefaultOption}
        onChange={onChangeWorkspaceOption}
        formatOptionLabel={({ data }) => {
          return (
            <SelectLabelContainer>
              <Avatar
                appearance="square"
                size="small"
                src={data.links.avatar.href}
              />
              <SelectLabel>{data.name}</SelectLabel>
            </SelectLabelContainer>
          );
        }}
      />
      <ButtonGroupWrapper>
        <ButtonGroup
          productMeta={productMeta}
          administrator={intl.formatMessage(messages.administratorText)}
          getMigrationGatewayUrl={getMigrationGatewayUrl}
          getCloudTrialUrl={getCloudTrialUrl}
        />
      </ButtonGroupWrapper>
    </SelectContainer>
  );
};

export default injectIntl(WorkspaceFieldSelect);
