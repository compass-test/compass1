import React, { useEffect } from 'react';

import { defineMessages, FormattedMessage } from 'react-intl';

import ArrowDownIcon from '@atlaskit/icon/glyph/arrow-down';
import ArrowUpIcon from '@atlaskit/icon/glyph/arrow-up';
import { h500 } from '@atlaskit/theme/typography';

import {
  triggerShortcutsDialogViewed,
  useCreateFireAnalyticsFromTrigger,
} from '../../../common/utils/analytics';
import {
  Header,
  LongShortcutKey,
  ShortcutKey,
} from '../shortcut-pro-tip/styled';

import { DialogKeysGroup, ShortcutDialog, ShortcutText } from './styled';

export function ShortcutsDialog() {
  const fireViewedShortcutsDialog = useCreateFireAnalyticsFromTrigger(
    triggerShortcutsDialogViewed,
  );

  useEffect(() => {
    fireViewedShortcutsDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ShortcutDialog>
      <Header mixin={h500}>
        <FormattedMessage {...messages.headerText} />
      </Header>

      {/* Move through notifications */}
      <ShortcutText>
        <FormattedMessage {...messages.moveThroughNotifications} />
        <DialogKeysGroup>
          <ShortcutKey>
            <ArrowDownIcon label="Arrow Down" size="small" />
          </ShortcutKey>
          <ShortcutKey>
            <ArrowUpIcon label="Arrow Up" size="small" />
          </ShortcutKey>
        </DialogKeysGroup>
      </ShortcutText>

      {/* Expand notification */}
      <ShortcutText>
        <FormattedMessage {...messages.expandNotification} />
        <ShortcutKey>e</ShortcutKey>
      </ShortcutText>

      {/* Toggle read state */}
      <ShortcutText>
        <FormattedMessage {...messages.toggleReadState} />
        <ShortcutKey>r</ShortcutKey>
      </ShortcutText>

      {/* First notification */}
      <ShortcutText>
        <FormattedMessage {...messages.firstNotification} />
        <DialogKeysGroup>
          <LongShortcutKey>
            <FormattedMessage {...messages.shiftKey} />
          </LongShortcutKey>
          <span>+</span>
          <ShortcutKey>
            <ArrowUpIcon label="Arrow Up" size="small" />
          </ShortcutKey>
        </DialogKeysGroup>
      </ShortcutText>

      {/* Last notification */}
      <ShortcutText>
        <FormattedMessage {...messages.lastNotification} />
        <DialogKeysGroup>
          <LongShortcutKey>
            <FormattedMessage {...messages.shiftKey} />
          </LongShortcutKey>
          <span>+</span>
          <ShortcutKey>
            <ArrowDownIcon label="Arrow Down" size="small" />
          </ShortcutKey>
        </DialogKeysGroup>
      </ShortcutText>
    </ShortcutDialog>
  );
}

const messages = defineMessages({
  headerText: {
    defaultMessage: 'Keyboard shortcuts',
    description: 'Header text for a keyboard shortcuts dialog',
    id: 'fabric.notificationList.shortcuts.headerText',
  },
  moveThroughNotifications: {
    defaultMessage: 'Move through notifications',
    description:
      'Indicates user can use up/down arrow keys to move through their notifications',
    id: 'fabric.notificationList.shortcuts.moveThroughNotifications',
  },
  expandNotification: {
    defaultMessage: 'Expand notification',
    description: 'Indicates user can use the e key to expand a notification',
    id: 'fabric.notificationList.shortcuts.expandNotification',
  },
  toggleReadState: {
    defaultMessage: 'Change read state',
    description:
      'Indicates user can use r key to toggle the read state of a notification',
    id: 'fabric.notificationList.shortcuts.toggleReadState',
  },
  firstNotification: {
    defaultMessage: 'First notification',
    description:
      'Indicates user can press shift + arrow up keys to go to the first notification',
    id: 'fabric.notificationList.shortcuts.firstNotification',
  },
  lastNotification: {
    defaultMessage: 'Last notification',
    description:
      'Indicates user can press shift + down up keys to go to the last notification',
    id: 'fabric.notificationList.shortcuts.lastNotification',
  },
  shiftKey: {
    defaultMessage: 'shift',
    description: 'Describes the shift key on a keyboard',
    id: 'fabric.notificationList.shortcuts.shiftKey',
  },
});
