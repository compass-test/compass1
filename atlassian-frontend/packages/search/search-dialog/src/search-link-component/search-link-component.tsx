import React from 'react';
import styled, {
  StyledComponentClass,
  Interpolation,
  ThemedStyledProps,
} from 'styled-components';
import memoizeOne from 'memoize-one';

export interface LinkComponentProps {
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  className?: string;
  isKeyboardHighlighted?: boolean;
  children?: React.ReactNode;
}

export type LinkComponent<
  T extends LinkComponentProps = LinkComponentProps
> = React.ComponentType<T>;

export interface LinkProps<T> {
  linkComponent?: LinkComponent<T>;
}

export const Link = <T extends LinkComponentProps>({
  linkComponent,
  ...props
}: (React.AnchorHTMLAttributes<HTMLAnchorElement> & T) & LinkProps<T>) => {
  // Hack?
  const Component: any = linkComponent || 'a';
  return <Component {...props} />;
};

/** DEPRECATED - Use Link instead **/
export const createLinkComponentFactory = <T extends LinkComponentProps>(
  strings: TemplateStringsArray,
  ...interpolations: Interpolation<ThemedStyledProps<T, any>>[]
): ((
  linkComponent?: React.ComponentType<T>,
) => StyledComponentClass<any, any, any>) => {
  return memoizeOne(
    (
      linkComponent: React.ComponentType<T> | undefined,
    ): StyledComponentClass<any, any, any> => {
      if (!linkComponent) {
        // TODO QS-1163: remove `any` when we bump styled-components from 3 to 4 (again)
        return styled.a(strings, ...interpolations) as any;
      } else {
        // TODO QS-1163: remove `any` when we bump styled-components from 3 to 4 (again)
        return styled<T>(linkComponent)(strings, ...(interpolations as any));
      }
    },
  );
};
