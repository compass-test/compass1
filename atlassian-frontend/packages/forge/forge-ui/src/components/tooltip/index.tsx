import React from 'react';
import { TooltipProps, Rendered } from '@atlassian/forge-ui-types';
import { Props } from '..';

const AKTooltip = React.lazy(() => import('@atlaskit/tooltip'));

const Tooltip: React.FunctionComponent<Rendered<TooltipProps>> = ({
  text,
  children,
}) => <AKTooltip content={text}>{children}</AKTooltip>;

export default Tooltip;

export const TooltipFn: React.FunctionComponent<Props> = ({
  props,
  children,
  Components,
  render,
  renderChildren,
  dispatch,
}) => {
  const { text } = props as TooltipProps;
  const renderedChildren = renderChildren({
    Components,
    children,
    render,
    dispatch,
  });
  return (
    <Tooltip text={text}>
      {Array.isArray(renderedChildren) ? renderedChildren[0] : renderedChildren}
    </Tooltip>
  );
};
