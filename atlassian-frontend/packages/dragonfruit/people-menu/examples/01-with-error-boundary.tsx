import React from 'react';

import PeopleMenu from '../src';

import { withAnalyticsLogger, withIntlProvider } from './helpers';
import { AtlassianNavExample } from './helpers/AtlassianNavExample';
import * as styled from './helpers/styled';

const MOCK_CLOUD_ID = 'test-cloud-id';
const MOCK_USER_ID = 'test-user-id';
const MOCK_ORG_ID = 'test-org-id';

interface State {
  isOpen: boolean;
}

class ExampleWithErrorBoundary extends React.Component<{}, State> {
  state = {
    isOpen: false,
  };

  handleOpenMenu = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleCloseMenu = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { isOpen } = this.state;

    return (
      <styled.ExampleWrapper>
        <AtlassianNavExample
          peopleMenu={
            <PeopleMenu
              isOpen={isOpen}
              onOpen={this.handleOpenMenu}
              onClose={this.handleCloseMenu}
              product="confluence"
              orgId={MOCK_ORG_ID}
              cloudId={MOCK_CLOUD_ID}
              userId={MOCK_USER_ID}
              _hasError
            />
          }
        />
      </styled.ExampleWrapper>
    );
  }
}

export default withIntlProvider(withAnalyticsLogger(ExampleWithErrorBoundary));
