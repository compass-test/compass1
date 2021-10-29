import React, { ReactNode, MouseEvent } from 'react';
import { di } from 'react-magnetic-di';
import { useUrlData } from '../../common/ui/url-data';
import { useInProductHelpDocumentationLinksEnabled } from '../../feature-flags';

interface Props {
  href: string;
  children: ReactNode;
  target?: string;
  'data-testid'?: string;
  inProductHelpArticleId?: string;
  onLinkClick: (e: MouseEvent<HTMLAnchorElement>, isAuxClick: boolean) => void;
}

export const LinkWithFullClickEvents = ({
  href,
  children,
  target,
  'data-testid': dataTestId,
  inProductHelpArticleId,
  onLinkClick,
}: Props) => {
  di(useInProductHelpDocumentationLinksEnabled, useUrlData);
  const isIPHDocLinksEnabled = useInProductHelpDocumentationLinksEnabled();
  const { onOpenInProductHelpArticle } = useUrlData();

  const handleClick = (isAuxClick: boolean) => (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    onLinkClick(e, isAuxClick);
    if (
      // FF is enabled
      isIPHDocLinksEnabled &&
      // article id exists
      inProductHelpArticleId !== undefined &&
      // IPH is available
      onOpenInProductHelpArticle &&
      // on primary button click
      !isAuxClick &&
      // no modifier buttons have been pressed
      !e.shiftKey &&
      !e.metaKey &&
      !e.ctrlKey
    ) {
      onOpenInProductHelpArticle(inProductHelpArticleId);
      // prevent the link from opening as usual
      e.preventDefault();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick(false)}
      onAuxClick={handleClick(true)} // https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event
      target={target}
      data-testid={dataTestId}
    >
      {children}
    </a>
  );
};
