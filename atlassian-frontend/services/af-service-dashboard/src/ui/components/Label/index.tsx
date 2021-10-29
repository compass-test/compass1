/** @jsx jsx */

import React from 'react';
import { jsx } from '@emotion/core';
import Lozenge, { ThemeAppearance } from '@atlaskit/lozenge';

import { marginRight, label } from './styles';

type LabelProps = {
  title: string;
  content: string;
  appearance: ThemeAppearance;
  isBold: boolean;
};

export const Label: React.FC<LabelProps> = ({
  title,
  content,
  appearance,
  isBold,
}) => (
  <div css={marginRight}>
    <p css={label}>{title}:</p>
    <Lozenge appearance={appearance} isBold={isBold} maxWidth={500}>
      {content}
    </Lozenge>
  </div>
);
