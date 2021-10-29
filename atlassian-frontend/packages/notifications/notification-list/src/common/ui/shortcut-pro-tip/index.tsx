import React, { useState } from 'react';

import {
  defineMessages,
  FormattedHTMLMessage,
  FormattedMessage,
} from 'react-intl';

import ArrowDownIcon from '@atlaskit/icon/glyph/arrow-down';
import ArrowUpIcon from '@atlaskit/icon/glyph/arrow-up';
import InlineDialog from '@atlaskit/inline-dialog';

import { ShortcutsDialog } from '../shortcuts-dialog';

import {
  ProTipContainer,
  ProTipKeys,
  ProTipText,
  ShortcutKey,
  ToggleDialogButton,
} from './styled';

export default function ShortcutsProTip() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen((prev) => !prev);
  };

  return (
    <ProTipContainer>
      <ProTipText>
        <FormattedHTMLMessage {...messages.proTip} />
        <ProTipKeys>
          <ShortcutKey>
            <ArrowDownIcon label="Arrow Down" size="small" />
          </ShortcutKey>
          <ShortcutKey>
            <ArrowUpIcon label="Arrow Up" size="small" />
          </ShortcutKey>
        </ProTipKeys>
        <FormattedHTMLMessage {...messages.proTipPostIcons} />
      </ProTipText>
      <InlineDialog
        content={<ShortcutsDialog />}
        onClose={() => {
          setDialogOpen(false);
        }}
        isOpen={dialogOpen}
        placement="top-end"
      >
        <ToggleDialogButton
          appearance="link"
          spacing="none"
          onClick={toggleDialog}
          onBlur={() => setDialogOpen(false)}
        >
          <FormattedMessage {...messages.shortcutsButton} />
        </ToggleDialogButton>
      </InlineDialog>
    </ProTipContainer>
  );
}

const messages = defineMessages({
  proTip: {
    defaultMessage: '<strong>Pro tip:</strong> press',
    description:
      'Instructs users they can use the Up/Down arrow keys on the keyboard to navigate between notifications. Will be concatenated with fabric.notificationList.shortcuts.proTipPostIcons',
    id: 'fabric.notificationList.shortcuts.protip',
  },
  proTipPostIcons: {
    defaultMessage: 'to move through notifications.',
    description:
      'will be concatenated with fabric.notificationList.shortcuts.protip with some icons in between.',
    id: 'fabric.notificationList.shortcuts.proTipPostIcons',
  },
  shortcutsButton: {
    defaultMessage: 'See all shortcuts',
    description:
      'Button that triggers a dialog showing a list of keyboard shortcuts',
    id: 'fabric.notificationList.shortcuts.expandButton',
  },
});
