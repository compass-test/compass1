import { PRODUCT_CONFIGURATION_MAP } from '../../../providers/product-configuration-provider';
import { mapLegacyProductKeyToSwitcherProductKey } from '../../map-legacy-product-key-to-switcher-product-key';

describe('map-legacy-product-key-to-switcher-product-key', () => {
  test('map-legacy-product-key-to-switcher-product-key', () => {
    const EXPECTED_RESULT = {
      avocado: 'AVOCADO',
      bitbucket: 'BITBUCKET',
      compass: 'COMPASS',
      'confluence.ondemand': 'CONFLUENCE',
      'jira-core.ondemand': 'JIRA_WORK_MANAGEMENT',
      'jira-servicedesk.ondemand': 'JIRA_SERVICE_DESK',
      'jira-software.ondemand': 'JIRA_SOFTWARE',
      opsgenie: 'OPSGENIE',
      statuspage: 'STATUSPAGE',
      townsquare: 'TEAM_CENTRAL',
      trello: 'TRELLO',
    };

    const legacyProductKeyMap = mapLegacyProductKeyToSwitcherProductKey(
      PRODUCT_CONFIGURATION_MAP,
    );

    expect(legacyProductKeyMap).toEqual(EXPECTED_RESULT);
  });
});
