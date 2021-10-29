import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { TimePicker } from '@atlaskit/datetime-picker';
import { DEFAULT_LOCALE } from '@atlassian/proforma-translations';

import { isMobile } from '../../../../jira-common/utils/native/detectDeviceType';
import { times } from '../common/dayTimes';
import { TimePickerMobile } from '../mobile/TimePickerMobile';

import {
  EditTimeMessages,
  IntlEditTimeMessages,
} from './EditTimeMessages.intl';

type EditTimeProps = {
  id: string;
  value?: string;
  isInvalid: boolean;
  onChange?: (value: string) => void;
};

export const EditTime = injectIntl(
  ({
    id,
    value,
    isInvalid,
    onChange,
    intl,
  }: EditTimeProps & InjectedIntlProps) => {
    return isMobile() ? (
      <TimePickerMobile timeValue={value} onChange={onChange} />
    ) : (
      <TimePicker
        id={id}
        times={times}
        value={value}
        isInvalid={isInvalid}
        onChange={onChange}
        locale={intl.locale || DEFAULT_LOCALE}
        timeIsEditable
        placeholder={intl.formatMessage(
          IntlEditTimeMessages[EditTimeMessages.TimePlaceholder],
          { time: intl.formatTime(new Date(), {}) },
        )}
      />
    );
  },
);
