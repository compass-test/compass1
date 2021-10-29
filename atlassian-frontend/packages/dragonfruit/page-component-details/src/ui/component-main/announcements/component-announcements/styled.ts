import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const AnnouncementsTabContent = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: ${colors.N20};
  border-radius: 3px;
  padding: ${gridSize() * 2}px;
`;

export const AnnouncementsSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${gridSize() * 2}px;
`;

export const CreateAnnouncementButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${gridSize()}px;
  margin-bottom: ${gridSize() * 1.5}px;
  border: 2px dashed ${colors.N40};
  border-radius: ${gridSize() / 2}px;

  background-color: transparent;
  color: ${colors.N900};
  text-align: left;

  &:hover {
    cursor: pointer;
    background-color: ${colors.N30};
  }
`;

export const CreateButtonText = styled.div`
  color: ${colors.N500};
  margin-left: ${gridSize()}px;
`;

export const EmptyStateExampleList = styled.ul`
  text-align: left;
  width: 150px;
  margin-left: auto;
  margin-right: auto;
`;
