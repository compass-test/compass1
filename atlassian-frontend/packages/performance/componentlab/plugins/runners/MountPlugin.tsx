import React from 'react';
import ReactDOM from 'react-dom';
import { RunnerPlugin } from '../../types';

const MountPlugin: RunnerPlugin = {
  id: 'mount',
  name: 'Mount',
  run({
    element,
    container,
  }: {
    element: React.ReactElement<unknown>;
    container: HTMLElement;
  }) {
    return new Promise((resolve) => {
      ReactDOM.render(
        <MountComponent onMount={resolve}>{element}</MountComponent>,
        container,
      );
    });
  },
};

type MountComponentProps = {
  onMount: () => unknown;
  children: React.ReactNode;
};

class MountComponent extends React.Component<MountComponentProps> {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return this.props.children;
  }
}

export default MountPlugin;
