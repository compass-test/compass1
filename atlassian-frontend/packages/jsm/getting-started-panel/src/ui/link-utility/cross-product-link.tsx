import React, { ReactNode, MouseEvent } from 'react';
import { useLinkClickedEvent } from '../../common/analytics';
import { Product } from '../../common/types';
import { getLinkTarget } from '../../common/util';
import { useUrlData } from '../../common/ui/url-data';
import { LinkWithFullClickEvents } from './link-with-full-click-events';

interface Props {
  linkProduct: Product;
  url: string;
  subjectId: string;
  children: ReactNode;
  onClick?: () => void;
}

export const CrossProductLink = ({
  linkProduct,
  url,
  subjectId,
  children,
  onClick,
}: Props) => {
  const { product, onSpaRedirect } = useUrlData();

  const handleClickAnalytics = useLinkClickedEvent(subjectId);

  const handleClick = (
    e: MouseEvent<HTMLAnchorElement>,
    isAuxClick: boolean,
  ) => {
    if (
      // redirect function exists
      onSpaRedirect &&
      // on primary button click
      !isAuxClick &&
      // link is to the same product
      linkProduct === product &&
      // no modifier buttons have been pressed
      !e.shiftKey &&
      !e.metaKey &&
      !e.ctrlKey
    ) {
      e.preventDefault();
      onSpaRedirect(url);
    }
    // else link will behave as normal
    handleClickAnalytics(e);
    // additional click actions defined by consumer component
    onClick && onClick();
  };

  return (
    <LinkWithFullClickEvents
      href={url}
      onLinkClick={handleClick}
      target={getLinkTarget(linkProduct, product)}
    >
      {children}
    </LinkWithFullClickEvents>
  );
};
