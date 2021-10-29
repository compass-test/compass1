import React from 'react';

import moment from 'moment';
import { Link } from 'react-resource-router';

import { CompassComponentOverviewFragment } from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ComponentTypeIcon } from '../../common/ui/component-type-icon';

import messages from './messages';
import {
  AcknowledgementActionContainer,
  ActionsMenu,
  AnnouncementContainer,
  AnnouncementDetails,
  Body,
  ComponentNameContainer,
  ComponentTypeIconContainer,
  Description,
  Footer,
  SourceComponent,
  SourceComponentContainer,
  TargetDate,
  Title,
} from './styled';

export type Props = {
  targetDate: Date;
  title: string;
  sourceComponent?: CompassComponentOverviewFragment;
  description: string;
  actionsMenu?: React.ReactNode;
  acknowledgementAction?: React.ReactNode;
};

export const AnnouncementItem: React.FC<Props> = (props: Props) => {
  const {
    targetDate,
    title,
    sourceComponent,
    description,
    actionsMenu,
    acknowledgementAction,
  } = props;

  const { formatMessage, locale } = useIntl();

  moment.locale(locale); // set moment locale
  const targetMoment = moment(targetDate);
  const isTargetDateToday = moment().isSame(targetMoment, 'day');
  const targetDateText = isTargetDateToday
    ? formatMessage(messages.today)
    : formatMessage(messages.announcementTargetDate, {
        timeFromTargetDate: moment().to(targetMoment),
        fullTargetDate: targetMoment.format('LL'),
      });

  return (
    <AnnouncementContainer>
      <Body>
        <AnnouncementDetails>
          <Title>{title}</Title>
          <SourceComponent>
            {sourceComponent && (
              <SourceComponentContainer>
                <ComponentTypeIconContainer>
                  <ComponentTypeIcon type={sourceComponent.type} size="small" />
                </ComponentTypeIconContainer>
                <Link to={routes.COMPONENT_DETAILS(sourceComponent.id)}>
                  <ComponentNameContainer>
                    {sourceComponent.name}
                  </ComponentNameContainer>
                </Link>
              </SourceComponentContainer>
            )}
          </SourceComponent>
          <Description>{description}</Description>
        </AnnouncementDetails>
        <ActionsMenu>{actionsMenu}</ActionsMenu>
      </Body>

      <Footer>
        <TargetDate>{targetDateText}</TargetDate>
        <AcknowledgementActionContainer>
          {acknowledgementAction}
        </AcknowledgementActionContainer>
      </Footer>
    </AnnouncementContainer>
  );
};
