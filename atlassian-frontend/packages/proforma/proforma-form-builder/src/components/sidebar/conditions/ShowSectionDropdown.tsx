import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Select from '@atlaskit/select';

import {
  IntlSectionSidebarMessages,
  SectionSidebarMessages,
} from '../SectionSidebarMessages.intl';
import { SideBarSelectStyles } from '../styles';

interface ShowSectionDropdownProps {
  value: ShowSectionValues;
  onChange: (newValue: string) => void;
}

export enum ShowSectionValues {
  Always = 'always',
  Conditionally = 'conditionally',
}

export const ShowSectionDropdown = injectIntl(
  ({ value, onChange, intl }: ShowSectionDropdownProps & InjectedIntlProps) => {
    const showSectionOptions = {
      [ShowSectionValues.Always]: {
        label: intl.formatMessage(
          IntlSectionSidebarMessages[SectionSidebarMessages.ShowSectionAlways],
        ),
        value: ShowSectionValues.Always,
      },
      [ShowSectionValues.Conditionally]: {
        label: intl.formatMessage(
          IntlSectionSidebarMessages[
            SectionSidebarMessages.ShowSectionConditionally
          ],
        ),
        value: ShowSectionValues.Conditionally,
      },
    };

    const selectOptions = [
      showSectionOptions[ShowSectionValues.Always],
      showSectionOptions[ShowSectionValues.Conditionally],
    ];

    return (
      <Select
        options={selectOptions}
        value={showSectionOptions[value]}
        onChange={(option): void => {
          if (option === showSectionOptions[ShowSectionValues.Always]) {
            onChange(ShowSectionValues.Always);
          } else if (
            option === showSectionOptions[ShowSectionValues.Conditionally]
          ) {
            onChange(ShowSectionValues.Conditionally);
          }
        }}
        styles={SideBarSelectStyles}
      />
    );
  },
);
