import AnalyticsWebClient, { tenantType } from '../src';

import { PRODUCT_INFO, TENANT_ID } from './util/commonTests';

describe('AnalyticsWebClient', () => {
  let client: any = null;

  beforeEach(() => {
    client = new AnalyticsWebClient(PRODUCT_INFO);
  });

  describe('setTenantInfo', () => {
    test('should throw if tenantIdType is not provided', () => {
      expect(() => {
        client.setTenantInfo();
      }).toThrow('Missing tenantIdType');
    });

    test('should throw if tenantId is not provided', () => {
      expect(() => {
        client.setTenantInfo(tenantType.CLOUD_ID);
      }).toThrow('Missing tenantId');
    });

    test('should throw if tenantIdType is invalid', () => {
      expect(() => {
        client.setTenantInfo('blah', TENANT_ID);
      }).toThrow(
        "Invalid tenantIdType 'blah', must be an tenantType: [cloudId,orgId,opsgenieCustomerId,none]",
      );
    });

    test('should set tenantInfo if valid CLOUD_ID', () => {
      client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
      // eslint-disable-next-line no-underscore-dangle
      expect(client._tenantInfo).toEqual({
        tenantIdType: tenantType.CLOUD_ID,
        tenantId: TENANT_ID,
      });
    });

    test('should set tenantInfo if NONE', () => {
      client.setTenantInfo(tenantType.NONE);
      // eslint-disable-next-line no-underscore-dangle
      expect(client._tenantInfo).toEqual({
        tenantIdType: tenantType.NONE,
      });
    });
  });

  describe('clearTenantInfo', () => {
    test('should clear tenantInfo', () => {
      client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
      client.clearTenantInfo();
      // eslint-disable-next-line no-underscore-dangle
      expect(client._tenantInfo).toEqual({});
    });
  });
});
