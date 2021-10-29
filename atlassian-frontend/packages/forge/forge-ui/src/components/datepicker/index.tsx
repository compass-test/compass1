/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Fragment, lazy, useState, useEffect } from 'react';
import { gridSize } from '@atlaskit/theme/constants';
import { DatePickerProps, FieldChildrenProps } from '@atlassian/forge-ui-types';
import { Props } from '..';

const AKDatePicker = React.lazy(() =>
  import('@atlaskit/datetime-picker').then((module) => ({
    default: module.DatePicker,
  })),
);
const AKField = React.lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.Field })),
);
const AKHelperMessage = lazy(() =>
  import('@atlaskit/form').then((module) => ({
    default: module.HelperMessage,
  })),
);
const AKErrorMessage = React.lazy(() =>
  import('@atlaskit/form').then((module) => ({ default: module.ErrorMessage })),
);

const validate = (value: any) => (!value ? 'EMPTY' : undefined);

export const getDateFormat = (locale: string) => {
  const formatObj = new Intl.DateTimeFormat(locale).formatToParts(
    new Date(),
  ) as Intl.DateTimeFormatPart[];

  return formatObj
    .map((obj) => {
      switch (obj.type) {
        case 'day':
          return 'DD';
        case 'month':
          return 'MM';
        case 'year':
          return 'YYYY';
        default:
          return obj.value;
      }
    })
    .join('');
};

const DatePicker: React.FunctionComponent<DatePickerProps> = ({
  name,
  label,
  description,
  placeholder,
  defaultValue,
  isRequired,
}: DatePickerProps) => {
  const [locale, setLocale] = useState('en-US');

  useEffect(() => {
    if (
      window.navigator.languages &&
      locale !== window.navigator.languages[0]
    ) {
      setLocale(window.navigator.languages[0]);
    }
  }, [locale]);
  return (
    <div
      css={css`
        max-width: 100%;
        width: ${gridSize() * 40}px;
      `}
    >
      <AKField
        name={name}
        label={label}
        defaultValue={defaultValue}
        isRequired={isRequired}
        validate={isRequired ? validate : undefined}
      >
        {({ fieldProps, error }: FieldChildrenProps & { error?: string }) => (
          <Fragment>
            <AKDatePicker
              {...fieldProps}
              value={fieldProps.value || ''}
              placeholder={placeholder}
              dateFormat={getDateFormat(locale)}
              isInvalid={fieldProps.isInvalid || Boolean(error)}
            />
            {error === 'EMPTY' && (
              <AKErrorMessage>This field is required.</AKErrorMessage>
            )}
            {description && <AKHelperMessage>{description}</AKHelperMessage>}
          </Fragment>
        )}
      </AKField>
    </div>
  );
};

export default DatePicker;

export const DatePickerFn: React.FunctionComponent<Props> = ({ props }) => {
  const {
    name,
    label,
    defaultValue,
    description,
    placeholder,
  } = props as DatePickerProps;
  return (
    <DatePicker
      name={name}
      label={label}
      defaultValue={defaultValue}
      description={description}
      placeholder={placeholder}
    />
  );
};
