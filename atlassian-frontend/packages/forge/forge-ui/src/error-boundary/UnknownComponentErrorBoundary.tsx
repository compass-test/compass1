import React, { Component, ErrorInfo } from 'react';
import { Dispatch, ProductEnvironment } from '@atlassian/forge-ui-types';
import { catalog } from '@atlassiansox/metal-client';
import ErrorPanel from '../components/errorPanel/errorPanel';
import { MetalClientContext } from '../context';
import { captureAndReportError } from '../error-reporting';

export class UnknownComponentError extends Error {
  unknownComponent: string;

  constructor(message: string, unknownComponent: string) {
    super(message);
    this.unknownComponent = unknownComponent;
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, UnknownComponentError.prototype);
  }
}

interface Props {
  dispatch: Dispatch;
}

interface State {
  thrownError?: {
    error: Error;
    errorInfo: ErrorInfo;
  };
}
class UnknownComponentErrorBoundary extends Component<Props, State> {
  static contextType = MetalClientContext;
  context!: React.ContextType<typeof MetalClientContext>;

  public state: State = {
    thrownError: undefined,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (!(error instanceof UnknownComponentError)) {
      throw error;
    }

    const { metalClient, page, environment } = this.context;
    if (metalClient) {
      Promise.resolve(metalClient).then((metalClient) => {
        captureAndReportError({
          error,
          errorInfo,
          page,
          environment: environment || ProductEnvironment.DEVELOPMENT,
        });

        metalClient.error.submit({
          component: 'renderer:unknown-component',
          page,
          name: catalog.error.COMPONENT,
        });
      });
    }

    this.setState({
      thrownError: {
        error,
        errorInfo,
      },
    });
  }

  public render() {
    const { thrownError } = this.state;
    if (!thrownError) {
      return this.props.children;
    }

    return (
      <ErrorPanel error={thrownError.error} dispatch={this.props.dispatch} />
    );
  }
}

export default UnknownComponentErrorBoundary;
