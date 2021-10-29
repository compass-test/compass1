import React, { FC, memo, MouseEvent } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import type { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import Icon from '@atlaskit/icon/glyph/arrow-left';
import { AnalyticsButton } from '@atlassian/mpt-elements';

import { messages } from './messages';

type Props = {
  onClick: (
    e: MouseEvent<HTMLElement>,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
};

const HomeButton: FC<Props & InjectedIntlProps> = ({ onClick, intl }) => {
  return (
    <AnalyticsButton
      analyticsId="homeButton"
      appearance="subtle"
      iconBefore={
        <Icon label={intl.formatMessage(messages.migrationHomeButtonLabel)} />
      }
      onClick={onClick}
    >
      <FormattedMessage {...messages.migrationHomeButtonText} />
    </AnalyticsButton>
  );
};

export default memo(injectIntl(HomeButton));
