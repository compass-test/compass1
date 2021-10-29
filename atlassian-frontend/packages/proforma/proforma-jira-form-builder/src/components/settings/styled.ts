import styled from 'styled-components';

import { N200 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const FlexDiv = styled.div`
  display: flex;
`;

export const IssueCreateTypesTableHeaderCell = styled.th`
  color: ${N200};
  font-weight: bold;
  font-size: 12px;
`;

export const IssueCreateTypesTableTypeLabelDiv = styled.div`
  margin-left: ${gridSize() / 2}px;
`;

export const IssueCreateTypesTableCell = styled.td`
  padding: ${gridSize()}px;
`;

export const SettingHeader = styled.h4`
  padding-bottom: ${gridSize()}px;
  margin-top: ${gridSize() / 2}px;
`;

export const SettingMessage = styled.p`
  margin: 0;
  padding-bottom: ${gridSize() * 2}px;
`;

export const SettingPickerWrapper = styled.div`
  padding-bottom: ${gridSize() * 2}px;
`;

export const SettingToggleDiv = styled.div`
  align-items: center;
  display: flex;
  padding-bottom: ${gridSize()}px;
`;

export const CreateTypesTable = styled.table`
  margin: 0 0 ${gridSize() * 2}px;
`;

export const LanguageDropdownWrapper = styled.div`
  margin-bottom: ${gridSize() * 2}px;
`;
