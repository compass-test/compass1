import styled, { StyledComponentClass } from 'styled-components';

import {
  DropdownItemCheckbox,
  WithToggleInteractionProps,
} from '@atlaskit/dropdown-menu';

export type ProjectDropdownItemType = StyledComponentClass<
  WithToggleInteractionProps,
  any,
  Omit<WithToggleInteractionProps, 'theme'> & {
    theme?: any;
  }
>;

export const ProjectDropdownItem: ProjectDropdownItemType = styled(
  DropdownItemCheckbox,
)`
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    margin-right: 0.5rem;
  }

  span {
    display: flex;
    align-content: center;
    line-height: 1.3rem;
  }
`;
