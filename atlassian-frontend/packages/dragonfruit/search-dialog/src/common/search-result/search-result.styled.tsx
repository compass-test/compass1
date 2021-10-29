import styled from '@emotion/styled';
import {
  grid,
  primaryTextColour,
  visitedLinkColor,
  itemHighlightColor,
  itemLinkSecondaryColor,
  dialogPageTakeoverWidth,
  nowrapEllipsis,
} from '../style-utils';
import { Link, LinkComponentProps } from '@atlassian/search-dialog';

interface ResultLinkProps {
  isCollapsed?: boolean;
  isKeyboardHighlighted?: boolean;
}

export const ResultStyledDiv = styled.div`
  display: block;
  min-width: 0;
`;

export const ResultLink = styled(Link)<LinkComponentProps & ResultLinkProps>`
  display: flex;
  height: ${(props) =>
    props.isCollapsed ? grid.multiple(5).px : grid.multiple(4).px};
  align-items: center;
  flex-flow: row nowrap;
  position: relative;

  background-color: ${(props) =>
    props.isKeyboardHighlighted ? itemHighlightColor : 'transparent'};
  color: ${primaryTextColour};
  text-decoration: none;

  padding: 0 ${grid.twice().px};

  &:hover {
    background-color: ${itemHighlightColor};
    color: ${primaryTextColour};
    text-decoration: none;
  }

  &:focus {
    outline-offset: -2px;
  }

  &:visited {
    color: ${visitedLinkColor};
  }
`;

export const ReturnIconContainer = styled.div<{ isCollapsed?: boolean }>`
  position: absolute;
  border-radius: 3px;
  margin: ${grid.half().px};
  width: ${grid.multiple(3).px};
  height: ${grid.twice().px};
  right: ${grid.half().px};
  top: ${(props) => (props && props.isCollapsed ? grid.px : grid.half().px)};
`;

export const IconContainer = styled.div`
  width: ${grid.multiple(3).px};
  margin-right: ${grid.multiple(1).px};
  flex: 0 0 ${grid.twice().px};
  line-height: ${grid.twice().px};
  display: flex;
  align-items: center;
`;

export const containerDetailWidth = '450px';

export const ResultTitleContainer = styled.div<{
  isCollapsed?: boolean;
  containerDetail: string | null;
}>`
  ${nowrapEllipsis}

  width: ${(props) =>
    props.isCollapsed ? grid.multiple(52).px : grid.multiple(47).px};
  max-width: ${grid.multiple(60).px};
  line-height: ${(props) => (props.containerDetail !== null ? '16px' : '32px')};
  height: 32px;
  flex: 1 0 auto;
  display: inline-block;
  margin: 0px;
  padding: 0px;

  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    width: 100%;
  }
`;

export const ResultLabel = styled.span`
  ${nowrapEllipsis}

  color: #5E6C84;
  font-size: 14px;
  line-height: 16px;
  margin-right: ${grid.px};
`;

export const ResultDetail = styled.div`
  ${nowrapEllipsis}
  margin-left: ${grid.multiple(3).px};
  font-size: 11px;
  line-height: 16px;
  color: ${itemLinkSecondaryColor};
  width: ${grid.multiple(19).px};
`;

export const ResultDetailOwner = styled.div`
  ${nowrapEllipsis}
  margin-left: auto;
  font-size: 11px;
  line-height: 16px;
  color: ${itemLinkSecondaryColor};
  width: ${grid.multiple(19).px};
`;

export const CollapsedResultDetailDefault = styled.div`
  ${nowrapEllipsis}
  margin: 0px;
  padding: 0px;
  font-size: 11px;
  line-height: 16px;
  height: 16px;
  color: ${itemLinkSecondaryColor};

  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    max-width: initial;
  }
`;

export const CollapsedResultDetailOwner = styled.div`
  ${nowrapEllipsis}
  margin: 0px;
  margin-left: auto;
  padding: 0px;

  font-size: 11px;
  line-height: 32px;
  height: 32px;
  color: ${itemLinkSecondaryColor};

  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    max-width: initial;
  }
`;

export const CollapsedResultDetailWrapper = styled.div`
  display: inline-block;
`;

export const DetailsSeparator = styled.div`
  font-size: 11px;
  line-height: 14px;
  color: ${itemLinkSecondaryColor};
  padding: 0 ${grid.px};
`;
