// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, gridSize } from '@atlaskit/theme';

export const TimelineContainer = styled.div`
  position: relative;
  background-color: ${colors.N10};
  &,
  & * {
    box-sizing: border-box;
  }

  &::before,
  &&::after {
    content: ' ';
    display: table;
  }
  &&::after {
    clear: both;
  }
`;

export const BodyHead = styled.div`
  float: left;
  width: 10%;
  min-height: ${gridSize() * 11.25}px;
  padding: 4px 0;
`;

export const BodyContent = styled.div`
  float: right;
  position: relative;
  min-height: ${gridSize() * 11.25}px;
  width: 90%;
  padding-bottom: 7px;
`;

export const RotationLabels = styled.ul`
  &,
  &:first-of-type {
    margin: 30px 0 0;
    border-top: 1px dashed ${colors.N40};
  }
  padding: 0;
  list-style: none;

  & > li {
    height: 30px;
    padding: 4px 5px 3px;
    font-size: 12px;
    line-height: 22px;
    border-bottom: 1px dashed ${colors.N40};
    margin-top: unset;
  }
`;

export const Marker = styled.div`
  height: 100%;
  width: 1px;
  background-color: ${colors.R400};
  position: absolute;
  top: 0;
`;
