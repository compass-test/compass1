import React, { useCallback, useState } from 'react';

import { Link } from 'react-resource-router';

import { PrimaryDropdownButton } from '@atlaskit/atlassian-navigation';
import { ConfluenceLogo, JiraLogo, LogoProps } from '@atlaskit/logo';
import { ButtonItem, PopupMenuGroup, Section } from '@atlaskit/menu';
import Popup from '@atlaskit/popup';
import { B200, B400, N700 } from '@atlaskit/theme/colors';

const productLogoProps: LogoProps = {
  size: 'small',
  textColor: N700,
  iconColor: B200,
  iconGradientStart: B400,
  iconGradientStop: B200,
};

interface PopupContentsProps {
  onClick: () => void;
}

const PopupContents = ({ onClick }: PopupContentsProps) => {
  return (
    <PopupMenuGroup onClick={onClick}>
      <Section>
        <Link to="/reports/jira">
          <ButtonItem>
            <JiraLogo {...productLogoProps} />
          </ButtonItem>
        </Link>
        <Link to="/reports/confluence">
          <ButtonItem>
            <ConfluenceLogo {...productLogoProps} />
          </ButtonItem>
        </Link>
      </Section>
    </PopupMenuGroup>
  );
};

interface Props {
  isHighlighted: boolean;
}

export const ReportsDropdown = ({ isHighlighted }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = useCallback(() => setIsOpen((prev) => !prev), [
    setIsOpen,
  ]);

  return (
    <Popup
      content={() => <PopupContents onClick={() => setIsOpen(false)} />}
      isOpen={isOpen}
      placement="bottom-start"
      onClose={() => setIsOpen(false)}
      trigger={(triggerProps) => (
        <PrimaryDropdownButton
          {...triggerProps}
          isSelected={isOpen}
          isHighlighted={isHighlighted}
          onClick={handleClick}
        >
          Reports
        </PrimaryDropdownButton>
      )}
    />
  );
};
