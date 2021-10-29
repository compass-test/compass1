import styled from 'styled-components';

import { Y300 } from '@atlaskit/theme/colors';
import { fontSize, gridSize } from '@atlaskit/theme/constants';
import { h600 } from '@atlaskit/theme/typography';

const height = (gridSize() * 3) / fontSize();

export const AppName = styled.div`
  ${h600()}
  // Override the margin-top of the typography
  margin-top: 0px;
`;

export const ConfigPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${gridSize() * 3}px;
`;

export const TitleGroup = styled.div`
  display: flex;
`;

export const ExtensionPointWrapper = styled.div`
  margin-top: ${gridSize() * 4}px;
`;

export const CustomExtensionPointWrapper = styled.div`
  margin-top: ${gridSize() * 4}px;
  height: 100%;
`;

export const UninstallDisabledDialogWrapper = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: ${gridSize()}px;
    color: ${Y300};
  }
`;

export const BreadcrumbsContainer = styled.div`
  margin-top: ${gridSize() * 5}px;
`;

export const PlainBreadcrumbsItem = styled.div`
  display: flex;
  flex-direction: row;
  height: ${height}em;
  line-height: ${height}em;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  max-width: 100%;
`;
