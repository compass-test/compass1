import styled from '@emotion/styled';

import { N200 } from '@atlaskit/theme/colors';

export const NotificationFeed = styled.section`
  width: 100%;
  margin-top: 18px;
`;

export const GroupHeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  min-height: 17px; // Prevents vertical shift when showing 'Mark all as read'
`;

export const SectionWrapper = styled.section`
  margin-bottom: 6px;
`;

export const TimeGroupHeading = styled.h2`
  font-size: 12px;
  color: ${N200};
  font-weight: 600;
  text-transform: uppercase;
`;

export const ButtonContainer = styled.span`
  font-size: 12px;
`;

export const BlankSkeletonPlaceholder = styled.div`
  width: 100%;
  height: 150px;
`;
