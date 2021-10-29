import React from 'react';
import { Link } from './WrappedLink';
import Button, { ButtonProps } from '@atlaskit/button';

export type LinkButtonProps = ButtonProps & {
  to: string;
};

export default function LinkButton({
  to,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Button
      {...props}
      href={to}
      component={React.forwardRef<
        HTMLElement,
        React.AllHTMLAttributes<HTMLElement>
      >(({ children, ...rest }, ref) => (
        <Link {...rest} ref={ref} to={to}>
          {children}
        </Link>
      ))}
    >
      {children}
    </Button>
  );
}
