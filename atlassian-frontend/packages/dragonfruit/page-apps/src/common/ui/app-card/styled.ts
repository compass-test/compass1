import styled from 'styled-components';

import { G500, heading, N200, skeleton } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const AppVendor = styled.div`
  color: ${N200};
  font-weight: 500;
  font-size: 14px;
  margin-left: ${gridSize()}px;
`;

export const AppName = styled.div`
  color: ${heading};
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.008em;
`;

export const BodyWrapper = styled.div`
  padding: ${gridSize()};
  display: flex;
  justify-content: space-between;
`;

export const AppLogo = styled.img`
  width: 70px;
  height: 70px;
  margin-right: ${gridSize() * 2}px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: ${gridSize() * 2}px;
`;

export const AppLogoPlaceholder = styled.div`
  width: 70px;
  height: 70px;
  margin-right: ${gridSize() * 2}px;
  background-color: ${skeleton()};
  border-radius: 4px;
  padding: ${gridSize() * 2}px;
`;

export const AppInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${gridSize()}px;
`;

export const CardGroup = styled.div`
  display: flex;
  align-items: flex-start;
  margin: ${gridSize() / 2}px;
`;

export const InstalledLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: ${G500};
`;

export const NotInstalledLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${N200};
`;
