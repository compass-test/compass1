import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { RadioGroup } from '@atlaskit/radio';
import type { OptionsPropType } from '@atlaskit/radio/types';
import Tooltip from '@atlaskit/tooltip';
import { RadioLabel } from '@atlassian/mpt-radio-label';

import { messages } from './messages';

const OPTION_ALL = 'all';
const OPTION_NONE = 'none';

export type Option = 'all' | 'none';
export type Props = {
  selectedValue: Option;
  appsCount?: number;
  isLoading: boolean;
  isCoreDataSelected: boolean;
  descriptionOnSelectAllEnabled: React.ReactNode;
  descriptionOnSelectAllDisabled: React.ReactNode;
  toolTipContentIfCoreDataNotSelected: string;
  onChange: (selection: Option) => void;
};

const ChooseToMigrateApps: FC<Props & InjectedIntlProps> = ({
  appsCount = 0,
  isLoading,
  isCoreDataSelected,
  descriptionOnSelectAllEnabled,
  descriptionOnSelectAllDisabled,
  toolTipContentIfCoreDataNotSelected,
  onChange,
  selectedValue,
  intl,
}) => {
  const isAppsCountZero = appsCount === 0;
  const isSelectAllDisabled =
    isLoading || isAppsCountZero || !isCoreDataSelected;

  // toolTipContent
  let resolvedToolTipContent: React.ReactNode | null;

  if (isLoading) {
    resolvedToolTipContent = null;
  } else if (isAppsCountZero) {
    resolvedToolTipContent = intl.formatMessage(messages.appSelectionTooltip01);
  } else if (!isCoreDataSelected) {
    resolvedToolTipContent = toolTipContentIfCoreDataNotSelected;
  }

  // message
  let message: string | null = intl.formatMessage(
    messages.appSelectionRadioAllLabel,
  );

  if (!isLoading) {
    message = intl.formatMessage(messages.appSelectionRadioAllLabelSub, {
      appsCount,
    });
  }

  // description
  const description = isSelectAllDisabled
    ? descriptionOnSelectAllDisabled
    : descriptionOnSelectAllEnabled;

  //on change
  const onRadioButtonChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (value === 'all' || value === 'none') {
      onChange(value);
    }
  };

  const options: OptionsPropType = [
    {
      value: OPTION_ALL,
      label: (
        <Tooltip content={resolvedToolTipContent}>
          <RadioLabel
            labelValue={message}
            description={description}
            isLoading={isLoading}
            disabled={isSelectAllDisabled}
          />
        </Tooltip>
      ),
      isDisabled: isSelectAllDisabled,
      testId: 'choose-to-migrate-apps-option-all',
    },
    {
      value: OPTION_NONE,
      testId: 'choose-to-migrate-apps-option-none',
      label: (
        <RadioLabel
          labelValue={intl.formatMessage(messages.appSelectionRadioNoneOption)}
        />
      ),
    },
  ];

  return (
    <>
      <RadioGroup
        value={selectedValue}
        defaultValue={selectedValue}
        options={options}
        onChange={onRadioButtonChange}
        name="migrate-apps"
      />
    </>
  );
};

export default injectIntl(ChooseToMigrateApps);
