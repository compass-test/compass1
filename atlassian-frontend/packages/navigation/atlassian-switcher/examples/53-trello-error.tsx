import React, { ComponentType } from 'react';
import { withAnalyticsLogger, withIntlProvider } from './helpers';
import { FakeTrelloChrome } from './helpers/FakeTrelloChrome';
import ErrorBoundary from '../src/ui/components/error-boundary';
import { Product } from '../src/types';
import styled from 'styled-components';
import { FetchError } from '../src/common/utils/errors/fetch-error';

type Props = {
  status: number;
};
const FailingNetworkComponent: ComponentType<Props> = ({ status }) => {
  throw new FetchError('Failed to fetch', status);
};

const FailingRuntimeComponent: ComponentType = () => {
  throw new TypeError('Failed to fetch');
};

const ExamplesRow = styled.div`
  display: flex;
`;

class ErrorExample extends React.Component {
  render() {
    return (
      <ExamplesRow>
        <FakeTrelloChrome>
          <ErrorBoundary product={Product.TRELLO} appearance="standalone">
            <FailingNetworkComponent status={401} />
          </ErrorBoundary>
        </FakeTrelloChrome>

        <FakeTrelloChrome>
          <ErrorBoundary product={Product.TRELLO} appearance="standalone">
            <FailingNetworkComponent status={500} />
          </ErrorBoundary>
        </FakeTrelloChrome>

        <FakeTrelloChrome>
          <ErrorBoundary product={Product.TRELLO} appearance="standalone">
            <FailingRuntimeComponent />
          </ErrorBoundary>
        </FakeTrelloChrome>
      </ExamplesRow>
    );
  }
}

export default withIntlProvider(withAnalyticsLogger(ErrorExample));
