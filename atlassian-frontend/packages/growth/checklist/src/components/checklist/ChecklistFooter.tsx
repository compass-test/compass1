// eslint-disable-next-line import/no-extraneous-dependencies
import React, { MouseEvent } from 'react';
import { Footer, FooterDismissLink } from './styled';

export interface ChecklistFooterProps {
  dismissTitle: string;
  onDismiss: (e: MouseEvent<HTMLAnchorElement>) => void;
  wrapper?: React.ElementType;
}

export default ({ dismissTitle, onDismiss, wrapper }: ChecklistFooterProps) => {
  const FooterWrapper = wrapper ? wrapper : Footer;

  return (
    <FooterWrapper>
      <FooterDismissLink
        data-testid="checklist-footer-dismiss-link"
        href="#"
        onClick={onDismiss}
      >
        {dismissTitle}
      </FooterDismissLink>
    </FooterWrapper>
  );
};
