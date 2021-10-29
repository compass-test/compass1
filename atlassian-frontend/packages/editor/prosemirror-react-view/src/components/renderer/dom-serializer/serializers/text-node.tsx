import React, { forwardRef, Ref } from 'react';

import ReactDOM from 'react-dom';
import { assignRef } from 'use-callback-ref';

import { NodeComponentProps } from '../types';

const TextComponent = forwardRef<HTMLElement, NodeComponentProps>(
  (props, ref) => {
    return (
      <span ref={ref} {...props.attrs}>
        {props.node.text}
      </span>
    );
  },
);
TextComponent.displayName = 'text';

export class TextNode extends React.Component<
  Omit<NodeComponentProps, 'ref'> & { innerRef?: Ref<HTMLElement> | null }
> {
  componentDidMount() {
    assignRef(
      this.props.innerRef as any,
      ReactDOM.findDOMNode(this) as HTMLElement,
    );
  }

  render(): React.ReactNode {
    return this.props.node.text;
  }
}

export const TextForward = forwardRef<HTMLElement, NodeComponentProps>(
  (_props, _ref) => {
    return (<TextNode {...(_props as any)} innerRef={_ref} />) as any;
  },
);

TextForward.displayName = 'text';
