import styled from '@emotion/styled';

import { SpacingScale } from '../../common/constants';
import { stackFactory } from '../../common/ui/spacing/stack';

const { MEDIUM } = SpacingScale;

export const Gap = styled.div`
  ${stackFactory({ size: 'XLARGE' })}
`;

export const Section = styled.div`
  ${stackFactory({ size: 'LARGE' })}
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  & > * {
    margin-left: ${MEDIUM}px;
  }
`;
