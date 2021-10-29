import React from 'react';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';

const AKDynamicTable = React.lazy(() =>
  import('@atlaskit/dynamic-table').then((module) => ({
    default: module.DynamicTableStateless,
  })),
);
export class Wrapper extends React.Component<{ Component: any }> {
  state = {
    retried: false,
  };

  /**
   * There's a bug with Suspense and findDOMNode https://github.com/facebook/react/issues/14188
   * We've opted to catch and ignore the error temporarily while we address the issue in Atlaskit
   * See http:/go/j/FUI-870
   */
  componentDidCatch(error: Error) {
    if (
      error &&
      error.message &&
      (error.message === 'Unable to find node on an unmounted component.' ||
        error.message.startsWith('Minified React error #188;')) &&
      !this.state.retried
    ) {
      this.setState(
        {
          retried: true,
        },
        () =>
          this.setState({
            retried: false,
          }),
      );
    } else {
      throw error;
    }
  }

  render() {
    const Component = this.props.Component;
    if (Component) {
      return <Component {...this.props} />;
    } else {
      return null;
    }
  }
}

const LazyLoadedTable = (
  props: React.ComponentProps<typeof DynamicTableStateless>,
) => {
  return <Wrapper Component={AKDynamicTable} {...props} />;
};

export default LazyLoadedTable;
