import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { DatePicker } from '@atlaskit/datetime-picker';
import { DEFAULT_LOCALE } from '@atlassian/proforma-translations';

import { isMobile } from '../../../../jira-common/utils/native/detectDeviceType';
import { DatePickerMobile } from '../mobile/DatePickerMobile';

import {
  EditDateMessages,
  IntlEditDateMessages,
} from './EditDateMessages.intl';

type EditDateProps = {
  id: string;
  value?: string;
  isInvalid: boolean;
  onChange?: (value: string) => void;
};

export const EditDate = injectIntl(
  ({
    id,
    value,
    isInvalid,
    onChange,
    intl,
  }: EditDateProps & InjectedIntlProps) => {
    return isMobile() ? (
      <DatePickerMobile dateValue={value} onChange={onChange} />
    ) : (
      <DatePicker
        id={id}
        value={value}
        isInvalid={isInvalid}
        onChange={onChange}
        locale={intl.locale || DEFAULT_LOCALE}
        placeholder={intl.formatMessage(
          IntlEditDateMessages[EditDateMessages.DatePlaceholder],
          { date: intl.formatDate(new Date(), {}) },
        )}
      />
    );
  },
);
