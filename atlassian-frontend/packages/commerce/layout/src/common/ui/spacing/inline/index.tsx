import css from '@emotion/css';
import styled from '@emotion/styled';

import { SpacingScale } from '../../../constants';
import { UIScaleExtendedIncrements } from '../../../types';

type InlineProps = {
  size?: UIScaleExtendedIncrements;
};

export const inlineFactory = ({ size = 'MEDIUM' }: InlineProps) => css`
  margin: 0 ${SpacingScale[size]}px 0 0;
`;

export const inlineLayoutFactory = ({ size = 'MEDIUM' }: InlineProps) => css`
  display: flex;
  gap: ${SpacingScale[size]}px;
`;

export const Inline = styled.div<InlineProps>`
  ${(props) => inlineFactory(props)}
`;

export const LargeInline = styled.div`
  ${inlineFactory({ size: 'LARGE' })}
`;

export const SmallInline = styled.div`
  ${inlineFactory({ size: 'SMALL' })}
`;

export const InlineLayout = styled.div<InlineProps>`
  ${(props) => inlineLayoutFactory(props)}
`;

export const LargeInlineLayout = styled.div`
  ${inlineLayoutFactory({ size: 'LARGE' })}
`;

export const SmallInlineLayout = styled.div`
  ${inlineLayoutFactory({ size: 'SMALL' })}
`;
