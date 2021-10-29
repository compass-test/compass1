import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const Wrapper = styled.div`
  display: block;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  border-bottom: 2px solid ${colors.N40};
  padding-bottom: ${gridSize()}px;
  margin-bottom: ${gridSize() * 2}px;
  justify-content: space-between;
`;

export const Title = styled.div`
  > h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${colors.N900};
    font-size: 1em;
    font-weight: bold;
    word-break: break-word;
  }
`;

export const RightHeaderContent = styled.span`
  word-break: break-all;
`;

export const Description = styled.p`
  text-align: left;
  margin-bottom: ${gridSize()}px;
`;
