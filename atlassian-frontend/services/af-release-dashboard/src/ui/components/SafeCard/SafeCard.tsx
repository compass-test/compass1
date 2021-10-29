import React from 'react';
import { Card } from '@atlaskit/smart-card';

export class SafeCard extends React.Component<{ url: string }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <a href={this.props.url}>{this.props.url}</a>;
    }
    return <Card appearance="inline" url={this.props.url} />;
  }
}
