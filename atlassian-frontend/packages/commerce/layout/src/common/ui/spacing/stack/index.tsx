import css from '@emotion/css';
import styled from '@emotion/styled';

import { SpacingScale } from '../../../constants';
import { UIScaleExtendedIncrements } from '../../../types';

type StackProps = {
  size?: UIScaleExtendedIncrements;
  direction?: 'VERTICAL' | 'HORIZONTAL';
};

export const stackFactory = ({ size = 'MEDIUM' }: StackProps) => css`
  margin: 0 0 ${SpacingScale[size]}px 0;
`;

export const stackLayoutFactory = ({
  size = 'MEDIUM',
  direction = 'VERTICAL',
}: StackProps) => css`
  display: grid;
  ${direction === 'VERTICAL' &&
  css`
    grid-template-columns: 1fr;
  `}
  grid-auto-flow: ${direction === 'VERTICAL' ? 'row' : 'column'};
  gap: ${SpacingScale[size]}px;
`;

export const Stack = styled.div<StackProps>`
  ${(props) => stackFactory(props)}
`;

export const LargeStack = styled.div`
  ${stackFactory({ size: 'LARGE' })}
`;

export const SmallStack = styled.div`
  ${stackFactory({ size: 'SMALL' })}
`;

export const StackLayout = styled.div<StackProps>`
  ${(props) => stackLayoutFactory(props)}
`;

export const LargeStackLayout = styled.div`
  ${stackLayoutFactory({ size: 'LARGE' })}
`;

export const SmallStackLayout = styled.div`
  ${stackLayoutFactory({ size: 'SMALL' })}
`;
