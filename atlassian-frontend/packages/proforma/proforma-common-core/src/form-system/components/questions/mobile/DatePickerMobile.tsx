import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import {
  EditDateMessages,
  IntlEditDateMessages,
} from '../edit/EditDateMessages.intl';

interface DatePickerMobileProps {
  id?: string;
  dateValue?: string;
  onChange?: (value: string) => void;
}

export const DatePickerMobile = injectIntl(
  ({
    id,
    dateValue,
    onChange,
    intl,
  }: DatePickerMobileProps & InjectedIntlProps) => {
    return (
      <DatePickerMobileStyles>
        <input
          id={id}
          type="date"
          value={dateValue}
          onChange={
            onChange ? event => onChange(event.target.value) : undefined
          }
          placeholder={intl.formatMessage(
            IntlEditDateMessages[EditDateMessages.DatePlaceholder],
            { date: intl.formatDate(new Date(), {}) },
          )}
        />
      </DatePickerMobileStyles>
    );
  },
);

const DatePickerMobileStyles = styled.div`
  & > input {
    white-space: initial;
    display: flex;
    background-color: #f4f5f7;
    border-color: #f4f5f7;
    border-radius: 3px;
    margin-bottom: 10px;
    box-shadow: none;
    border-style: solid;
    border-width: 2px;
    padding-top: 10px;
    padding-bottom: 9px;
    padding-left: 6px;
    box-sizing: border-box;
    width: 100%;

    &:hover {
      background-color: #ebecf0;
    }
  }
`;
