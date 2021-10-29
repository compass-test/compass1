import React from 'react';

import moment from 'moment';

import Tooltip from '@atlaskit/tooltip';
import { Card, CardBody } from '@atlassian/dragonfruit-common-ui';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { TeamCheckin } from '../types';

import { ActionsDropdown } from './actions-dropdown';
import { CheckinTimestamp } from './checkin-timestamp';
import messages from './messages';
import { MoodInfo } from './mood-info';
import {
  ActionsWrapper,
  Body,
  BodyWrapper,
  CardWrapper,
  HeadingLeft,
  HeadingRight,
  HeadingWrapper,
  Label,
  Response,
  ResponseListWrapper,
  ResponseWrapper,
  Title,
} from './styled';

interface Props {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
  onEdit: (teamCheckinId: string) => void;
  onDelete: (teamCheckinId: string) => void;
  teamCheckin: TeamCheckin;
}

function TeamCheckinCard({
  testId = 'team-checkin-card',
  onEdit,
  onDelete,
  teamCheckin,
}: Props) {
  const { formatMessage, locale } = useIntl();

  const headingTestId = testId && `${testId}.heading`;
  const moodInfoTestId = testId && `${testId}.mood-info`;
  const timestampTestId = testId && `${testId}.timestamp`;
  const bodyTestId = testId && `${testId}.body`;

  const createdAtInUTC = teamCheckin.changeMetadata.createdAt;
  const createdAtUTC = `${moment(createdAtInUTC).format('LLL')} UTC`;
  moment.locale(locale); // set moment locale
  const createdAtLocalized = moment(createdAtInUTC).format('LL');

  return (
    <CardWrapper>
      <Card shadowOnHover={true} data-testid={testId}>
        <CardBody>
          <HeadingWrapper>
            <HeadingLeft>
              <Title data-testid={headingTestId}>
                {formatMessage(messages.moodThisWeek)}
              </Title>

              <MoodInfo
                mood={teamCheckin.mood as number}
                testId={moodInfoTestId}
              />
            </HeadingLeft>

            <HeadingRight>
              <Tooltip content={createdAtUTC}>
                <CheckinTimestamp
                  timestamp={createdAtLocalized}
                  testId={timestampTestId}
                />
              </Tooltip>

              <ActionsWrapper>
                <ActionsDropdown
                  onEdit={onEdit}
                  onDelete={onDelete}
                  teamCheckinId={teamCheckin.id}
                />
              </ActionsWrapper>
            </HeadingRight>
          </HeadingWrapper>

          <BodyWrapper>
            <Body data-testid={bodyTestId}>
              <ResponseListWrapper>
                <ResponseWrapper>
                  <Label>{formatMessage(messages.response1Label)}</Label>
                  <Response>{teamCheckin.response1}</Response>
                </ResponseWrapper>

                <ResponseWrapper>
                  <Label>{formatMessage(messages.response2Label)}</Label>
                  <Response>{teamCheckin.response2}</Response>
                </ResponseWrapper>

                <ResponseWrapper>
                  <Label>{formatMessage(messages.response3Label)}</Label>
                  <Response>{teamCheckin.response3}</Response>
                </ResponseWrapper>
              </ResponseListWrapper>
            </Body>
          </BodyWrapper>
        </CardBody>
      </Card>
    </CardWrapper>
  );
}

export default withErrorBoundary(TeamCheckinCard, {
  componentName: 'teamCheckinCard',
});
