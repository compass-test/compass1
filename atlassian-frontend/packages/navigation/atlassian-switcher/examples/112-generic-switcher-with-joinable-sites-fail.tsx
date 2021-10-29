import React from 'react';
import Button from '@atlaskit/button/standard-button';
import Drawer from '@atlaskit/drawer';
import { mockEndpoints } from '@atlassian/switcher-test-utils';
import { withAnalyticsLogger, withIntlProvider } from './helpers';
import AtlassianSwitcher from '../src';
import {
  createJoinableSitesProvider,
  fetchProductRecommendations,
} from '../src/index';

const joinableSitesDataProvider = createJoinableSitesProvider(
  fetchProductRecommendations('/gateway/api/invitations'),
  {
    shouldRetryOnException: (exception) =>
      exception.name === 'FetchError' && exception.status >= 500,
    intervalsMS: [50, 200, 1000],
  },
);

class GenericSwitcherWithJoinExample extends React.Component {
  state = {
    isDrawerOpen: false,
  };

  componentDidMount() {
    this.openDrawer();
  }

  openDrawer = () => {
    mockEndpoints(
      'confluence',
      (originalMockData) => ({
        ...originalMockData,
        PRODUCT_RECOMMENDATIONS_DATA_ERROR: 500,
      }),
      {
        containers: 1000,
        xflow: 500,
        permitted: 2000,
        appswitcher: 1500,
      },
    );
    this.setState({
      isDrawerOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isDrawerOpen: false,
    });
  };

  onTriggerXFlow = (productKey: string, sourceComponent: string) => {
    console.log(
      `Triggering xflow for => ${productKey} from ${sourceComponent}`,
    );
  };

  render() {
    return (
      <div style={{ padding: '2rem' }}>
        <Drawer onClose={this.onClose} isOpen={this.state.isDrawerOpen}>
          <AtlassianSwitcher
            product="generic-product"
            cloudId="some-cloud-id"
            joinableSitesDataProvider={joinableSitesDataProvider}
            onClose={this.onClose}
          />
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}

export default withIntlProvider(
  withAnalyticsLogger(GenericSwitcherWithJoinExample),
);
