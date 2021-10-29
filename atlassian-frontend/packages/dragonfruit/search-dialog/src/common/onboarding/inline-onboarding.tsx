import React from 'react';
import { N200 } from '@atlaskit/theme/colors';
import SectionMessage, {
  SectionMessageAction,
} from '@atlaskit/section-message';
import SearchIcon from '@atlaskit/icon/glyph/search';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { messages } from '../../messages';

interface InlineOnboardingProps {
  onClose: () => void;
}

const InlineOnboarding = ({
  intl,
  onClose,
}: InjectedIntlProps & InlineOnboardingProps) => {
  return (
    <SectionMessage
      appearance="discovery"
      title={intl.formatMessage(messages.common_inline_onboarding_title)}
      actions={[
        {
          key: 'got-it',
          onClick: onClose,
          text: intl.formatMessage(messages.common_inline_onboarding_action),
        },
      ].map(({ text, ...restAction }) => (
        <SectionMessageAction {...restAction}>{text}</SectionMessageAction>
      ))}
      icon={SearchIcon}
    >
      <p style={{ color: N200 }}>
        {intl.formatMessage(messages.common_inline_onboarding_body)}
      </p>
    </SectionMessage>
  );
};

export default injectIntl(InlineOnboarding);
