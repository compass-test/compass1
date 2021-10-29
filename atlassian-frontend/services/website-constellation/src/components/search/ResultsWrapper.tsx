/** @jsx jsx */
import { jsx, CSSObject } from '@emotion/core';
import { forwardRef, Ref, FC } from 'react';
import { N800, N40, N0 } from '@atlaskit/theme/colors';
import { layers } from '@atlaskit/theme/constants';

export interface Props extends FC {
  show?: boolean;
}

const resultsWrapperCSS = ({ show }): CSSObject => ({
  display: show ? 'grid' : 'none',
  height: '400px',
  backgroundColor: N0,
  overflow: 'auto',
  zIndex: layers.dialog(),
  paddingTop: '12px',
  position: 'absolute',
  /* header padding-right: 12px, aloglia searchbox margin-right: 4px */
  right: '16px',
  top: 'calc(100% + 0.5em)',
  width: '456px',
  color: N800,
  border: `1px solid ${N40}`,
  boxShadow:
    '0px 4px 8px rgba(9, 30, 66, 0.25), 0px 0px 1px rgba(9, 30, 66, 0.31)',
  borderRadius: '4px',
  ul: {
    listStyle: 'none',
    margin: '0px',
    padding: '0px',
  },
  li: {
    color: 'black',
  },
});

export default forwardRef(
  ({ show, ...rest }: Props, ref: Ref<HTMLDivElement>) => {
    return <div ref={ref} css={resultsWrapperCSS({ show })} {...rest} />;
  },
);
