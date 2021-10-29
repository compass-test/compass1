import styled from '@emotion/styled';

import { screenSizes } from './constants';

export const ContentXS = styled.div`
  display: none;

  @media (max-width: ${screenSizes.xs}px) {
    display: inline;
  }
`;

export const ContentSM = styled.div`
  display: none;

  @media (min-width: ${screenSizes.xs +
    1}px) and (max-width: ${screenSizes.sm}px) {
    display: inline;
  }
`;

export const ContentMD = styled.div`
  display: none;

  @media (min-width: ${screenSizes.sm +
    1}px) and (max-width: ${screenSizes.md}px) {
    display: inline;
  }
`;

export const ContentLG = styled.div`
  display: none;

  @media (min-width: ${screenSizes.md +
    1}px) and (max-width: ${screenSizes.lg}px) {
    display: inline;
  }
`;

export const ContentXL = styled.div`
  display: none;

  @media (min-width: ${screenSizes.lg + 1}px) {
    display: inline;
  }
`;
