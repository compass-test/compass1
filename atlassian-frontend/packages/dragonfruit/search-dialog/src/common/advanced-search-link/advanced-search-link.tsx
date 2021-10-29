import React, { FunctionComponent } from 'react';
import { LinkComponent } from '@atlassian/search-dialog';
import { StyledAdvancedSearch } from './advanced-search-link.styled';

export interface Props {
  href: string;
  linkComponent?: LinkComponent;
  isKeyboardHighlighted: boolean;
  onClick?: (e: React.MouseEvent | KeyboardEvent) => any;
}

export const AdvancedSearchLink: FunctionComponent<Props> = ({
  href,
  linkComponent,
  ...rest
}) => (
  <StyledAdvancedSearch
    linkComponent={linkComponent}
    data-test-id="search-dialog-advanced-search-link"
    href={href}
    {...rest}
  />
);
