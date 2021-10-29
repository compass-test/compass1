import styled from '@emotion/styled';

import { heading, N20 } from '@atlaskit/theme/colors';
import { fontSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

import { SpacingScale } from '../../../common/constants';

const { MEDIUM } = SpacingScale;

export const H1 = styled.h1`
  margin: 0;
  margin-bottom: ${MEDIUM}px;
  font-weight: 500;
  color: ${heading};
  font-size: ${headingSizes.h600.size / fontSize()}em;
`;

export const H1Skeleton = styled.div`
  margin-bottom: ${MEDIUM}px;
  height: ${headingSizes.h600.size / fontSize()}em;
  background-color: ${N20};
`;

export const H2 = styled.h2`
  position: relative;

  margin: 0;
  margin-bottom: ${MEDIUM}px;

  color: ${heading};
  font-size: ${headingSizes.h400.size / fontSize()}em;
  line-height: 1.6;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    content: '';

    display: block;
    height: 1.5px;

    background-color: ${heading};
  }
`;
