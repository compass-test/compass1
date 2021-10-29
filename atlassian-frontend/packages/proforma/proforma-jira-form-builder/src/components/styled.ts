import styled from 'styled-components';

import { fontFamily, gridSize } from '@atlaskit/theme/constants';

export const FirstTabWrapper = styled.div`
  margin-left: 60px;
`;

export const FormTitleWrapper = styled.span`
  font-family: ${fontFamily()};
  font-size: 2em;
  margin: 30px 0 8px;
`;

export const FooterWrapper = styled.div`
  box-shadow: 0px -2px 0px rgba(9, 30, 66, 0.08);
  display: flex;
  flex: none;
  flex-direction: row;
  justify-content: flex-end;
  padding: 16px;
`;

export const JiraFormBuilderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  div[role='tablist'] {
    padding-top: ${gridSize() * 2}px;
  }
`;

export const SettingsTabColumn = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  padding: ${gridSize() * 2}px ${gridSize() * 4}px ${gridSize() * 2}px 0;
  width: 50%;
`;

export const SettingsTabColumns = styled.div`
  display: flex;
  flex: auto;
  overflow-y: auto;
`;

export const TabMessageWrapper = styled.div`
  padding-bottom: ${gridSize() / 2}px;
`;

export const TabPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 60px;
`;
