import React from 'react';

import { Link } from 'react-resource-router';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import * as colors from '@atlaskit/theme/colors';
import { CompassAnnouncementAcknowledgement } from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';

import incompleteCheck from '../../../../../../../common/assets/IncompleteCheck.svg';

import {
  AcknowledgementContent,
  ComponentName,
  ItemContainer,
  StatusCheckWrapper,
} from './styled';

type Props = {
  acknowledgement: CompassAnnouncementAcknowledgement;
};

export const AcknowledgementItem = (props: Props) => {
  const { acknowledgement } = props;

  const StatusCheck = () => (
    <StatusCheckWrapper>
      {acknowledgement.hasAcknowledged ? (
        <CheckCircleIcon label="" size="small" primaryColor={colors.G300} />
      ) : (
        <img src={incompleteCheck} height="16" width="16" />
      )}
    </StatusCheckWrapper>
  );

  return (
    <ItemContainer>
      <Link to={routes.COMPONENT_DETAILS(acknowledgement.component?.id ?? '')}>
        <AcknowledgementContent>
          <StatusCheck />
          <ComponentName>{acknowledgement.component?.name}</ComponentName>
        </AcknowledgementContent>
      </Link>
    </ItemContainer>
  );
};
