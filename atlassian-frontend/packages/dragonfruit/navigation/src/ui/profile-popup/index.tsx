import React, { useCallback, useState } from 'react';

import { Profile } from '@atlaskit/atlassian-navigation';
import Avatar from '@atlaskit/avatar';
import ShortcutIcon from '@atlaskit/icon/glyph/shortcut';
import { LinkItem, MenuGroup, Section } from '@atlaskit/menu';
import { Popup, TriggerProps } from '@atlaskit/popup';
import * as colors from '@atlaskit/theme/colors';
import {
  Environment,
  getEnvironmentFromOrigin,
  useGetAccountInfo,
  useTenantInfo,
} from '@atlassian/dragonfruit-tenant-context';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { getLogoutUrl } from '../../common/utils';

import messages from './messages';
import { MenuContainer } from './styled';

const baseUrl = window.location.origin;

const getRedirectionLink = (environment: Environment) => {
  if (environment === Environment.PROD) {
    return 'https://id.atlassian.com/manage-profile/profile-and-visibility';
  } else {
    return 'https://id.stg.internal.atlassian.com/manage-profile/profile-and-visibility';
  }
};

const ProfileMenuContent = ({
  accountId,
  nameOfUser,
  onClick,
}: {
  accountId: string;
  nameOfUser: string;
  onClick: () => void;
}) => {
  const { formatMessage } = useIntl();

  const environment = getEnvironmentFromOrigin();

  let logoutUrl;
  try {
    logoutUrl = getLogoutUrl(environment, baseUrl);
  } catch (e) {
    logoutUrl = '';
  }

  return (
    <MenuContainer>
      <MenuGroup onClick={onClick}>
        <Section title={nameOfUser}>
          <LinkItem href={`${baseUrl}/people/${accountId}`}>
            {formatMessage(messages.profile)}
          </LinkItem>
        </Section>
        <Section>
          <LinkItem
            target="_blank"
            href={getRedirectionLink(environment)}
            iconAfter={
              <ShortcutIcon
                label="Account settings"
                size="small"
                primaryColor={colors.N50}
              />
            }
          >
            {formatMessage(messages.accountSettings)}
          </LinkItem>
        </Section>
        <Section hasSeparator>
          <LinkItem href={logoutUrl}>{formatMessage(messages.logOut)}</LinkItem>
        </Section>
      </MenuGroup>
    </MenuContainer>
  );
};

const ProfilePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { formatMessage } = useIntl();

  const { accountId } = useTenantInfo();

  const accountInfo = useGetAccountInfo();
  const avatarUrl = accountInfo.data?.avatarUrl;
  const name = accountInfo.data?.name;

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  const content = useCallback(
    () => (
      <ProfileMenuContent
        accountId={accountId}
        nameOfUser={name ?? ''}
        onClick={onClose}
      />
    ),
    [accountId, name, onClose],
  );

  const trigger = useCallback(
    (triggerProps: TriggerProps) => (
      <Profile
        icon={<Avatar size="small" src={avatarUrl} />}
        onClick={toggleOpen}
        isSelected={isOpen}
        tooltip={formatMessage(messages.yourProfileAndSettings)}
        {...triggerProps}
      />
    ),
    [avatarUrl, formatMessage, toggleOpen, isOpen],
  );

  return (
    <Popup
      placement="bottom-end"
      content={content}
      isOpen={isOpen}
      onClose={onClose}
      trigger={trigger}
    />
  );
};

const ProfilePopupError = () => {
  return (
    <Profile isDisabled={true} icon={<Avatar size="small" />} tooltip="" />
  );
};

export default withErrorBoundary(ProfilePopup, {
  Fallback: ProfilePopupError,
  componentName: 'profilePopup',
});
