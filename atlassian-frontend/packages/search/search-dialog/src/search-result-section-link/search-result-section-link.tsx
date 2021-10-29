import React from 'react';
import { ButtonProps } from '@atlaskit/button';
import { SectionLink } from './search-result-section-link.styled';

export interface Props extends ButtonProps {
  /**
   * This will replace all links with the given component. This will be used to ensure that results provided will be properly SPA transitioned.
   * Do not use this for styling.
   */
  linkComponent?: React.ElementType<any>;
  /**
   * An HTML id that will be set on the underlying HTML element.
   */
  id?: string;
}

export const SearchResultSectionLink: React.FunctionComponent<Props> = ({
  children,
  linkComponent,
  ...rest
}) => (
  /* component must either be `undefined` or an component. A null or false will throw an error */
  <SectionLink
    appearance="link"
    {...rest}
    component={linkComponent || undefined}
  >
    {children}
  </SectionLink>
);
