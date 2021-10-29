import React, { forwardRef, ReactNode, useEffect, useState } from 'react';

import {
  ScrollContainer as ActualScrollContainer,
  ScrollHint,
  Wrapper,
} from './styled';

type HTMLElementRef = React.RefObject<HTMLElement>;

type Props = {
  children: ReactNode;
};

const useScrollerHint = (containerRef: HTMLElementRef) => {
  const [hasScroll, setHasScroll] = useState(false);
  const [scrolledToBottom, setHasScrolledToBottom] = useState(false);
  useEffect(() => {
    // Legacy browser support
    if (typeof ResizeObserver !== 'function') {
      return;
    }

    const { current: el } = containerRef;
    if (!el) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const hasScrollDown = el.scrollHeight > el.offsetHeight ? true : false;
      setHasScroll(hasScrollDown);
      setHasScrolledToBottom(
        el.scrollTop === el.scrollHeight - el.offsetHeight,
      );
    });
    observer.observe(el);

    return () => observer.unobserve(el);
  }, [containerRef]);

  useEffect(() => {
    const { current: el } = containerRef;
    if (!el) {
      return;
    }
    const handleScroll = () =>
      setHasScrolledToBottom(
        el.scrollTop === el.scrollHeight - el.offsetHeight,
      );

    el.addEventListener('scroll', handleScroll);

    return () => el.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  const canScrollDown = hasScroll && !scrolledToBottom;

  return canScrollDown;
};

/**
 * Renders a scrollable container which has inner shadow indicator when it doesn't reach the bottom.
 */
const ScrollContainer = forwardRef<HTMLElement, Props>(({ children }, ref) => {
  const containerRef = ref as React.RefObject<HTMLElement>;
  const canScrollDown = useScrollerHint(containerRef);

  return (
    <Wrapper>
      <ActualScrollContainer innerRef={containerRef}>
        {children}
      </ActualScrollContainer>
      {<ScrollHint visible={canScrollDown} />}
    </Wrapper>
  );
});

export default ScrollContainer;
