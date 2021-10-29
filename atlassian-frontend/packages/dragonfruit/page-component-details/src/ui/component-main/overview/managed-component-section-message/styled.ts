import styled from 'styled-components';

import { fontSize, gridSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

export const ButtonGroup = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: ${gridSize()}px;
  }
`;

// Styles below are adapted direclty from atlaskit/section-message
// The component does not allow for style overrides so we had copy
// the needed styles to get the desired behavior.
// https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/design-system/section-message/src/section-message.tsx
export const Title = styled.div`
  font-size: ${headingSizes.h500.size / fontSize()}em;
  font-weight: 600;
  padding-bottom: ${gridSize()}px;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;
`;

export const ContainerStyles = styled.section`
  display: 'flex';
  margin-top: ${gridSize() * 2}px;
  padding: ${gridSize() * 2}px;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 3px;
  flex-direction: row;
  align-items: flex-start;
`;

export const ContentContainerStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
`;

export const ContentDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: ${gridSize() * 2}px;
`;
