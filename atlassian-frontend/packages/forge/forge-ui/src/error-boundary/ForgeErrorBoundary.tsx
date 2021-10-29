/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { h500 } from '@atlaskit/theme/typography';
import {
  ForgeUIExtensionType,
  ProductEnvironment,
} from '@atlassian/forge-ui-types';
import { catalog } from '@atlassiansox/metal-client';
import {
  Component,
  ReactElement,
  ErrorInfo,
  lazy,
  useContext,
  FunctionComponent,
} from 'react';
import { captureAndReportError } from '../error-reporting';
import {
  MetalClientValueProps,
  MetalClientContext,
  EnvironmentContext,
} from '../context';
import { APIError } from '../web-client/hooks/useInvokeAuxEffects';

const SectionMessage = lazy(() => import('@atlaskit/section-message'));

interface Props {
  children: ReactElement;
  extension?: ForgeUIExtensionType;
  metalClientContext: MetalClientValueProps;
  environment: ProductEnvironment;
}

interface State {
  thrownError?: {
    error: Error;
    errorInfo: ErrorInfo;
  };
}
class ForgeErrorBoundary extends Component<Props, State> {
  public state: State = {
    thrownError: undefined,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      thrownError: {
        error,
        errorInfo,
      },
    });
    const { metalClient, page } = this.props.metalClientContext;
    const environment = this.props.environment;

    captureAndReportError({
      error,
      extension: this.props.extension,
      errorInfo,
      page,
      environment,
    });

    if (metalClient && !(error instanceof APIError)) {
      Promise.resolve(metalClient).then((client) => {
        client.error.submit({
          component: 'renderer',
          page,
          name: catalog.error.COMPONENT_BOUNDARY,
        });
      });
    }
  }

  public render() {
    const { thrownError } = this.state;

    if (!thrownError) {
      return this.props.children;
    }
    return (
      <div
        data-testid="ForgeErrorBoundary"
        css={css`
          /* && increases specificity to take precedence over the Editor h1 rules. */
          && {
            h1 {
              /*
               * Reset h1 to match the h500 in SectionMessage.
               */
              ${h500()}
            }
          }
        `}
      >
        <SectionMessage
          appearance="error"
          title="Error rendering app"
          children={null}
        />
      </div>
    );
  }
}

const withMetalClientContext = (
  Component: typeof ForgeErrorBoundary,
): FunctionComponent<Omit<Props, 'metalClientContext' | 'environment'>> => ({
  extension,
  children,
}) => {
  const metalClientContext = useContext(MetalClientContext);
  const environment = useContext(EnvironmentContext);

  return (
    <Component
      environment={metalClientContext.environment || environment}
      extension={extension}
      metalClientContext={metalClientContext}
    >
      {children}
    </Component>
  );
};

export default withMetalClientContext(ForgeErrorBoundary);
