import React, { useState } from 'react';

import Button from '@atlaskit/button';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import Popup from '@atlaskit/popup';
import { AnnouncementItem } from '@atlassian/dragonfruit-components';
import {
  CompassAnnouncement,
  CompassComponentOverviewFragment,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { AcknowledgementList } from './acknowledgement-list';
import { AnnouncementActionsMenu } from './actions-menu';
import messages from './messages';

type Props = {
  announcement: CompassAnnouncement;
  component: CompassComponentOverviewFragment;
};

export function OwnAnnouncement(props: Props) {
  const { announcement, component } = props;

  const { formatMessage } = useIntl();

  const acknowledgements = announcement.acknowledgements ?? [];
  const acknowledgementTotal = acknowledgements.length;
  const acknowledgementCount = acknowledgements.filter(
    (item) => item.hasAcknowledged,
  ).length;

  const [
    isAcknowledgementsPopupOpen,
    setIsAcknowledgementsPopupOpen,
  ] = useState<boolean>(false);

  const content = () => {
    return <AcknowledgementList acknowledgements={acknowledgements} />;
  };

  const acknowledgementsAction = (
    <Popup
      isOpen={isAcknowledgementsPopupOpen}
      onClose={() => setIsAcknowledgementsPopupOpen(false)}
      placement="bottom-start"
      content={content}
      trigger={(triggerProps) => (
        <Button
          {...triggerProps}
          isSelected={isAcknowledgementsPopupOpen}
          onClick={() =>
            setIsAcknowledgementsPopupOpen(!isAcknowledgementsPopupOpen)
          }
          iconAfter={<ChevronDownIcon label="" />}
        >
          {formatMessage(messages.acknowledgementStatus, {
            numAcknowledged: acknowledgementCount,
            total: acknowledgementTotal,
          })}
        </Button>
      )}
    />
  );

  return (
    <AnnouncementItem
      targetDate={announcement.targetDate}
      title={announcement.title ?? ''}
      description={announcement.description ?? ''}
      actionsMenu={
        <AnnouncementActionsMenu
          announcement={announcement}
          component={component}
        />
      }
      acknowledgementAction={acknowledgementsAction}
    />
  );
}
