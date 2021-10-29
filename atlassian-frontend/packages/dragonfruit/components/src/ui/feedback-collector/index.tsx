import React, { useEffect } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Link } from 'react-resource-router';

import FeedbackCollector from '@atlaskit/feedback-collector';
import { useFlags } from '@atlaskit/flag';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import { G300 } from '@atlaskit/theme/colors';
import { useGetAccountInfo } from '@atlassian/dragonfruit-tenant-context';

import messages from './messages';

const EMBEDDABLE_KEY = '9af6da6b-398a-45f3-8bef-7fabec9adee5';
const REQUEST_TYPE_ID = '345';
const FEEDBACK_CONTEXT_CF = 'customfield_10047';

const linkToCommunityGroup =
  'https://community.atlassian.com/t5/Compass-Alpha/gh-p/compass-alpha#';
const linkToPrivacyPolicy = 'https://atlassian.com/legal/privacy-policy';
const linkToResearchEnroll = 'https://atlassian.com/research-group';

type CustomProps = {
  onClose: () => void;
};

type FeedbackCollectorModalProps = InjectedIntlProps & CustomProps;

function DisplayFeedback(props: FeedbackCollectorModalProps) {
  const { intl, onClose } = props;

  const { showFlag } = useFlags();

  const accountInfo = useGetAccountInfo();

  const feedbackContext = `URL: ${window.location.href}\nUser agent: ${window.navigator.userAgent}`;

  const FeedbackPreamble = () => {
    return (
      <>
        <p>{intl.formatMessage(messages.feedbackPreamble1)}</p>
        <p>
          <Link href={linkToCommunityGroup} target="_blank">
            {intl.formatMessage(messages.feedbackPreambleLink)}
          </Link>{' '}
          {intl.formatMessage(messages.feedbackPreamble2)}
        </p>
      </>
    );
  };

  const CanContactLabel = () => {
    return (
      <p>
        {intl.formatMessage(messages.canContactLabel)}{' '}
        <Link href={linkToPrivacyPolicy} target="_blank">
          {intl.formatMessage(messages.canContactLink)}
        </Link>
      </p>
    );
  };

  const EnrolLabel = () => {
    return (
      <p>
        {intl.formatMessage(messages.enrollLabel)}{' '}
        <Link href={linkToResearchEnroll} target="_blank">
          {intl.formatMessage(messages.enrollLink)}{' '}
        </Link>
      </p>
    );
  };

  let dismissFunction: () => void;

  const showSuccessFlag = () => {
    dismissFunction = showFlag({
      id: 'feedbackSent',
      isAutoDismiss: true,
      icon: <SuccessIcon primaryColor={G300} label="Success" />,
      title: intl.formatMessage(messages.feedbackFlagTitle),
      description: intl.formatMessage(messages.feedbackFlagDescription),
      testId: 'dragonfruit-navigation.feedback-dialog.success-flag',
      actions: [
        {
          content: intl.formatMessage(messages.feedbackFlagExploreCommunity),
          href:
            'https://community.atlassian.com/t5/Compass-Alpha/cmp-p/grouphub:compass-alpha',
        },
        {
          content: intl.formatMessage(messages.feedbackFlagNoThanks),
          onClick: () => dismissFunction(),
        },
      ],
    });
  };

  // Temporary hack to pre-check the Can Be Contacted field.
  const checkBoxInput: HTMLInputElement | null = document.querySelector(
    "input[name='can-be-contacted']",
  );
  useEffect(() => {
    checkBoxInput?.click();
  }, [checkBoxInput]);

  return (
    <FeedbackCollector
      onClose={onClose}
      onSubmit={showSuccessFlag}
      name={accountInfo.data?.name}
      email={accountInfo.data?.email}
      requestTypeId={REQUEST_TYPE_ID}
      embeddableKey={EMBEDDABLE_KEY}
      feedbackTitle={intl.formatMessage(messages.feedbackTitle)}
      showTypeField={false}
      feedbackTitleDetails={<FeedbackPreamble />}
      canBeContactedLabel={<CanContactLabel />}
      enrolInResearchLabel={<EnrolLabel />}
      summaryPlaceholder={intl.formatMessage(messages.summaryPlaceholder)}
      additionalFields={[
        {
          id: FEEDBACK_CONTEXT_CF,
          value: feedbackContext,
        },
      ]}
    />
  );
}

export default injectIntl(DisplayFeedback);
