import React from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import WarningIcon from '@atlaskit/icon/glyph/warning';

import { withIntlProvider } from '../../intl-provider';

import WrappingBanner from './atlaskit/WrappingBanner';
import {
  IntlValidationFailedMessages,
  ValidationFailedMessage,
} from './ValidationFailedMessages.intl';

interface ValidationFailedMsgProps {
  invalid?: boolean;
}

export const ValidationFailedMsg = withIntlProvider<ValidationFailedMsgProps>(
  observer(({ invalid }) => {
    return (
      <WrappingBanner
        icon={<WarningIcon label="Warning icon" secondaryColor="inherit" />}
        isOpen={invalid}
        appearance="error"
      >
        <FormattedMessage
          {...IntlValidationFailedMessages[
            ValidationFailedMessage.ValidationBannerMsg
          ]}
        />
      </WrappingBanner>
    );
  }),
);
