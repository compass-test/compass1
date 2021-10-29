import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { TimePicker } from '@atlaskit/datetime-picker';
import { DEFAULT_LOCALE } from '@atlassian/proforma-translations';

import { times } from '../common/dayTimes';
import { FieldDisabledWrapper } from '../common/questionWrappers';

type ViewTimeProps = {
  id: string;
  value?: string;
};

export const ViewTime = injectIntl(
  ({ id, value, intl }: ViewTimeProps & InjectedIntlProps) => {
    return (
      <FieldDisabledWrapper>
        <TimePicker
          id={id}
          value={value}
          locale={intl.locale || DEFAULT_LOCALE}
          timeIsEditable
          placeholder=" "
          isDisabled
          appearance="subtle"
          times={times}
        />
      </FieldDisabledWrapper>
    );
  },
);
