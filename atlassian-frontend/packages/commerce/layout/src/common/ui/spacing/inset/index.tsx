import css from '@emotion/css';
import styled from '@emotion/styled';

import { SpacingScale } from '../../../constants';
import { UIScaleExtendedIncrements } from '../../../types';

export type InsetType = 'SQUARE' | 'STRETCH' | 'SQUISH';

export type InsetProps = {
  type?: InsetType;
  size?: UIScaleExtendedIncrements;
};

type InsetModes = {
  [key in InsetType]: string;
};

type InsetSecondarySizeMap = {
  [key in UIScaleExtendedIncrements]: UIScaleExtendedIncrements;
};

export const insetFactory = ({
  type = 'SQUARE',
  size = 'MEDIUM',
}: InsetProps) => {
  const secondarySize: InsetSecondarySizeMap = {
    SMALLEST: 'SMALLEST',
    SMALL: 'SMALLEST',
    MEDIUM: 'SMALL',
    LARGE: 'MEDIUM',
    XLARGE: 'LARGE',
    XXLARGE: 'XLARGE',
    LARGEST: 'XXLARGE',
  };

  const insetMap: InsetModes = {
    SQUARE: `${SpacingScale[size]}px`,
    SQUISH: `${SpacingScale[secondarySize[size]]}px ${SpacingScale[size]}px`,
    STRETCH: `${SpacingScale[size]}px ${SpacingScale[secondarySize[size]]}px`,
  };

  return css`
    padding: ${insetMap[type]};
  `;
};

export const Inset = styled.div<InsetProps>`
  ${(props) => insetFactory(props)}
`;

export const LargeInset = styled.div`
  ${insetFactory({ size: 'LARGE' })}
`;

export const SmallInset = styled.div`
  ${insetFactory({ size: 'SMALL' })}
`;
