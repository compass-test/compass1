import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';
import { themed } from '@atlaskit/theme/components';

const disabledPrimaryTextColor = themed({
  light: colors.N70,
  dark: colors.DN70,
});

const errorTextColor = themed({
  light: colors.R200,
  dark: colors.R50,
});

export const Container = styled.div``;

export const List = styled.ul`
  padding: 4px;
  padding-left: 0;
`;

export const Row = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
`;

export const AccountMember = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: blue;
`;

export const AvatarContainer = styled.span`
  padding-right: 8px;
  padding-left: 8px;
`;

export const Role = styled.span`
  padding-right: 8px;
`;

export const Name = styled.a``;

export const NoResultsContainer = styled.span`
  color: ${disabledPrimaryTextColor};
  font-style: italics;
`;

export const ErrorContainer = styled.span`
  color: ${errorTextColor};
`;

/**
 * Loading
 */

export const LoadingContainer = styled.div`
  padding: 8px;
  height: 100%;
`;

type LoadingRectangleProps = {
  contentWidth?: string;
  contentHeight?: string;
  marginTop?: string;
};

const shimmer = keyframes`
    0% {
        background-position: -300px 0;
    }
    100% {
        background-position: 1000px 0;
    }
`;

export const LoadingRectangle = styled.div<LoadingRectangleProps>`
  position: relative;
  height: ${(props) => (props.contentHeight ? props.contentHeight : '1.5rem')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '4px')};
  width: ${(props) => (props.contentWidth ? props.contentWidth : '100%')};
  border-radius: 2px;
  animation-duration: 1.2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${shimmer};
  animation-timing-function: linear;
  background-color: ${colors.N30};
  background-image: linear-gradient(
    to right,
    ${colors.N30} 10%,
    ${colors.N40} 20%,
    ${colors.N30} 30%
  );
  background-repeat: no-repeat;
`;
