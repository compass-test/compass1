// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, typography } from '@atlaskit/theme';

export const ChecklistInteractionManagerWrapper = styled.div`
  position: fixed;
  width: 400px;
  height: 400px;
  top: 10;
`;

export const CustomHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CustomHeaderButtonWrapper = styled.div`
  color: ${colors.N0};
  font-size: ${typography.headingSizes.h100.size}px;
  line-height: ${typography.headingSizes.h100.lineHeight}px;
  font-weight: 600;
  cursor: pointer;
`;

export const FooterWrapper = styled.div`
  position: sticky;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  width: 400px;
  text-align: center;
  background: ${colors.N20};
  padding-top: 15px;
  padding-bottom: 15px;
`;
