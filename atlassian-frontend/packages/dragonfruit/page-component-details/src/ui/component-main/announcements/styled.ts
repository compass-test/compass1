import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const Description = styled.div`
  margin-bottom: ${gridSize() * 4}px;
`;

export const TabsWrapper = styled.div`
  // Atlaskit's <Tabs> component has some built-in padding on the tabs and tab panel.
  // We want to get rid of this visual padding, but overriding the component's styles is tricky,
  // so we set a negative margin on the entire <Tabs> section instead.
  margin: 0 -${gridSize()}px;
`;

export const TabPanelContent = styled.div`
  margin-top: ${gridSize() * 2}px;
  width: 100%;
`;
