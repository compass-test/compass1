import { createLocalId } from '../createLocalId';

describe('createLocalId', () => {
  it('produces different ids for subsequent calls', () => {
    const firstId = createLocalId();
    const secondId = createLocalId();

    expect(firstId).not.toEqual(secondId);
  });
});
