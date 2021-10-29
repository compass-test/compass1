/** @jsx jsx */
import { jsx, CSSObject } from '@emotion/core';
import { useState, useEffect, useRef } from 'react';

import debounce from 'lodash/debounce';

import Button from '@atlaskit/button';
import ArrowUpCircleIcon from '@atlaskit/icon/glyph/arrow-up-circle';

import { displayFontStack } from './typography';

const duration = 700;
const easeOutCurve = 'cubic-bezier(0.2,0,0,1)';

const backToTopStyles = (visible: boolean): CSSObject => ({
  position: 'fixed',
  bottom: '1rem',
  right: '1rem',
  zIndex: 999,

  fontFamily: displayFontStack,
  fontWeight: 600,
  fontSize: '12px',
  letterSpacing: '1px',

  textTransform: 'uppercase',

  cursor: 'pointer',
  opacity: 0,
  transform: 'translateY(2vh)',
  visibility: 'hidden',
  transition: `opacity ${duration}ms ${easeOutCurve}, transform ${duration}ms ${easeOutCurve}, visibility ${duration}ms ${easeOutCurve}`,

  '&:hover': {
    opacity: 1,
  },

  ...(visible && {
    opacity: 1,
    transform: 'none',
    visibility: 'visible',
  }),
});

type BackToTopPanelProps = {
  label: string;
};

const BackToTop = (props: BackToTopPanelProps) => {
  const viewPortHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  const [farAwayFromTop, setFarAwayFromTop] = useState(false);

  useEffect(() => {
    const onScroll = debounce(() => {
      const currentPosition = window.pageYOffset;
      setFarAwayFromTop(currentPosition > viewPortHeight * 2);
    }, 100);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [viewPortHeight]);

  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });

    ref.current && observer.observe(ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => ref.current && observer.unobserve(ref.current);
  }, [farAwayFromTop]);

  return (
    <Button
      appearance="default"
      ref={ref}
      onClick={() => window.scrollTo(0, 0)}
      css={backToTopStyles(visible && farAwayFromTop)}
      iconBefore={<ArrowUpCircleIcon label={props.label} size="small" />}
    >
      {props.label}
    </Button>
  );
};

export default BackToTop;
