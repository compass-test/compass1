import { css } from '@emotion/core';
import { TooltipPrimitive } from '@atlaskit/tooltip';
import styled from '@emotion/styled';
import { SearchCSS } from '@atlaskit/atlassian-navigation';
import {
  collapsedSearchInputWidth,
  dialogWidth,
  inputFieldHeight,
  grid,
  dialogPageTakeoverWidth,
  atlassianNavigationHeight,
} from '../style-utils';
import { B200, N0, N70, N500, N900 } from '@atlaskit/theme/colors';

const expandedPlaceholderColor = '#B5BEC9'; // doesn't seem to map to an AK colour at the moment.

export interface SearchInputFieldProps {
  isExpanded: boolean;
}

interface IsExpandedProp {
  isExpanded: boolean;
}

export const MobileSearchIconWrapper = styled.span<IsExpandedProp>`
  display: none;
  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    display: ${(props) => (props.isExpanded ? 'none' : 'block')};
  }
`;

export const DesktopSearchIconWrapper = styled('span')<
  SearchCSS & IsExpandedProp
>`
  width: ${grid.multiple(2).px};
  height: ${grid.multiple(2).px};
  position: absolute;
  top: ${grid.px};
  left: ${grid.px};
  color: ${(props) => (props.isExpanded ? N900 : props.default.color)};

  :focus {
    box-shadow: 0 0 0 2px ${B200};
    border-radius: 100%;
    outline: none;
  }

  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    display: none;
  }
`;

export const ClearIconWrapper = styled('div')<SearchCSS>`
  width: ${grid.multiple(2).px};
  height: ${grid.multiple(2).px};
  position: absolute;
  bottom: ${grid.multiple(1.125).px};
  right: ${grid.multiple(1).px};
  color: ${N70};
  background-color: ${N0};

  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    display: none;
  }

  :hover {
    cursor: pointer;
    color: ${N500};
  }

  & > span > svg {
    vertical-align: unset;
  }
`;

export const ArrowIconWrapper = styled('div')<SearchCSS>`
  display: none;
  margin: 0 ${grid.px};
  height: ${grid.multiple(4).px};
  padding-bottom: ${grid.multiple(0.25).px};

  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    display: block;
  }

  :hover {
    border-radius: 100%;
    background-color: ${(props) => props.hover.backgroundColor};
    color: ${(props) => props.hover.color};
  }
`;

export const SearchInputContainer = styled('div')<SearchCSS & IsExpandedProp>(
  css`
    position: relative;
    max-width: 100%;
    @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
      width: 100%;
    }
  `,
  (props) => {
    const styles = `
      width: ${props.isExpanded ? dialogWidth : collapsedSearchInputWidth};
    `;
    // todo - this should be another class
    if (props.isExpanded) {
      return css`
        ${styles}
        @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
          width: 100%;
          height: ${atlassianNavigationHeight};
          background-color: ${props.default.backgroundColor};
          display: flex;
          align-items: center;
          max-width: initial;
        }
      `;
    }
    return styles;
  },
);

export const SearchInputField = styled('input')<SearchCSS & IsExpandedProp>(
  css`
    height: ${inputFieldHeight.px};
    width: 100%;
    padding: 0 12px 2px 30px;
    box-sizing: border-box;
    outline: none;
    border-radius: 5px;
    font-size: 14px;
    line-height: 20px;
  `,
  (props) => {
    const styles = `
      border: 2px solid ${
        props.isExpanded ? props.focus.borderColor : props.default.borderColor
      };
      box-shadow: ${
        props.isExpanded
          ? `-12px 0 24px 0 ${props.default.backgroundColor}`
          : 'none'
      };
      background-color: ${
        props.isExpanded
          ? props.focus.backgroundColor
          : props.default.backgroundColor
      };
      color: ${props.isExpanded ? props.focus.color : props.default.color};
      ::placeholder,
      ::-webkit-input-placeholder,
      :-ms-input-placeholder {
        color: ${
          props.isExpanded ? expandedPlaceholderColor : props.default.color
        };
      }
    `;

    // Do not display the input when collapsed, but keep it in the dom so it will focus correctly when opened
    if (!props.isExpanded) {
      return css`
        ${styles}
        @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
          display: none;
        }
      `;
    } else {
      return css`
        ${styles}
        @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
          padding: 0 ${grid.multiple(1.5).px} ${grid.multiple(0.25).px};
          margin: 0 ${grid.multiple(3).px} 0 0;
        }
      `;
    }
  },
);

export const HiddenTooltip = styled(TooltipPrimitive)`
  display: none;
`;

export const SSRsearchInputField = styled('input')`
  height: ${inputFieldHeight.px};
  width: 100%;
  padding: 0 12px 2px 30px;
  box-sizing: border-box;
  outline: none;
  border-radius: 5px;
  font-size: 14px;
  line-height: 20px;

  border: 2px solid rgb(223, 225, 230);
  box-shadow: none;
  background-color: rgb(255, 255, 255);
  color: rgb(9, 30, 66);

  ::focus {
    padding: 0 ${grid.multiple(1.5).px} ${grid.multiple(0.25).px};
    margin: 0 ${grid.multiple(3).px} 0 0;
  }

  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    display: none;
  }
`;

export const SSRsearchInputWrapper = styled('div')`
  position: relative;
  @media screen and (min-width: 781px) {
    min-width: 200px;
  }
  height: 32px;
`;

export const SSRformContainer = styled('div')`
  position: relative;
`;

export const SSRsearchInputContainer = styled('div')`
  position: relative;
  max-width: 100%;
  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    width: 100%;
  }
  width: ${collapsedSearchInputWidth};
`;

export const SSRdesktopSearchIconWrapper = styled('span')`
  width: ${grid.multiple(2).px};
  height: ${grid.multiple(2).px};
  position: absolute;
  top: ${grid.px};
  left: ${grid.px};
  color: rgb(107, 119, 140);

  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    display: none;
  }
`;

export const SSRmobileSearchIconWrapper = styled('span')`
  display: none;
  padding: ${grid.multiple(0.5).px};
  padding-right: 2px;
  color: rgb(52, 69, 99);

  @media screen and (max-width: ${dialogPageTakeoverWidth}px) {
    display: flex;
  }
`;
