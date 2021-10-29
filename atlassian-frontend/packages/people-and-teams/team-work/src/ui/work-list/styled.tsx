import styled, { css } from 'styled-components';

import { N10, N90 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

export const LinkItemWrapper = styled.div`
  a:hover {
    background: ${N10};
  }
`;

export const WorkListItemTooltip = css`
  display: flex;
  align-items: center;
`;

export const WorkListItemAfterWrapper = styled.div`
  ${WorkListItemTooltip}
  margin-right: -${gridSize() * 0.75}px;

  > * {
    margin-left: ${gridSize()}px;
  }
`;

export const WorkListItemBeforeWrapper = styled.div`
  > * {
    ${WorkListItemTooltip}
  }
`;

export const HeaderLink = styled.div`
  margin-left: 22px;
`;

export const FooterLink = styled.div`
  font-size: 11px;
  margin-left: 10px;
  margin-top: 16px;
  display: flex;
  color: ${N90};
`;

export const IssueDescription = styled.span`
  font-size: ${headingSizes.h100.size}px;
`;

export const IssueTypeIcon = styled.img`
  width: ${gridSize() * 4.5}px;
  height: ${gridSize() * 4.5}px;
  margin-left: -${gridSize()}px;
`;

export const AnchorWrapper = styled.div`
  font-size: ${headingSizes.h100.size}px;
  margin: ${gridSize() * 1.5}px ${gridSize() * 2}px ${gridSize()}px;
`;

// TODO: Move Spinner related functions to ptc-common package once it
//       moves to atlassian-frontend repo.

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
`;
