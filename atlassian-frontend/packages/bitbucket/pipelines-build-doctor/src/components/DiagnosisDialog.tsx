import React, { useCallback, useState } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import BulbIcon from '@atlaskit/icon/glyph/lightbulb-filled';
import { Diagnosis } from '@atlassian/pipelines-models';

import { DOCS_TROUBLESHOOTING_URL, DOCS_YML_URL } from '../const';

import {
  ContentWrapper,
  FeedbackButtons,
  FeedbackFooter,
  FeedbackText,
  Icon,
  LinksWrapper,
} from './styled';

type Props = {
  diagnosis?: Diagnosis;
};

const DiagnosisDialog: React.FC<Props> = ({ diagnosis }) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const [isFeedbackSent, setIsFeedbackSent] = useState(false);

  const sendFeedback = useCallback(
    (helpful: boolean) => {
      setIsFeedbackSent(true);

      // https://data-portal.internal.atlassian.com/analytics/registry/15603
      createAnalyticsEvent({
        action: 'sent',
        actionSubject: 'feedback',
        source: 'buildDoctorInlineDialog',
        attributes: { diagnosis: diagnosis?.key, helpful },
      }).fire();
    },
    [diagnosis, setIsFeedbackSent, createAnalyticsEvent],
  );

  return (
    <div>
      <Icon>
        <BulbIcon label="error" />
      </Icon>
      <ContentWrapper>
        <p>{'Based on your build errors, this might help:'}</p>
        <LinksWrapper>
          {diagnosis?.links?.map((link, index) => (
            <li key={index}>
              <Button
                href={link.url}
                spacing="none"
                appearance="link"
                target="_blank"
                onClick={(e, analyticEvent) => {
                  analyticEvent
                    .update({
                      actionSubjectId: 'buildDoctorDocumentationLink',
                      source: 'buildDoctorInlineDialog',
                      attributes: { key: diagnosis?.key },
                    })
                    .fire();
                }}
              >
                {link.name}
              </Button>
            </li>
          ))}
          <li>
            <Button
              href={DOCS_TROUBLESHOOTING_URL}
              spacing="none"
              appearance="link"
              target="_blank"
              onClick={(e, analyticEvent) => {
                analyticEvent
                  .update({
                    actionSubjectId: 'buildDoctorDocumentationLink',
                    source: 'buildDoctorInlineDialog',
                    attributes: { key: 'troubleshooting' },
                  })
                  .fire();
              }}
            >
              Troubleshooting
            </Button>
          </li>
          <li>
            <Button
              href={DOCS_YML_URL}
              spacing="none"
              appearance="link"
              target="_blank"
              onClick={(e, analyticEvent) => {
                analyticEvent
                  .update({
                    actionSubjectId: 'buildDoctorDocumentationLink',
                    source: 'buildDoctorInlineDialog',
                    attributes: { key: 'yml' },
                  })
                  .fire();
              }}
            >
              Configuring bitbucket-pipelines.yml
            </Button>
          </li>
        </LinksWrapper>
        <FeedbackFooter>
          <FeedbackText isFeedbackSent={isFeedbackSent}>
            Thank you for your feedback!
          </FeedbackText>
          <FeedbackButtons isFeedbackSent={isFeedbackSent}>
            Was this helpful?
            <Button
              appearance="subtle-link"
              spacing="none"
              onClick={() => sendFeedback(true)}
            >
              Yes
            </Button>
            <Button
              appearance="subtle-link"
              spacing="none"
              onClick={() => sendFeedback(false)}
            >
              No
            </Button>
          </FeedbackButtons>
        </FeedbackFooter>
      </ContentWrapper>
    </div>
  );
};

export default React.memo(DiagnosisDialog);
