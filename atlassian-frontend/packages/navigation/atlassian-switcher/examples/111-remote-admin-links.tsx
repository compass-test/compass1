import React from 'react';
import Button from '@atlaskit/button/standard-button';
import Drawer from '@atlaskit/drawer';
import { mockEndpoints } from '@atlassian/switcher-test-utils';
import { withAnalyticsLogger, withIntlProvider } from './helpers';
import AtlassianSwitcher from '../src';

class SwitcherRemoteProductConfigurationExample extends React.Component {
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
        AVAILABLE_PRODUCTS_DATA: {
          ...originalMockData.AVAILABLE_PRODUCTS_DATA,
          links: [
            ...(originalMockData.AVAILABLE_PRODUCTS_DATA.links
              ? originalMockData.AVAILABLE_PRODUCTS_DATA.links
              : []),
            {
              linkType: 'BILLING',
              url: 'https://admin.stg.atlassian.com/',
            },
          ],
        },
        PRODUCT_CONFIGURATIONS_DATA: {
          ...originalMockData.PRODUCT_CONFIGURATIONS_DATA,
          links: {
            ...originalMockData.PRODUCT_CONFIGURATIONS_DATA.links,
            BILLING: {
              label: {
                id: 'fabric.atlassianSwitcher.billing',
                defaultMessage: 'Billing',
                description:
                  'The text of a link redirecting the user to the site billing',
              },
              key: 'billing',
              iconUrl:
                'https://home-static.us-east-1.staging.public.atl-paas.net/icons/settings.svg',
              href: '/billing',
              ordinal: 1001,
              description: null,
            },
          },
        },
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
            enableRemoteConfiguration={true}
            enableRemoteAdminLinks={true}
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
  withAnalyticsLogger(SwitcherRemoteProductConfigurationExample),
);
