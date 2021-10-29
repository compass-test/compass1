import React, { forwardRef, FunctionComponent } from 'react';
import styled from 'styled-components';
import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';

export const MarginPaddingInner = styled.p<{
  hasMargin: boolean;
  hasPadding: boolean;
}>`
  background-color: #efefef;
  margin: ${({ hasMargin }) => (hasMargin ? '40' : '0')}px;
  padding: ${({ hasPadding }) => (hasPadding ? '40' : '16')}px;
`;

export const FlexWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5244aa;
`;

export const ScrollWrapper = styled.div`
  height: 80vh;
  width: 50vw;
  overflow-y: scroll;
`;

export const ScrollHeader = styled.div`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin: 24px;
`;

export const ScrollContent = styled.div`
  width: 50vw;
  height: 300vh;
  background-color: #5244aa;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

export const CustomSpotlightComponent = forwardRef<HTMLDivElement>(
  (props, ref) => (
    <div
      style={{
        backgroundColor: 'hotpink',
        padding: '2rem',
        borderRadius: '0.25rem',
        color: 'white',
      }}
      {...props}
      ref={ref}
    >
      This is a very custom spotlight!
    </div>
  ),
);

export const CustomTarget: FunctionComponent<{}> = ({ children }) => (
  <div
    role="button"
    tabIndex={0}
    style={{
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderRadius: '3px',
      width: '32px',
      height: '32px',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    <AppSwitcherIcon label="switcher" primaryColor="white" />
  </div>
);
