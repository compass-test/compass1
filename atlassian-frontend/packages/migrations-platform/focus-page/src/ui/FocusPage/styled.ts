import styled, { css } from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, gridSize } from '@atlaskit/theme';
import { h700 } from '@atlaskit/theme/typography';

const spacing = gridSize() * 2;
const bannerHeight = 52;
const maxPageWidth = 1400;

const contentWidth = {
  small: 380,
  medium: 600,
  large: 900,
  xlarge: 1200,
};

const centeredColumn = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Basic styles for banner, viewport and footer
const sectionMixin = css`
  ${centeredColumn}
  box-sizing: border-box;
  background-color: ${colors.N0};
  width: 100%;
  padding: ${spacing * 2}px;
`;

export const Wrapper = styled.div`
  z-index: 6;
  box-sizing: border-box;
  width: 100%;
  height: ${bannerHeight}px;
  line-height: 24px;

  /* Override native and atlaskit buttons and links styles */
  a,
  button * {
    text-decoration: underline;
  }
`;

export const ContentWidth = {
  small: styled.div`
    width: ${contentWidth.small}px;
  `,
  medium: styled.div`
    width: ${contentWidth.medium}px;
  `,
  large: styled.div`
    width: ${contentWidth.large}px;
  `,
  xlarge: styled.div`
    width: 100%;
    min-width: ${contentWidth.large}px;
    max-width: ${contentWidth.xlarge}px;
  `,
};

export const Screen = styled.div`
  ${centeredColumn}
  background-color: ${colors.N0};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Viewport = styled.section`
  ${sectionMixin}
  z-index: 5;
  overflow-y: auto;
  flex: 1;
`;

export const Banner = styled.div`
  z-index: 6;
  box-sizing: border-box;
  width: 100%;
  height: ${bannerHeight}px;
  line-height: 24px;

  /* Override native and atlaskit buttons and links styles */
  a,
  button * {
    text-decoration: underline;
  }
`;

export const ButtonsBar = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: ${contentWidth.large}px;
  max-width: ${maxPageWidth}px;
  display: flex;
  justify-content: space-between;
  margin-top: -${spacing / 2}px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > a,
  button {
    margin-left: ${spacing}px;
  }
`;
export const Progress = styled.nav`
  margin-top: ${spacing}px;
  margin-bottom: ${spacing * 2.5}px;
  &&& ul {
    margin-top: 0px;
  }
`;

export const TitleContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  ${h700()}
  margin-top: ${spacing / 2}px;
  margin-bottom: ${spacing}px;
`;

export const SubTitle = styled.p`
  box-sizing: border-box;
  display: block;
  margin: 0;
  margin-bottom: ${gridSize() * 3}px;
  max-width: ${contentWidth.medium}px;
`;

export const Footer = styled.footer`
  ${sectionMixin}
  z-index: 6;
  box-shadow: 0 13px 20px 0px #000;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: ${contentWidth.medium}px;
  }
`;
