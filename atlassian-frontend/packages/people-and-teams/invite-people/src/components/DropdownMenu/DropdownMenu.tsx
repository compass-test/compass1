import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';

import { triggerAnalyticsForDropdownMenuItemClick } from '../analytics';
import { CLOUD_ADMIN_URL } from '../../utils';
import { messages } from '../i18n';

interface OwnProps {
  cloudId?: string;
}

export const Menu: React.FC<OwnProps> = ({ cloudId }) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const onDropdownItemClick = React.useCallback(() => {
    triggerAnalyticsForDropdownMenuItemClick(createAnalyticsEvent);
  }, [createAnalyticsEvent]);

  return (
    <div data-testid="testId-invite-people-dropdown-menu">
      <DropdownMenu
        position="bottom right"
        testId="testId-invite-people-dropdown-menu"
        triggerButtonProps={{
          iconBefore: <MoreIcon label="more" size="small" />,
          spacing: 'none',
          style: {
            padding: 4,
          },
          appearance: 'subtle',
        }}
        triggerType="button"
      >
        <DropdownItemGroup>
          <DropdownItem
            data-testid="testId-invite-people-manage-access-settings-menu-item"
            href={`${CLOUD_ADMIN_URL}/s/${cloudId}/signup`}
            onClick={onDropdownItemClick}
            target="new"
          >
            <FormattedMessage {...messages.formManageAccessSettingsLabel} />
          </DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    </div>
  );
};

export default injectIntl(Menu);
