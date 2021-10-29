import { isSnapshotAddedFailure } from './snapshots';

describe('isSnapshotAddedFailure', () => {
  it(`should be true when snapshots weren't written`, () => {
    const results = {
      failureMessage: 'New snapshot was not written',
    };
    const didFail = isSnapshotAddedFailure(results);
    expect(didFail).toBe(true);
  });

  it(`should be false when snapshots were written`, () => {
    const didFail1 = isSnapshotAddedFailure({});
    expect(didFail1).toBe(false);

    const didFail2 = isSnapshotAddedFailure({
      failureMessage: 'something else',
    });
    expect(didFail2).toBe(false);
  });
});
