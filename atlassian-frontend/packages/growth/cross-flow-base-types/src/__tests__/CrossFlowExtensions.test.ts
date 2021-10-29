import { CrossFlowExtensions } from '../CrossFlowExtensions';

describe('The CrossFlowExtensions class', () => {
  it('should copy all properties from the options', () => {
    const options = {
      edition: 'free',
      migrationSourceUuid: 'example',
    };
    const extensions = new CrossFlowExtensions(options);
    expect(extensions).toBeInstanceOf(CrossFlowExtensions);
    expect(extensions).toMatchObject(options);
  });

  it('should construct an immutable object', () => {
    const options = {
      edition: 'free',
      migrationSourceUuid: 'example',
    };
    const extensions = new CrossFlowExtensions(options);
    expect(Object.isFrozen(extensions)).toBe(true);
  });
});
