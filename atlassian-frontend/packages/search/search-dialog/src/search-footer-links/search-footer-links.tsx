import Button from '@atlaskit/button';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import Tooltip from '@atlaskit/tooltip';
import React, { Ref } from 'react';
import { LinkComponent } from '../search-link-component';
import {
  DropownMenuLink,
  LabelContainer,
  PrimaryButtonStyledLink,
  PrimaryButtonWrapper,
  SearchFooterLinksContainer,
  TruncatedTextDiv,
} from './search-footer-links.styled';

const DEFAULT_MAX_PRIMARY_LINKS = 5;

interface FooterLink {
  key: string;
  content: JSX.Element | string;
  href: string;
}

export interface SearchFooterLinksProps {
  label: JSX.Element | string;
  onClick?: (link: FooterLink, e: React.MouseEvent<HTMLElement>) => void;
  links: FooterLink[];
  dropdownTriggerLabel?: JSX.Element | string;
  linkComponent?: LinkComponent;
  maxPrimaryLinks?: number;
}

export const ForwardedRefToolTipTag = React.forwardRef(
  (props, ref: Ref<any>) => <TruncatedTextDiv {...props} ref={ref} />,
);

export const SearchFooterLinks: React.FunctionComponent<SearchFooterLinksProps> = ({
  label,
  links,
  dropdownTriggerLabel,
  onClick,
  linkComponent,
  maxPrimaryLinks,
}) => {
  const primaryLinks = links.slice(
    0,
    maxPrimaryLinks || DEFAULT_MAX_PRIMARY_LINKS,
  );
  const dropdownLinks = links.slice(
    maxPrimaryLinks || DEFAULT_MAX_PRIMARY_LINKS,
    links.length,
  );

  return (
    <SearchFooterLinksContainer>
      <LabelContainer>{label}</LabelContainer>
      {primaryLinks.map((link) => {
        const { key, href, content } = link;

        return (
          <PrimaryButtonWrapper
            key={key}
            onClick={(e) => onClick && onClick(link, e)}
          >
            <PrimaryButtonStyledLink href={href} linkComponent={linkComponent}>
              <Tooltip content={content} tag={ForwardedRefToolTipTag}>
                <Button spacing="compact" tabIndex={-1}>
                  {content}
                </Button>
              </Tooltip>
            </PrimaryButtonStyledLink>
          </PrimaryButtonWrapper>
        );
      })}
      {dropdownLinks && dropdownLinks.length > 0 ? (
        <DropdownMenu
          triggerButtonProps={{
            spacing: 'compact',
          }}
          trigger={dropdownTriggerLabel}
          triggerType="button"
          isMenuFixed
          shouldFlip
          position="bottom right"
        >
          <DropdownItemGroup>
            {dropdownLinks.map((link) => {
              const { key, href, content } = link;
              return (
                <div onClick={(e) => onClick && onClick(link, e)}>
                  <DropownMenuLink
                    key={key}
                    href={href}
                    linkComponent={linkComponent}
                  >
                    <Tooltip content={content} tag={ForwardedRefToolTipTag}>
                      <DropdownItem key={key} isCompact tabIndex={-1}>
                        {content}
                      </DropdownItem>
                    </Tooltip>
                  </DropownMenuLink>
                </div>
              );
            })}
          </DropdownItemGroup>
        </DropdownMenu>
      ) : null}
    </SearchFooterLinksContainer>
  );
};
