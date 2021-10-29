import React, { useMemo } from 'react';

import SectionMessage, {
  SectionMessageAction,
} from '@atlaskit/section-message';
import { getLinkTo } from '@atlassian/commerce-links';
import { withBreadcrumb } from '@atlassian/commerce-telemetry/dispatch-hooks';

import { CC_ERROR_BOUNDARY } from '../../../common/constants/breadcrumb-names';
import {
  I18nHack,
  isJapaneseLanguage,
  usePreferredLanguage,
} from '../../../common/utils/i18n-hack';
import { useCreditCardRetry } from '../../../controllers/hooks/use-credit-card-retry';

const ErrorCreditCardWithoutBreadcrumb = () => {
  const retry = useCreditCardRetry();
  const language = usePreferredLanguage();
  const isJapanese = useMemo(
    () => language !== undefined && isJapaneseLanguage(language),
    [language],
  );

  const title = isJapanese
    ? 'クレジットカードの支払いフォームをロードできません'
    : 'Problem connecting';
  const retryText = isJapanese ? 'リロード' : 'Try again';
  const contactSupportText = isJapanese ? 'お問い合わせ' : 'Contact support';
  return (
    // div is required to unbound SectionMessage from 100% height style from the parent
    <div>
      <SectionMessage
        appearance="error"
        title={title}
        actions={[
          {
            key: 'retry',
            onClick: retry,
            text: retryText,
          },
          {
            key: 'support',
            href: getLinkTo('support', 'en'),
            text: contactSupportText,
          },
        ].map(({ text, ...restAction }) => (
          <SectionMessageAction {...restAction}>{text}</SectionMessageAction>
        ))}
      >
        <I18nHack
          en="We're sorry, we can't load the credit card form right now."
          ja="支払いの処理に問題が発生しました。支払い情報を確認してもう一度お試しください。"
        />
      </SectionMessage>
    </div>
  );
};

export const ErrorCreditCard = withBreadcrumb(
  ErrorCreditCardWithoutBreadcrumb,
  CC_ERROR_BOUNDARY,
);
