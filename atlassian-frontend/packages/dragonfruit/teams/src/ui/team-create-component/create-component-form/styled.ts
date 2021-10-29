import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme/constants';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: ${gridSize() * 2}px;
  width: 100%;
`;

export const ComponentTypeFieldWrapper = styled.div`
  width: ${gridSize() * 24}px;
`;

export const ComponentNameFieldWrapper = styled.div`
  width: ${gridSize() * 41}px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-grow: 1;
`;

export const ErrorMessageWrapper = styled.div`
  position: absolute;
`;
