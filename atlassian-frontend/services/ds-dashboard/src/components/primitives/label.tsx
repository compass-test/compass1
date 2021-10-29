import React from 'react';

import { fontFamily, gridSize } from '@atlaskit/theme/constants';
import { h200 } from '@atlaskit/theme/typography';
import { css } from '@emotion/core';

const labelStyles = css([
  h200(),
  {
    display: 'inline-block',
    fontFamily: fontFamily(),
    marginBottom: `${gridSize() * 0.5}px`,
    marginTop: 0,
  },
]);

const labelFullWidthStyles = css({
  display: 'flex',
});

type LabelProps = {
  as?: 'span' | 'label';
  isFullWidth?: boolean;
};

const Label: React.FC<LabelProps> = ({
  children,
  as = 'span',
  isFullWidth = true,
}) => {
  const Component = as;
  return (
    <Component css={[labelStyles, isFullWidth && labelFullWidthStyles]}>
      {children}
    </Component>
  );
};

export default Label;
