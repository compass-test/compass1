import React, { FC, useCallback, useMemo, useState } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import ButtonGroup, {
  Props as ButtonGroupProps,
} from '../../../common/ui/migration-button-group';
import FieldSelect, {
  Props as FieldSelectProps,
} from '../../../common/ui/migration-field-select';

import FreeCloudSiteMessage from './free-message';
import messages from './messages';
import { ButtonGroupWrapper, SelectContainer } from './styled';
import type { CloudSite } from './types';
import { cloudSiteToOption, isSelectedFreeCloudSite } from './utils';

type OnChange = NonNullable<FieldSelectProps<CloudSite>['onChange']>;

type ProxyFieldSelectProps = Omit<
  FieldSelectProps<CloudSite>,
  'name' | 'options' | 'defaultOption' | 'onChange'
>;

type ProxyButtonGroupProps = Omit<ButtonGroupProps, 'appearance'>;

export type Props = ProxyFieldSelectProps &
  ProxyButtonGroupProps & {
    options?: CloudSite[];
    defaultOption?: CloudSite;
    onChange?: (value?: CloudSite) => void;
    name?: string;
    plansUrl: string;
  };

const CloudSiteFieldSelect: FC<Props & InjectedIntlProps> = ({
  intl,
  options = [],
  defaultOption,
  onChange,
  plansUrl,
  productMeta,
  name = 'migration-cloud-site',
  label = intl.formatMessage(messages.label),
  placeholder = intl.formatMessage(messages.placeholder),
  getMigrationGatewayUrl,
  getCloudTrialUrl,
  ...props
}) => {
  // Map CloudSite to CloudSiteOption
  const cloudSiteOptions = useMemo(() => {
    return options.map(cloudSiteToOption);
  }, [options]);
  const cloudSiteDefaultOption =
    defaultOption && cloudSiteToOption(defaultOption);

  // Determine whether currently free option is selected
  const [isFree, setFree] = useState<boolean>(
    isSelectedFreeCloudSite(defaultOption),
  );

  // Map CloudSiteOption back to CloudSite in callback
  const onChangeCloudSiteOption = useCallback<OnChange>(
    (value) => {
      if (!value) {
        return;
      }

      // Bypassing the `react-select` OptionsType mismatch 
      // assuming the value is the single select
      const cloudSite: CloudSite = (value as any).data;

      // Update the component consumer
      if (onChange) {
        onChange(cloudSite);
      }
      // Set the free state
      setFree(isSelectedFreeCloudSite(cloudSite));
    },
    [onChange],
  );

  return (
    <SelectContainer isFree={isFree}>
      <FieldSelect<CloudSite>
        {...props}
        name={name}
        label={label}
        placeholder={placeholder}
        options={cloudSiteOptions}
        defaultOption={cloudSiteDefaultOption}
        onChange={onChangeCloudSiteOption}
        validationState={isFree ? 'success' : undefined}
      >
        <>
          <ButtonGroupWrapper>
            <ButtonGroup
              productMeta={productMeta}
              getMigrationGatewayUrl={getMigrationGatewayUrl}
              getCloudTrialUrl={getCloudTrialUrl}
            />
          </ButtonGroupWrapper>
          {isFree && <FreeCloudSiteMessage plansUrl={plansUrl} />}
        </>
      </FieldSelect>
    </SelectContainer>
  );
};

export default injectIntl(CloudSiteFieldSelect);
