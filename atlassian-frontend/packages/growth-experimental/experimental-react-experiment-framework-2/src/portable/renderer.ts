import { ReactElement, Component } from 'react';

import { ExperimentCore } from '../core/types';

export interface ExperimentRenderer {
  render: () => ReactElement | null;
}

interface RendererFunc<Upstream> {
  (pipeline: Upstream): ReactElement | null;
}

type RequiredUpstream = ExperimentCore;

export const usePluginRenderer = <Upstream extends RequiredUpstream>(
  render: RendererFunc<Upstream>,
) =>
  function useRenderer(pipeline: Upstream): Upstream & ExperimentRenderer {
    return {
      ...pipeline,
      render: () => render(pipeline),
    };
  };

interface ErrorBoundaryProps {
  onError: (error: Error) => void;
  fallbackComponent: ReactElement | null;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static defaultProps = {
    fallbackComponent: null,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    return this.state.error
      ? this.props.fallbackComponent
      : this.props.children;
  }
}
