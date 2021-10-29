import React, { useState } from 'react';

import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl';

import ErrorIcon from '@atlaskit/icon/glyph/error';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';

import { FallbackComponent } from '../../../../common/types/error-boundary';

import messages from './messages';
import { Wrapper } from './styled';

export const DetailedErrorFallback: FallbackComponent<any> = injectIntl(
  ({ error, intl }: { error: Error; intl: InjectedIntl }) => {
    const { formatMessage } = intl;

    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => setShowDetails(!showDetails);

    const reloadPage = () => window.location.reload();
    const clickHereLink = (
      <a href={''} onClick={reloadPage}>
        {formatMessage(messages.clickHere)}
      </a>
    );
    return (
      <Wrapper>
        <p style={{ verticalAlign: 'middle' }}>
          <ErrorIcon label={formatMessage(CommonMessages.error)} />
          <FormattedMessage
            {...messages.unexpectedError}
            values={{
              clickHereLink,
            }}
          />
        </p>
        <br />
        <button onClick={toggleDetails}>
          {showDetails
            ? formatMessage(messages.hideDetails)
            : formatMessage(messages.showDetails)}
        </button>
        {showDetails && (
          <div>
            <p>{formatMessage(messages.seeBrowserConsole)}</p>
            <code>{error.message}</code>
          </div>
        )}
      </Wrapper>
    );
  },
);
