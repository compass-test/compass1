import React, { useCallback, useState } from 'react';

import { Help } from '@atlaskit/atlassian-navigation';
import { IconProps } from '@atlaskit/icon';
import AddItemIcon from '@atlaskit/icon/glyph/add-item';
import FeedbackIcon from '@atlaskit/icon/glyph/feedback';
import FileIcon from '@atlaskit/icon/glyph/file';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import { LinkItem, PopupMenuGroup, Section } from '@atlaskit/menu';
import Popup from '@atlaskit/popup';
import { SlackIcon } from '@atlassian/performance-portal-common';

import { IconWrapper } from './styled';

interface MenuItemProps {
  iconComponent: React.ComponentType<IconProps>;
  label: string;
  href: string;
  newWindow?: boolean;
  useBackground?: boolean;
}
const MenuItem = ({
  iconComponent: IconComponent,
  label,
  href,
  newWindow = false,
  useBackground = true,
}: MenuItemProps) => (
  <LinkItem
    href={href}
    target="_blank"
    iconBefore={
      <IconWrapper useBackground={useBackground}>
        <IconComponent label={label} size="small" primaryColor={'#ffffff'} />
      </IconWrapper>
    }
    iconAfter={
      newWindow && <ShortcutIcon label={'open in new window'} size="small" />
    }
  >
    {label}
  </LinkItem>
);

const PopupContents = () => {
  return (
    <PopupMenuGroup>
      <Section>
        <MenuItem
          iconComponent={AddItemIcon}
          label="Add/edit metric"
          href="https://product-fabric.atlassian.net/servicedesk/customer/portal/87/group/122/create/12436"
          newWindow
        />
        <MenuItem
          iconComponent={FeedbackIcon}
          label="Give feedback"
          href="https://product-fabric.atlassian.net/servicedesk/customer/portal/87/group/122"
          newWindow
        />
        <MenuItem
          iconComponent={FileIcon}
          label="Project Poster"
          href="https://hello.atlassian.net/wiki/spaces/APD/pages/783318734/Performance+Portal"
          newWindow
        />
        <MenuItem
          iconComponent={SlackIcon}
          label="Reach out to us on Slack"
          href="https://atlassian.slack.com/archives/C01AY8132S3"
          newWindow
          useBackground={false}
        />
      </Section>
    </PopupMenuGroup>
  );
};

export const InfoDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={closePopup}
      content={PopupContents}
      placement="bottom-end"
      trigger={({ ...triggerProps }) => {
        return (
          <Help
            {...triggerProps}
            tooltip={'More information'}
            onClick={handleClick}
          />
        );
      }}
    />
  );
};
