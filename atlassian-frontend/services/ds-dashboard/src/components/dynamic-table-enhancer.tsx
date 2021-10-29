import React from 'react';
import { css } from '@emotion/core';

import { N0, N40 } from '@atlaskit/theme/colors';
import { e200 } from '@atlaskit/theme/elevation';
import { gridSize as getGridSize } from '@atlaskit/theme/constants';

import { HORIZONTAL_GLOBAL_NAV_HEIGHT } from '@atlaskit/atlassian-navigation';

const gridSize = getGridSize();

const fixedHeaderBaseStyles = css({
  table: { marginTop: 1.5 * gridSize },
  thead: {
    background: N0,
  },
  'tbody tr:not(:last-of-type)': {
    borderBottom: `1px solid ${N40}`,
  },
});

const borderWidth = 2;
const topPadding = gridSize * 2;

const e200Value = e200().slice('box-shadow:'.length, -1);

const fixedHeaderStickyStyles = css({
  thead: css({
    position: 'sticky',
    top: `calc(var(--topNavigationHeight) + ${topPadding}px)`,
    zIndex: 1,
    '::before': {
      content: '""',
      height: `calc(100% + ${topPadding}px)`,
      width: '100%',
      position: 'absolute',
      top: -topPadding,
      left: 0,
      background: 'white',
      clipPath: `inset(0px 0px -${topPadding}px 0px)`,
      boxShadow: `0 ${borderWidth}px ${N40}, ${e200Value}`,
    },
  }),
});

const getAlignColStyles = (
  alignCol: Record<number, 'left' | 'right' | 'center'>,
) =>
  Object.entries(alignCol).map(([colNum, alignment]) =>
    css({
      [`th:nth-of-type(${Number(colNum) + 1})`]: {
        textAlign: alignment,
        paddingRight: gridSize * 2,
      },
      [`tr td:nth-of-type(${Number(colNum) + 1})`]: {
        textAlign: alignment,
      },
    }),
  );

type DynamicTableEnhancerProps = {
  alignCol?: Record<number, 'left' | 'right' | 'center'>;
};

const DynamicTableEnhancer: React.FC<DynamicTableEnhancerProps> = ({
  children,
  alignCol = {},
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isFullyVisible, setIsFullyVisible] = React.useState(true);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    const obs = new IntersectionObserver(
      ([{ isIntersecting }]) => setIsFullyVisible(isIntersecting),
      {
        rootMargin: `-${
          HORIZONTAL_GLOBAL_NAV_HEIGHT + topPadding
        }px 0px 0px 0px`,
        threshold: 1,
      },
    );
    obs.observe(ref.current);
    return () => {
      obs.disconnect();
    };
  }, [ref]);

  return (
    <div
      css={[
        fixedHeaderBaseStyles,
        !isFullyVisible && fixedHeaderStickyStyles,
        ...getAlignColStyles(alignCol),
      ]}
    >
      <div ref={ref} />
      {children}
    </div>
  );
};

export default DynamicTableEnhancer;
