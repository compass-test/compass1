import React, { useContext, useEffect } from 'react';

import CoordinationClient from '@atlassiansox/engagekit/dist/esm/coordination/coordination-client';
import {
  FormattedHTMLMessage,
  InjectedIntlProps,
  injectIntl,
} from 'react-intl';

import SectionMessage, {
  SectionMessageAction,
} from '@atlaskit/section-message';

import {
  triggerChangeboardingBannerStartFailed,
  triggerChangeboardingBannerStopFailed,
  triggerChangeboardLearnMoreClicked,
  useCreateFireAnalyticsFromTrigger,
} from '../../../common/utils/analytics';
import messages from '../../../common/utils/i18n/messages';
import { LinkType } from '../../utils/analytics/types';
import {
  ChangeBoardContext,
  EngageKitContext,
} from '../../utils/changeboard-context';

import { ChangeBoardContainer, LearnMoreLink } from './styled';

export type ChangeBoardBannerProps = InjectedIntlProps;

const isPromise = (
  c: CoordinationClient | Promise<CoordinationClient>,
): c is Promise<CoordinationClient> => {
  return typeof (c as Promise<CoordinationClient>).then === 'function';
};

const getResolvedCoordinationClient = (
  coordinationClient: CoordinationClient | Promise<CoordinationClient>,
) => {
  if (isPromise(coordinationClient)) {
    return coordinationClient;
  }
  return Promise.resolve(coordinationClient);
};

export const useCoordination = (
  coordinationClient: CoordinationClient | Promise<CoordinationClient>,
  messageId: string,
) => {
  const {
    messageMounted,
    messageVisible,
    setMessageMounted,
    setMessageVisible,
    startCalledRef,
  } = useContext(ChangeBoardContext);
  const fireStartFailed = useCreateFireAnalyticsFromTrigger(
    triggerChangeboardingBannerStartFailed,
  );
  const fireStopFailed = useCreateFireAnalyticsFromTrigger(
    triggerChangeboardingBannerStopFailed,
  );
  useEffect(() => {
    (async () => {
      try {
        if (!startCalledRef.current) {
          startCalledRef.current = true;
          const resolvedCoordinationClient = await getResolvedCoordinationClient(
            coordinationClient,
          );
          const messageStarted = await resolvedCoordinationClient.start(
            messageId,
          );
          if (messageStarted) {
            setTimeout(() => {
              setMessageVisible(true);
            }, 500);
          } else {
            setMessageMounted(false);
          }
        }
      } catch (err) {
        setMessageMounted(false);
        fireStartFailed(err.name);
      }
    })();
  }, [
    coordinationClient,
    fireStartFailed,
    messageId,
    messageVisible,
    setMessageMounted,
    setMessageVisible,
    startCalledRef,
  ]);
  const stop = async () => {
    if (!messageMounted) {
      return;
    }
    setMessageVisible(false);
    try {
      const resolvedCoordinationClient = await getResolvedCoordinationClient(
        coordinationClient,
      );
      await resolvedCoordinationClient.stop(messageId);
    } catch (err) {
      fireStopFailed(err.name);
    }
  };

  const unmountComponent = () => {
    if (!messageVisible) {
      setMessageMounted(false);
    }
  };

  return { messageVisible, messageMounted, unmountComponent, stop };
};

type ChangeBoardBannerMessageProps = InjectedIntlProps & {
  client: CoordinationClient | Promise<CoordinationClient>;
  messageId: string;
};

const ChangeBoardBannerMessage = ({
  client,
  messageId,
  intl,
}: ChangeBoardBannerMessageProps) => {
  const {
    messageVisible,
    messageMounted,
    unmountComponent,
    stop: stopMsg,
  } = useCoordination(client, messageId);
  const fireLearnMoreClick = useCreateFireAnalyticsFromTrigger(
    triggerChangeboardLearnMoreClicked,
  );

  const handleLearnMoreClick = () => {
    fireLearnMoreClick(LinkType.CHANGEBOARD_LEARN_MORE);
  };

  if (!messageMounted) {
    return null;
  }

  return (
    <ChangeBoardContainer
      hide={!messageVisible}
      onTransitionEnd={unmountComponent}
      data-testid="notifications__changeboarding"
    >
      <SectionMessage
        appearance="discovery"
        title={intl.formatMessage(messages.changeBoardingTitle)}
        actions={[
          <SectionMessageAction onClick={stopMsg}>
            {intl.formatMessage(messages.changeBoardingAcknowledge)}
          </SectionMessageAction>,
          <SectionMessageAction>
            <LearnMoreLink
              href="https://community.atlassian.com/t5/Feedback-Forum-articles/Improving-the-way-you-manage-notifications/ba-p/1720859"
              onClick={handleLearnMoreClick}
              target="_top"
            >
              {intl.formatMessage(messages.changeBoardingLearnMore)}
            </LearnMoreLink>
          </SectionMessageAction>,
        ]}
      >
        <p>
          <FormattedHTMLMessage {...messages.changeBoardingBodyText} />
        </p>
      </SectionMessage>
    </ChangeBoardContainer>
  );
};

const ChangeBoardBanner = ({ intl }: ChangeBoardBannerProps) => {
  const { coordinationClient, changeBoardMessageId } = useContext(
    EngageKitContext,
  );
  if (!coordinationClient || !changeBoardMessageId) {
    return null;
  }
  return (
    <ChangeBoardBannerMessage
      client={coordinationClient}
      messageId={changeBoardMessageId}
      intl={intl}
    />
  );
};

export default injectIntl(ChangeBoardBanner);
