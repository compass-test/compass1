import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { DatePicker } from '@atlaskit/datetime-picker';
import { DEFAULT_LOCALE } from '@atlassian/proforma-translations';

import { FieldDisabledWrapper } from '../common/questionWrappers';

type ViewDateProps = {
  id: string;
  value?: string;
};

export const ViewDate = injectIntl(
  ({ id, value, intl }: ViewDateProps & InjectedIntlProps) => {
    return (
      <FieldDisabledWrapper>
        <DatePicker
          id={id}
          value={value}
          locale={intl.locale || DEFAULT_LOCALE}
          placeholder=" "
          isDisabled
          appearance="subtle"
        />
      </FieldDisabledWrapper>
    );
  },
);
