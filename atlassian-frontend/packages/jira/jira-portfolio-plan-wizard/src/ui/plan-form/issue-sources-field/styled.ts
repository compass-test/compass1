import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const AddAnotherContainer = styled.div`
  margin-left: -${gridSize() * 2}px;
`;

export const RemoveModalTitle = styled.span`
  /* Acknowledged css contamination workaround, JFE  https://product-fabric.atlassian.net/browse/DSP-2032 */
  /* 'jira-atlaskit-module/css/adg3-general-overrides.css' globally makes h1 span font-size: 29px */
  font-size: 20px;
`;
