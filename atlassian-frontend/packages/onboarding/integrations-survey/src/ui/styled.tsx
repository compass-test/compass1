import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

const gridSizeVal = gridSize();

export const IntegrationSurveyContainer = styled.div`
  max-width: 470px;
`;

export const IntegrationPickerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

export const IntegrationPickerFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 ${gridSizeVal}px ${gridSizeVal}px 0px;
`;

export const CheckboxContainer = styled.div`
  margin-top: ${gridSizeVal * 2}px;
  margin-bottom: ${gridSizeVal * 1}px;
`;

export const ButtonsFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${gridSizeVal * 4}px;
`;
