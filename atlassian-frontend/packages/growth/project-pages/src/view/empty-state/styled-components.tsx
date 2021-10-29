import React from 'react';
import styled from 'styled-components';
import Button, {
  CustomThemeButtonProps,
} from '@atlaskit/button/custom-theme-button';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';

export const PrimaryPanelContainer = styled.div`
  text-align: center;
  margin: ${gridSize() * 6}px auto 0;
  width: 520px;
`;

export const PrimaryPanelContainerWithSmallerMargin = styled.div`
  text-align: center;
  margin: ${gridSize() * 6}px auto 0;
  width: 520px;
`;

export const PrimaryPanelContainerWithLargerMargin = styled.div`
  text-align: center;
  margin: ${gridSize() * 10}px auto 0;
  width: 520px;
`;

export const PrimaryPanelButtonGroup = styled.div`
  margin: ${gridSize() * 2}px 0;
`;

export const PrimaryPanelHeading = styled.h3`
  margin-top: ${gridSize() * 3}px;
  margin-bottom: ${gridSize() * 1.5}px;
`;

export const PrimaryPanelBlurb = styled.p`
  margin: ${gridSize() * 2}px 90px;
`;

export const InfoPanelBlurb = styled.p`
  margin: ${gridSize() * 2}px 72px;
`;

// This is a workaround because React.memo does not play well with styled-components
function StyledComponentsButton(props: CustomThemeButtonProps) {
  return <Button {...props} />;
}

export const PrimaryPanelConfirmButton = styled(StyledComponentsButton)`
  margin-right: 8px;
`;
