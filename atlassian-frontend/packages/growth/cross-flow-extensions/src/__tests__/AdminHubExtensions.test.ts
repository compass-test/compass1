import { CrossFlowExtensions } from '@atlassiansox/cross-flow-base-types';
import {
  createAdminHubExtensions,
  AdminHubExtensionsOptions,
  Editions,
} from '..';

describe('The createAdminHubExtensions factory', () => {
  it('should return an instance of CrossFlowExtensions', () => {
    const options: AdminHubExtensionsOptions = {
      edition: Editions.FREE,
      migrationSourceUuid: 'example',
    };
    const extensions = createAdminHubExtensions(options);
    expect(extensions).toBeInstanceOf(CrossFlowExtensions);
  });

  it('should ignore unknown options', () => {
    const options: AdminHubExtensionsOptions = {
      edition: Editions.STANDARD,
      migrationSourceUuid: 'example',
    };
    const extensions = createAdminHubExtensions({
      ...options,
      // @ts-ignore
      test: 'fail',
    });
    expect(extensions).toMatchObject(options);
  });
});
