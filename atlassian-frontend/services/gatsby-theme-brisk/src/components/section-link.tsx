/** @jsx jsx */
import { CSSProperties } from 'react';
import { jsx, css } from '@emotion/core';
import LinkIcon from '@atlaskit/icon/glyph/link';
import ClickCopyAnchor from './click-copy-anchor';

const SectionHeaderCSS = css`
  position: relative;
  padding-top: var(--section-spacing, 22px);

  margin-top: 0 !important;
  a {
    display: inline-block;
    opacity: 0;
    transform: translateX(4px);
    transition: opacity 0.2s ease-out, transform 0.2s ease-out;
    position: absolute;
    left: -30px;
    &:focus {
      opacity: 1;
    }
  }
  &:hover {
    a {
      opacity: 1;
      transition-duration: 0.1s;
      transform: none;
    }
  }
`;

type Props = {
  id: string;
  children: any;
  level: 2 | 3;
  css?: any;
};

const SectionLink = ({ id, children, level }: Props) => {
  if (level === 2) {
    return (
      <h2
        className="section-link"
        id={id}
        css={SectionHeaderCSS}
        style={{ '--section-spacing': '48px' } as CSSProperties}
      >
        {children}
        <ClickCopyAnchor href={`#${id}`}>
          <LinkIcon label={children} />
        </ClickCopyAnchor>
      </h2>
    );
  } else if (level === 3) {
    return (
      <h3 className="section-link" id={id} css={SectionHeaderCSS}>
        {children}
        <ClickCopyAnchor href={`#${id}`}>
          <LinkIcon label={children} />
        </ClickCopyAnchor>
      </h3>
    );
  } else {
    return children;
  }
};

export default SectionLink;
