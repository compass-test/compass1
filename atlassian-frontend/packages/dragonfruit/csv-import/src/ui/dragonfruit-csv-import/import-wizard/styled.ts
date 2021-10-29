import styled from 'styled-components';

// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  text-align: center;
  margin-top: ${gridSize() * 6}px;
`;
