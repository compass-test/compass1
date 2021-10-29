import React, { useCallback, useState } from 'react';

import { Help as HelpButton } from '@atlaskit/atlassian-navigation';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import { LinkItem, MenuGroup, Section } from '@atlaskit/menu';
import Popup from '@atlaskit/popup';

const AppHelpContent = () => {
  return (
    <MenuGroup>
      <Section title="Help">
        <LinkItem
          href="https://atlassian.slack.com/archives/CFJ9DU39U"
          target="_blank"
          iconAfter={<ShortcutIcon label="" />}
        >
          Support channel
        </LinkItem>
      </Section>
    </MenuGroup>
  );
};

const AppHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, [setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={handleClose}
      placement="bottom-end"
      trigger={(props) => (
        <HelpButton tooltip="Help" onClick={toggleIsOpen} {...props} />
      )}
      content={() => <AppHelpContent />}
    />
  );
};

export default AppHelp;
