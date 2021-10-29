import styled from '@emotion/styled';

import { B300, N20, N200, N40, N800 } from '@atlaskit/theme/colors';
import { focusRing } from '@atlaskit/theme/constants';

export const AvatarContainer = styled.div`
  margin-right: 8px;
`;

export const ItemContainer = styled.article`
  position: relative;
  margin-left: -8px;
  margin-right: -8px;
  margin-bottom: 4px;
  padding: 8px;

  &:hover {
    background-color: ${N20};
  }

  &:hover .notification-list__unread-indicator-wrapper {
    background-color: ${N40};
  }

  border-radius: 3px;
  ${focusRing()}
`;

export const MainAction = styled.a`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

export const NotificationContainer = styled.div`
  display: flex;
  width: 100%;
  z-index: 1;
  & * {
    pointer-events: none;
  }
  & a {
    pointer-events: all;
    z-index: 1;
  }
`;

export const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const SummaryText = styled.h3`
  display: inline;
  color: ${N800};
  font-size: 14px;
  line-height: 20px;
`;

export const EntityText = styled.a`
  margin-top: 0;
  color: ${N800};
  font-size: 14px;
  width: fit-content;

  &:hover {
    color: ${B300};
  }
`;

export const PathText = styled.p`
  font-size: 11px;
  line-height: 14px;
  color: ${N200};
  margin-top: 0;
`;

export const EntityIcon = styled.img`
  float: left;
  height: 12px;
  width: 12px;
  margin-top: 4px;
  margin-right: 4px;
`;

export const PathWrapper = styled.a`
  display: flex;
  align-items: center;
  height: 20px;
  width: fit-content;

  :hover {
    color: ${N200};
  }
`;

export const Timestamp = styled.span`
  font-size: 14px;
  color: ${N200};
  font-weight: 400;
  white-space: nowrap;
  margin-left: 4px;
`;

export const EnableMouseEventsProfileWrapper = styled.div`
  position: relative;
  & * {
    pointer-events: all;
    z-index: 1;
  }
`;

export const EnableMouseEventsDocumentWrapper = styled.div`
  position: relative;
  width: calc(100% - 52px);
  & * {
    pointer-events: all;
    z-index: 1;
  }
`;

export const DocumentWrapper = styled.div`
  display: flex;
`;

export const DocumentLeftSpacing = styled.div`
  width: 52px;
  height: 100%;
`;
