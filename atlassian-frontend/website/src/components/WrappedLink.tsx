import { Link as BaseLink } from 'react-router-dom';
import { LocationDescriptor } from 'history';
import React from 'react';
import { getRedirectURL } from '../utils/redirects';
import { loadUrl } from '../utils/url';

export interface LinkProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  to: string | LocationDescriptor;
  className?: string;
  replace?: boolean;
  style?: {};
  isSelected?: boolean;
  children?: React.ReactNode;
}

const Link = React.forwardRef<HTMLElement, LinkProps>(
  ({ onClick, className, to, children, ...props }, ref) => (
    <BaseLink
      onClick={e => {
        const actualTo: string | undefined =
          typeof to === 'string' ? to : to.pathname;

        if (process.env.NODE_ENV !== 'development') {
          const redirectTo = getRedirectURL(actualTo);
          if (redirectTo) {
            loadUrl(redirectTo);
            e.preventDefault();
            return;
          }
        }

        if (performance.mark) {
          performance.clearMarks();
          performance.mark(`navigate-${to}`);
        }

        if (onClick) {
          onClick(e);
        }
      }}
      className={className}
      to={to}
      {...props}
    >
      {children}
    </BaseLink>
  ),
);

// exporting like this so it's just replace react-router-dom w/ thisFilePath
export { Link };
