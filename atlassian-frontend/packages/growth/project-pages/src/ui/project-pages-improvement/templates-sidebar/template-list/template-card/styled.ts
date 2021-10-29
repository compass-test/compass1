import styled from 'styled-components';
import { B50 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

// some of this css is sourced from TemplateList.tsx in confluence-frontend for consistency
export const Title = styled.div`
  margin-top: -4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const PrimaryTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${gridSize() / 2}px;
`;

export const Description = styled.div`
  margin-top: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

interface CardWrapperProps {
  isActive?: boolean;
}

export const CardWrapper = styled.div<CardWrapperProps>`
  position: relative;
  margin-bottom: ${gridSize()}px;
  & > button {
    padding: 12px;
    background-color: ${(props) => (props.isActive ? B50 : 'initial')};
    &:focus {
      box-shadow: none; /* legacy batch.css in JFE ends up adding additional box shadow around this, which we don't want */
    }
  }
`;

interface BlanketProps {
  hasTooltip?: boolean;
}

export const Blanket = styled.div<BlanketProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 20;
  background-color: #fff;
  opacity: 0.5;
  cursor: ${(props) => (props.hasTooltip ? 'pointer' : 'auto')};
`;
