import { attemptPrependCurrentSpaceToSpaceFilters } from '../filter-utils';
import { createSpaceFilters } from '../../../__tests__/__fixtures__/mock-filters';
import { CurrentSpaceInfo } from '../../../confluence/confluence-features/confluence-features';

const dummyCurrentSpace: CurrentSpaceInfo | undefined = {
  id: '12345',
  spaceName: 'Test Space',
  spaceKey: '67890',
  iconUrl: 'path/to/url',
};

describe('attemptPrependCurrentSpaceToSpaceFilters', () => {
  it('prepends the given space object to the list of filters', () => {
    const filters = createSpaceFilters(5);
    expect(
      attemptPrependCurrentSpaceToSpaceFilters(filters, dummyCurrentSpace).map(
        (f) => f.id,
      ),
    ).toEqual([dummyCurrentSpace.spaceKey, ...filters.map((f) => f.id)]);
  });

  it('returns the original list of filters if there is no current space', () => {
    const filters = createSpaceFilters(5);
    expect(
      attemptPrependCurrentSpaceToSpaceFilters(filters, undefined),
    ).toEqual(filters);
  });

  it('moves the given space object to the front of the list if it already exists in list of filters', () => {
    const filters = createSpaceFilters(10);
    filters[4].id = dummyCurrentSpace.spaceKey;
    expect(
      attemptPrependCurrentSpaceToSpaceFilters(filters, dummyCurrentSpace).map(
        (f) => f.id,
      ),
    ).toEqual([
      dummyCurrentSpace.spaceKey,
      ...filters
        .filter((f) => f.id !== dummyCurrentSpace.spaceKey)
        .map((f) => f.id),
    ]);
  });
});
