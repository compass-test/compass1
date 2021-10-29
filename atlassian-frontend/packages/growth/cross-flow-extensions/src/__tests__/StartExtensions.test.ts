import { CrossFlowExtensions } from '@atlassiansox/cross-flow-base-types';
import { createStartExtensions, StartExtensionsOptions, Editions } from '..';

describe('The createStartExtensions factory', () => {
  it('should return an instance of CrossFlowExtensions', () => {
    const options: StartExtensionsOptions = {
      edition: Editions.FREE,
      migrationSourceUuid: 'example',
    };
    const extensions = createStartExtensions(options);
    expect(extensions).toBeInstanceOf(CrossFlowExtensions);
  });

  it('should ignore unknown options', () => {
    const options: StartExtensionsOptions = {
      edition: Editions.STANDARD,
      migrationSourceUuid: 'example',
    };
    const extensions = createStartExtensions({
      ...options,
      // @ts-ignore
      test: 'fail',
    });
    expect(extensions).toMatchObject(options);
  });
});
