import React, { useMemo } from 'react';

import { UIAnalyticsEvent, useAnalyticsEvents } from '@atlaskit/analytics-next';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { Card, CardBody } from '../../../../common/ui/card';
import { useDisclosureController } from '../../../../common/ui/disclosure';
import { Divider } from '../../../../common/ui/divider';

import {
  DividerWrapper,
  Header,
  IconWrapper,
  PrimaryText,
  SecondaryText,
  SummaryContent,
  SummaryText,
  TitleHeading,
} from './styled';

interface Props {
  heading: string;
  secondaryText?: string;
  icon?: JSX.Element;
  details: React.ComponentType;
  onToggle?: (
    e: React.MouseEvent<HTMLElement>,
    analyticsEvent: UIAnalyticsEvent,
    isExpanded: boolean,
  ) => void;
}

function ExpandingCard({
  heading,
  secondaryText,
  icon,
  details: Details,
  onToggle,
}: Props) {
  const { formatMessage } = useIntl();
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const [
    { disclosureProps, toggleProps, isExpanded },
    { toggle },
  ] = useDisclosureController();

  const chevron = useMemo(() => {
    const ToggleIcon = isExpanded ? ChevronDownIcon : ChevronRightIcon;
    const label = isExpanded
      ? formatMessage(CommonMessages.hide)
      : formatMessage(CommonMessages.show);

    return <ToggleIcon label={label} />;
  }, [isExpanded, formatMessage]);

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    toggle();

    const analyticsEvent = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'button',
    });

    // Here we optimistically assume that toggle() was invoked successfully above and
    // updated the state of isExpanded. Because isExpanded is updated asynchronously,
    // we cannot pass it directly to onToggle and expect it to have been updated.
    if (onToggle) {
      onToggle(e, analyticsEvent, !isExpanded);
    }
  };

  return (
    <Card {...disclosureProps}>
      <CardBody>
        <Header>
          <SummaryContent type="button" onClick={onClick} {...toggleProps}>
            <IconWrapper role="presentation">{icon}</IconWrapper>
            <SummaryText>
              <TitleHeading>
                <PrimaryText>{heading}</PrimaryText>
                {chevron}
              </TitleHeading>
              {secondaryText && <SecondaryText>{secondaryText}</SecondaryText>}
            </SummaryText>
          </SummaryContent>
        </Header>

        {isExpanded && (
          <>
            <DividerWrapper>
              <Divider />
            </DividerWrapper>
            <Details />
          </>
        )}
      </CardBody>
    </Card>
  );
}

export default ExpandingCard;
