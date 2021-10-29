import React from 'react';

import { CompassAnnouncementAcknowledgement } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { AcknowledgementItem } from './acknowledgement-item';
import messages from './messages';
import { Item, ItemsList, ListWrapper, SectionHeading } from './styled';
import { groupAcknowledgementsByStatus } from './utils';

type Props = {
  acknowledgements: CompassAnnouncementAcknowledgement[];
};

export const AcknowledgementList = (props: Props) => {
  const { acknowledgements } = props;
  const { formatMessage } = useIntl();

  const { acknowledged, unacknowledged } = groupAcknowledgementsByStatus(
    acknowledgements,
  );

  return (
    <ListWrapper>
      {unacknowledged.length > 0 && (
        <>
          <SectionHeading>
            {formatMessage(messages.unacknowledgedSectionHeading)}
          </SectionHeading>
          <ItemsList>
            {unacknowledged.map((ack) => (
              <Item key={ack.component?.id}>
                <AcknowledgementItem acknowledgement={ack} />
              </Item>
            ))}
          </ItemsList>
        </>
      )}
      {acknowledged.length > 0 && (
        <>
          <SectionHeading>
            {formatMessage(messages.acknowledgedSectionHeading)}
          </SectionHeading>
          <ItemsList>
            {acknowledged.map((ack) => (
              <Item key={ack.component?.id}>
                <AcknowledgementItem acknowledgement={ack} />
              </Item>
            ))}
          </ItemsList>
        </>
      )}
    </ListWrapper>
  );
};
