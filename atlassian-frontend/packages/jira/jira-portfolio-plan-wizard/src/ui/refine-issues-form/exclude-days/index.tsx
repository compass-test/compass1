import React, { useState } from 'react';

import compose from 'lodash/fp/compose';
import { FormattedMessage } from 'react-intl';

import { ErrorMessage, HelperMessage } from '@atlaskit/form';

import { useIntl } from '../../../common/utils/intl';

import msgs from './messages';
import { NumberTextField } from './styled';
import { Props } from './types';

const LEARN_MORE_URL = {
  cloud:
    'https://confluence.atlassian.com/display/advancedroadmapscloud/issues#Issues-completedissues',
  server:
    'https://confluence.atlassian.com/display/JIRAPortfolioServer/Troubleshooting+missing+issues',
};

// Ported from src/packages/portfolio-3/portfolio/src/common/view/constant.js
export const INCLUDE_COMPLETED_ISSUE_FOR_DAYS_MAX_LIMIT = 3000;

export const clampMax = (event: React.ChangeEvent<HTMLInputElement>) => {
  const parsedValue = Number(event.target.value);

  if (!event.target.value || Number.isNaN(parsedValue)) {
    return event;
  }

  event.target.value = String(
    Math.min(parsedValue, INCLUDE_COMPLETED_ISSUE_FOR_DAYS_MAX_LIMIT),
  );

  return event;
};

const ExcludeDaysField = ({ fieldProps, error, valid }: Props) => {
  const { formatMessage } = useIntl();
  const [focus, setFocus] = useState(false);
  const unit = formatMessage(msgs.after, { value: fieldProps.value });

  const inputElement = (
    <NumberTextField
      elemAfterInput={
        focus ? (
          <div style={{ paddingRight: '6px', lineHeight: '100%' }}>{unit}</div>
        ) : null
      }
      {...fieldProps}
      onBlur={compose(fieldProps.onBlur, () => setFocus(false))}
      onFocus={compose(fieldProps.onFocus, () => setFocus(true))}
      onChange={compose(fieldProps.onChange, clampMax)}
      isInvalid={!valid}
      autoComplete="off"
      testId="exclude-days"
      type={focus ? 'number' : 'text'}
      value={focus ? fieldProps.value : `${fieldProps.value} ${unit}`}
      max={INCLUDE_COMPLETED_ISSUE_FOR_DAYS_MAX_LIMIT}
    />
  );

  const subscript = msgs.subscriptStatusCategoryChangeDate;
  return (
    <>
      {inputElement}
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <HelperMessage>
          <FormattedMessage
            {...subscript}
            values={{
              value: fieldProps.value,
              LearnMoreLink: (
                <a href={LEARN_MORE_URL.cloud} target="_blank">
                  {formatMessage(msgs.learnMore)}
                </a>
              ),
            }}
          />
        </HelperMessage>
      )}
    </>
  );
};

export default ExcludeDaysField;
