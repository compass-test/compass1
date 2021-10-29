import React, { Component } from 'react';

export default class CanvasErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error: Error) {
    console.error(error);
    this.setState({ hasError: true });
  }

  render() {
    let { hasError } = this.state;
    if (hasError) {
      return <p>Canvas is broken.</p>;
    }

    return this.props.children;
  }
}
