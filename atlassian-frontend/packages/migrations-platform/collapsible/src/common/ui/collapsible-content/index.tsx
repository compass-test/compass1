import React, { FC, useRef } from 'react';

import { CSSTransition } from 'react-transition-group';

import { collapseAnimationDuration, CollapsibleWrapper } from './styled';

type Props = {
  isOpen: boolean;
};

const CollapsibleContent: FC<Props> = ({ children, isOpen }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  let contentHeight: string;

  if (contentRef.current) {
    contentHeight = `${contentRef.current.scrollHeight}px`;
  } else {
    contentHeight = '0';
  }

  return (
    <CSSTransition
      in={isOpen && !!contentRef.current}
      timeout={collapseAnimationDuration}
      classNames="collapse"
    >
      <CollapsibleWrapper contentHeight={contentHeight} innerRef={contentRef}>
        {children}
      </CollapsibleWrapper>
    </CSSTransition>
  );
};

export default CollapsibleContent;
