/* eslint-disable react/destructuring-assignment */
import React from 'react';

import styled from 'styled-components';

import SectionMessage from '@atlaskit/section-message';
import { N20 } from '@atlaskit/theme/colors';
import Toggle from '@atlaskit/toggle';

import { ErrorUtils } from '../utils/ErrorUtils';

interface ErrorBoundaryProps {
  errorUtils?: ErrorUtils;
}

interface ErrorBoundaryState {
  hasError: boolean;
  showErrorDetails: boolean;
  errorInfo: string | null;
  error: Error | null;
}

// eslint-disable-next-line @repo/internal/react/no-class-components
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      showErrorDetails: false,
      errorInfo: null,
      error: null,
    };
  }

  componentDidCatch(error: any, errorInfo: any): void {
    this.setState({
      hasError: true,
      error,
      errorInfo: errorInfo.componentStack,
    });
    if (this.props.errorUtils) {
      this.props.errorUtils.reportError(error);
    }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // Render error UI here
      return (
        <ErrorPage>
          <ErrorPageHeader>ProForma Error</ErrorPageHeader>
          <ErrorPageSection>
            <SectionMessage
              appearance="error"
              title="ProForma crashed unexpectedly"
            >
              <p>
                Try refreshing the page, if the error persists please contact
                support{' '}
                <a
                  href="https://support.thinktilt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
              </p>
              <ErrorSectionLabel>
                <p>Show error details:</p>
                <Toggle
                  isChecked={this.state.showErrorDetails}
                  onChange={(): void => {
                    // eslint-disable-next-line @repo/internal/react/no-set-state-inside-render
                    this.setState(prevState => ({
                      showErrorDetails: !prevState.showErrorDetails,
                    }));
                  }}
                />
              </ErrorSectionLabel>
              {this.state.showErrorDetails && (
                <ErrorDetailsWrapper>
                  <code>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo}
                  </code>
                </ErrorDetailsWrapper>
              )}
            </SectionMessage>
          </ErrorPageSection>
        </ErrorPage>
      );
    }

    return this.props.children;
  }
}

const ErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorPageHeader = styled.h1``;

const ErrorPageSection = styled.div``;

const ErrorSectionLabel = styled.div`
  display: flex;
  margin-top: 20px;

  > p {
    margin-top: 2px;
  }
`;

const ErrorDetailsWrapper = styled.div`
  white-space: pre-wrap;
  background-color: ${N20}
  padding: 8px;
  font-size: 12px;
`;
