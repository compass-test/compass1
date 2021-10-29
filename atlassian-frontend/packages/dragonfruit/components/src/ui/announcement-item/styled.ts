import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h500 } from '@atlaskit/theme/typography';

export const AnnouncementContainer = styled.div`
  background-color: ${colors.N0};
  padding: ${gridSize() * 3}px;
  border-radius: 3px;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
`;

export const TargetDate = styled.div`
  margin-top: ${gridSize()}px;
  font-size: 12px;
  font-weight: 500;
  color: ${colors.N200};
`;

export const AcknowledgementActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AnnouncementDetails = styled.div``;

export const Title = styled.div`
  ${h500()}
  margin-top: 0;
  margin-bottom: ${gridSize()}px;
  word-break: break-word;
`;

export const SourceComponent = styled.div``;

export const SourceComponentContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: ${gridSize() * 3}px;

  a:hover {
    text-decoration-color: ${colors.N500};
  }
`;

export const ComponentTypeIconContainer = styled.div`
  display: flex;
  align-items: center;
  height: ${gridSize() * 3}px;
  margin-right: ${gridSize()}px;
`;

export const ComponentNameContainer = styled.div`
  color: ${colors.N500};
`;

export const Description = styled.div`
  margin-top: ${gridSize()}px;
  color: ${colors.N500};
  word-break: break-word;
  white-space: pre-wrap;
`;

export const ActionsMenu = styled.div``;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${gridSize() * 3}px;
`;
