import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';

// Styles taken from team central - status-ui/src/ui/Navigation/ProjectButton/styles.ts
export const TeamButtonsContainer = styled.div<{
  isOpen: boolean;
  isTeamsPath: boolean;
}>`
  display: flex;
  position: relative;

  a {
    color: ${(props) =>
      props.isTeamsPath || props.isOpen ? colors.B400 : colors.N600};

    :hover {
      text-decoration: none;
    }
  }

  span {
    color: ${(props) =>
      props.isTeamsPath || props.isOpen ? colors.B400 : colors.N600};
  }

  &:hover a {
    color: ${colors.B400};
  }

  &:hover span {
    color: ${colors.B400};
  }

  #team-button {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    color: ${(props) => props.isOpen && colors.B400};
    background-color: ${(props) => props.isOpen && 'rgba(222, 235, 255, 0.5)'};
    box-shadow: ${(props) => props.isOpen && '0 0 0 2px transparent'};
  }

  #team-dropdown-button {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    padding: 0 6px;
    color: ${(props) => props.isOpen && colors.B400};
    background-color: ${(props) => props.isOpen && 'rgba(179, 212, 255, 0.5)'};
    box-shadow: ${(props) => props.isOpen && '0 0 0 2px transparent'};
  }

  #team-dropdown-button span {
    opacity: 1;
  }

  &:hover #team-dropdown-button {
    color: ${colors.B400};
    background-color: ${(props) => !props.isOpen && 'rgba(222, 235, 255, 0.5)'};
    box-shadow: 0 0 0 2px transparent;

    :hover {
      background-color: rgba(179, 212, 255, 0.5);
    }
  }

  &:hover #team-button {
    color: ${colors.B400};
    background-color: rgba(222, 235, 255, 0.5);
    box-shadow: 0 0 0 2px transparent;

    :hover {
      background-color: ${(props) =>
        !props.isOpen && 'rgba(179, 212, 255, 0.5)'};
    }
  }
`;

export const VerticalSeparator = styled.div`
  width: 1px;
  background-color: ${colors.N0};
`;

export const IsHighlightedBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 4px;
  right: 4px;
  height: 3px;
  background-color: ${colors.B400};
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
`;
