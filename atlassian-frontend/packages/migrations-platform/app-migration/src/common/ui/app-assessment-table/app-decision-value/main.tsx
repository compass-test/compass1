import React, { FC, useCallback, useState } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import { useCreateUIEvent } from '@atlassian/mpt-analytics';
import { AnalyticsButton } from '@atlassian/mpt-elements';

import type { MigrationStatus } from '../../../types';

import messages from './messages';
import { ButtonWrapper, Wrapper } from './styled';

export type Props = {
  appKey: string;
  defaultMigrationStatus?: MigrationStatus;
  onChange: (appKey: string, status: MigrationStatus) => Promise<void>;
};

type Option = {
  value: MigrationStatus;
  label: FormattedMessage.MessageDescriptor;
};

const OPTIONS: Option[] = [
  {
    value: 'Needed',
    label: messages.needed,
  },
  {
    value: 'NotNeeded',
    label: messages.notNeeded,
  },
  {
    value: 'Alternative',
    label: messages.alternative,
  },
  {
    value: 'Unassigned',
    label: messages.unassigned,
  },
];

const AppDecisionValue: FC<InjectedIntlProps & Props> = ({
  intl,
  appKey,
  defaultMigrationStatus = 'Unassigned',
  onChange,
}) => {
  const [status, setStatus] = useState(defaultMigrationStatus);
  const [isSaving, setIsSaving] = useState(false);
  const createUIEvent = useCreateUIEvent();

  // OnClick handler
  const saveNewStatus = useCallback(
    async (newStatus: MigrationStatus) => {
      // Toggle loading
      setIsSaving(true);

      // Save
      await onChange(appKey, newStatus);

      // Send event
      createUIEvent({
        subject: 'Dropdown',
        action: 'Selected',
        id: 'appMigrationStatusDropdown',
        attributes: { appKey, value: newStatus },
      });

      // Set status locally
      setStatus(newStatus);

      // Toggle loading
      setIsSaving(false);
    },
    [appKey, createUIEvent, onChange],
  );

  // Current label for the selected status
  const selectedStatusLabel =
    OPTIONS.find(({ value }) => status === value)?.label || messages.unassigned;

  return (
    <Wrapper>
      <DropdownMenu
        shouldFitContainer
        testId="appAssessmentStatusField"
        trigger={
          <ButtonWrapper>
            <AnalyticsButton
              appearance="subtle"
              spacing="compact"
              shouldFitContainer
              isLoading={isSaving}
              isSelected={status !== 'Unassigned'}
              iconAfter={
                <ChevronDownIcon
                  label={intl.formatMessage(messages.unassigned)}
                />
              }
            >
              <FormattedMessage {...selectedStatusLabel} />
            </AnalyticsButton>
          </ButtonWrapper>
        }
      >
        <DropdownItemGroup>
          {OPTIONS.map(({ value, label }) => {
            return (
              <DropdownItem
                key={value}
                onClick={() => {
                  if (status !== value) {
                    saveNewStatus(value);
                  }
                }}
              >
                <FormattedMessage {...label} />
              </DropdownItem>
            );
          })}
        </DropdownItemGroup>
      </DropdownMenu>
    </Wrapper>
  );
};

export default injectIntl(AppDecisionValue);
