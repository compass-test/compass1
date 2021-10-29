import React from 'react';

import moment from 'moment';
import { FormattedHTMLMessage } from 'react-intl';

import SectionMessage from '@atlaskit/section-message';
import Tooltip from '@atlaskit/tooltip';
import { CONFIG_AS_CODE_DAC_LINK } from '@atlassian/dragonfruit-external-component-management/constants';
import {
  ComponentSyncEvent,
  ComponentSyncEventStatus,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { STATUSPAGE_LINK } from '../../../../../common/constants';

import messages from './messages';
import { ErrorBody, ListItem, TimeStringContainer } from './styled';

interface Props {
  syncEvent: ComponentSyncEvent;
}

export function SyncInformation({ syncEvent }: Props) {
  const { formatMessage } = useIntl();
  const { status, time, lastSyncErrors } = syncEvent;

  if (status === ComponentSyncEventStatus.SUCCESS) {
    // Standardize timestamp to valid html timestring granularity
    const formattedTimeString = new Date(time).toISOString();
    return (
      <Tooltip content={formattedTimeString} position="right">
        <TimeStringContainer dateTime={formattedTimeString}>
          {moment(formattedTimeString).fromNow()}
        </TimeStringContainer>
      </Tooltip>
    );
  }

  const errBody =
    status === ComponentSyncEventStatus.USER_ERROR ? (
      <p>
        {formatMessage(messages.userErrorCardNotice)}
        {':'}
        <ul>
          {lastSyncErrors?.map((err) => (
            <ListItem>{err}</ListItem>
          ))}
        </ul>
        <a href={CONFIG_AS_CODE_DAC_LINK} target="_blank" rel="noopener">
          {formatMessage(messages.learnMoreErrorNotice)}
        </a>
      </p>
    ) : (
      <p>
        <FormattedHTMLMessage
          {...messages.serverErrorCardNotice}
          values={{
            statusPageLink: STATUSPAGE_LINK,
          }}
        />
      </p>
    );

  return (
    <SectionMessage
      appearance="error"
      title={formatMessage(messages.errorCardNotice)}
      testId="dragonfruit-page-component-details.managed-settings.sync-error-message"
    >
      <ErrorBody>{errBody}</ErrorBody>
    </SectionMessage>
  );
}
