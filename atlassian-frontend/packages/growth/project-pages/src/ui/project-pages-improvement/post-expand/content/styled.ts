import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme/constants';

// to push the footer to the bottom of the page, we make the min-height the full viewport minus the height of the top jira nav, margin, and the footer
export const PostExpandContent = styled.div`
  min-height: calc(100vh - 124px);
`;

export const PostExpandFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${gridSize()}px 0;
`;
