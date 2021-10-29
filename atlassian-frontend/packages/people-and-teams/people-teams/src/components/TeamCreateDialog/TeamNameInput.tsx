import React, { useCallback } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import { Field } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';

import { messages } from '../i18n';

import * as Styled from './styled';

interface Props {
  onSubmit: () => void;
  onChange: (teamName: string) => void;
}

function TeamNameInput(
  props: Props & InjectedIntlProps & WithAnalyticsEventsProps,
) {
  const { intl, onSubmit, onChange } = props;

  const handleTextChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      onChange(event.currentTarget.value);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Enter') {
        event.stopPropagation();
        onSubmit();
      }
    },
    [onSubmit],
  );

  return (
    <Styled.TeamNameWrapper>
      <Field
        name="teamName"
        label={<FormattedMessage {...messages.teamNameFieldLabel} />}
        isRequired
      >
        {({ fieldProps }) => (
          <Textfield
            {...fieldProps}
            autoFocus
            isRequired
            isDisabled={false}
            name="teamName"
            maxLength={60}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder={intl.formatMessage(messages.teamNameFieldPlaceholder)}
            testId="team-name-input"
            aria-labelledby=""
          />
        )}
      </Field>
    </Styled.TeamNameWrapper>
  );
}

export default withAnalyticsEvents()(injectIntl(TeamNameInput));
