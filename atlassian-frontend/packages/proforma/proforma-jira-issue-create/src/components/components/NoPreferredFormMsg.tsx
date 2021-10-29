import React from 'react';

import { FormattedMessage } from 'react-intl';

import {
  IntlNoPreferredFormMessages,
  NoPreferredFormMessage,
} from './NoPreferredFormMessages.intl';

export const NoPreferredFormMsg: React.FunctionComponent = () => {
  return (
    <div data-testid="issue-create-no-preferred-form-msg">
      <p>
        <FormattedMessage
          {...IntlNoPreferredFormMessages[NoPreferredFormMessage.Description]}
          values={{
            EditSettingsMsg: (
              <strong className="proforma-ui__section-paragraph-strong">
                <FormattedMessage
                  {...IntlNoPreferredFormMessages[
                    NoPreferredFormMessage.EditSettingsMsg
                  ]}
                />
              </strong>
            ),
            IssueFormsMsg: (
              <strong className="proforma-ui__section-paragraph-strong">
                <FormattedMessage
                  {...IntlNoPreferredFormMessages[
                    NoPreferredFormMessage.IssueFormsMsg
                  ]}
                />
              </strong>
            ),
          }}
        />
      </p>
    </div>
  );
};
