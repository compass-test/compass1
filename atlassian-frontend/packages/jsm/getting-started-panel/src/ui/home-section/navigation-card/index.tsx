import React from 'react';

import Button from '@atlaskit/button';
import { useLinkClickedEvent } from '../../../common/analytics';
import { Card, CardContent, CardDescription, CardTitle } from './styled';

const actionSubjectId = 'jsmGettingStartedPanelHomeSectionNavigationCard';

interface Props {
  icon: JSX.Element;
  title: string;
  description: string;
  cardId: string;
  onClick?: () => void;
  link?: string;
}

export const NavigationCard = ({
  icon,
  title,
  description,
  cardId,
  onClick,
  link,
}: Props) => {
  const handleClickAnalytics = useLinkClickedEvent(actionSubjectId, {
    attributes: { cardId },
  });

  return (
    <Card>
      <Button
        // fire analytics on middle button clicks for links
        onAuxClick={(e) => {
          link !== undefined && handleClickAnalytics(e);
        }}
        onClick={(e) => {
          handleClickAnalytics(e);
          onClick?.();
        }}
        // appearance subtle-link instead of subtle because
        // subtle causes an animation problem in chrome
        // JIG-717
        appearance="subtle-link"
        iconAfter={icon}
        target="_blank"
        href={link}
      >
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Button>
    </Card>
  );
};

export default NavigationCard;
