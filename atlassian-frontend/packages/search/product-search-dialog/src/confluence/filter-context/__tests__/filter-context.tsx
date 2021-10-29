import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import {
  FilterContextProvider,
  useFilterContext,
  FilterContextProps,
  transformFiltersForAnalytics,
} from '../filter-context';
import {
  createSpaceFilters,
  createPeopleFilters,
} from '../../../__tests__/__fixtures__/mock-filters';
import { act } from '@testing-library/react';

jest.mock('../../../common/search-session-provider', () => ({
  useSearchSessionId: () => 'abc',
}));

describe('<FilterContext />', () => {
  const FilterContextData = (props: any) => null;

  const FilterChild = () => {
    const filterContext = useFilterContext();
    return <FilterContextData filterContext={filterContext} />;
  };

  const getFilterData = (wrapper: ReactWrapper) => {
    return wrapper
      .find(FilterContextData)
      .prop('filterContext') as FilterContextProps;
  };

  it('provides filter context to children', () => {
    const wrapper = mount(
      <FilterContextProvider>
        <FilterChild />
      </FilterContextProvider>,
    );

    expect(getFilterData(wrapper).spaceFilters.availableFilters).toEqual([]);
    expect(getFilterData(wrapper).peopleFilters.availableFilters).toEqual([]);
  });

  it('child does not need a parent provider', () => {
    const wrapper = mount(<FilterChild />);

    expect(getFilterData(wrapper).spaceFilters.availableFilters).toEqual([]);
    expect(getFilterData(wrapper).peopleFilters.availableFilters).toEqual([]);
  });

  it('can add filters', () => {
    const wrapper = mount(
      <FilterContextProvider>
        <FilterChild />
      </FilterContextProvider>,
    );

    // Setup space
    const spaceFilters = createSpaceFilters(1);

    // Execute space
    act(() => {
      getFilterData(wrapper).spaceFilters.addFilters(spaceFilters);
    });
    wrapper.update();

    // Assert Space
    expect(getFilterData(wrapper).spaceFilters.availableFilters).toEqual(
      spaceFilters,
    );

    // Setup people
    const peopleFilters = createPeopleFilters(1);

    // Execute people
    act(() => {
      getFilterData(wrapper).peopleFilters.addFilters(peopleFilters);
    });
    wrapper.update();

    // Assert people
    expect(getFilterData(wrapper).spaceFilters.availableFilters).toEqual(
      spaceFilters,
    );
  });

  it('adding existing filter updates it instead', () => {
    const spaceFilters = createSpaceFilters(2);
    const peopleFilters = createPeopleFilters(2);

    const wrapper = mount(
      <FilterContextProvider
        defaultSpaceFilters={spaceFilters}
        defaultPeopleFilters={peopleFilters}
      >
        <FilterChild />
      </FilterContextProvider>,
    );

    // Setup space
    expect(getFilterData(wrapper).spaceFilters.availableFilters[0]).toEqual(
      spaceFilters[0],
    );
    expect(
      getFilterData(wrapper).spaceFilters.availableFilters[0].isChecked,
    ).toBe(false);

    act(() => {
      getFilterData(wrapper).spaceFilters.addFilters([
        { ...spaceFilters[0], isChecked: true },
      ]);
    });
    wrapper.update();

    // Assert space is now checked and order is maintained
    expect(getFilterData(wrapper).spaceFilters.availableFilters[0]).toEqual({
      ...spaceFilters[0],
      isChecked: true,
    });

    // Setup people
    expect(getFilterData(wrapper).peopleFilters.availableFilters[0]).toEqual(
      peopleFilters[0],
    );
    expect(
      getFilterData(wrapper).peopleFilters.availableFilters[0].isChecked,
    ).toBe(false);

    act(() => {
      getFilterData(wrapper).peopleFilters.addFilters([
        { ...peopleFilters[0], isChecked: true },
      ]);
    });
    wrapper.update();

    // Assert people is now checked and order is maintained
    expect(getFilterData(wrapper).peopleFilters.availableFilters[0]).toEqual({
      ...peopleFilters[0],
      isChecked: true,
    });
  });

  it('can update existing filters', () => {
    const spaceFilters = createSpaceFilters(2);
    const peopleFilters = createPeopleFilters(2);

    const wrapper = mount(
      <FilterContextProvider
        defaultSpaceFilters={spaceFilters}
        defaultPeopleFilters={peopleFilters}
      >
        <FilterChild />
      </FilterContextProvider>,
    );

    // Setup space
    expect(getFilterData(wrapper).spaceFilters.availableFilters[0]).toEqual(
      spaceFilters[0],
    );
    expect(
      getFilterData(wrapper).spaceFilters.availableFilters[0].isChecked,
    ).toBe(false);

    act(() => {
      getFilterData(wrapper).spaceFilters.updateFilter(
        spaceFilters[0].id,
        true,
      );
    });
    wrapper.update();

    // Assert space is now checked and order is maintained
    expect(getFilterData(wrapper).spaceFilters.availableFilters[0]).toEqual({
      ...spaceFilters[0],
      isChecked: true,
    });

    // Setup people
    expect(getFilterData(wrapper).peopleFilters.availableFilters[0]).toEqual(
      peopleFilters[0],
    );
    expect(
      getFilterData(wrapper).peopleFilters.availableFilters[0].isChecked,
    ).toBe(false);

    act(() => {
      getFilterData(wrapper).peopleFilters.updateFilter(
        peopleFilters[0].id,
        true,
      );
    });
    wrapper.update();

    // Assert people is now checked and order is maintained
    expect(getFilterData(wrapper).peopleFilters.availableFilters[0]).toEqual({
      ...peopleFilters[0],
      isChecked: true,
    });
  });

  it('can not update filters that do not exist', () => {
    const spaceFilters = createSpaceFilters(1);
    const peopleFilters = createPeopleFilters(1);

    const wrapper = mount(
      <FilterContextProvider
        defaultSpaceFilters={spaceFilters}
        defaultPeopleFilters={peopleFilters}
      >
        <FilterChild />
      </FilterContextProvider>,
    );

    // Setup space
    expect(getFilterData(wrapper).spaceFilters.availableFilters[0]).toEqual(
      spaceFilters[0],
    );

    act(() => {
      getFilterData(wrapper).spaceFilters.updateFilter(
        `${spaceFilters[0].id} some uniq identifier`,
        true,
      );
    });
    wrapper.update();

    // Assert Space
    expect(getFilterData(wrapper).spaceFilters.availableFilters[0]).toEqual(
      spaceFilters[0],
    );

    // Setup people
    expect(getFilterData(wrapper).peopleFilters.availableFilters[0]).toEqual(
      peopleFilters[0],
    );

    act(() => {
      getFilterData(wrapper).peopleFilters.updateFilter(
        `${peopleFilters[0].id} some uniq identifier`,
        true,
      );
    });
    wrapper.update();

    // Assert people
    expect(getFilterData(wrapper).peopleFilters.availableFilters[0]).toEqual(
      peopleFilters[0],
    );
  });

  it('can clear filters', () => {
    const spaceFilters = createSpaceFilters(2, { checkedNumber: 2 });
    const peopleFilters = createPeopleFilters(2, { checkedNumber: 2 });

    const wrapper = mount(
      <FilterContextProvider
        defaultSpaceFilters={spaceFilters}
        defaultPeopleFilters={peopleFilters}
      >
        <FilterChild />
      </FilterContextProvider>,
    );

    // Setup
    expect(getFilterData(wrapper).spaceFilters.availableFilters).toHaveLength(
      2,
    );
    expect(
      getFilterData(wrapper).spaceFilters.availableFilters.filter(
        (f) => f.isChecked,
      ),
    ).toHaveLength(2);
    expect(getFilterData(wrapper).peopleFilters.availableFilters).toHaveLength(
      2,
    );
    expect(
      getFilterData(wrapper).peopleFilters.availableFilters.filter(
        (f) => f.isChecked,
      ),
    ).toHaveLength(2);

    // Execute 1
    act(() => {
      getFilterData(wrapper).spaceFilters.clearFilter();
    });
    wrapper.update();

    // Assert 1
    expect(getFilterData(wrapper).spaceFilters.availableFilters).toHaveLength(
      2,
    );
    expect(
      getFilterData(wrapper).spaceFilters.availableFilters.filter(
        (f) => f.isChecked,
      ),
    ).toHaveLength(0); // Should be unchecked
    expect(getFilterData(wrapper).peopleFilters.availableFilters).toHaveLength(
      2,
    );
    expect(
      getFilterData(wrapper).peopleFilters.availableFilters.filter(
        (f) => f.isChecked,
      ),
    ).toHaveLength(2); // Should not be changed

    // Execute 2
    act(() => {
      getFilterData(wrapper).peopleFilters.clearFilter();
    });
    wrapper.update();

    // Assert 2
    expect(getFilterData(wrapper).spaceFilters.availableFilters).toHaveLength(
      2,
    );
    expect(
      getFilterData(wrapper).spaceFilters.availableFilters.filter(
        (f) => f.isChecked,
      ),
    ).toHaveLength(0); // Should be unchecked
    expect(getFilterData(wrapper).peopleFilters.availableFilters).toHaveLength(
      2,
    );
    expect(
      getFilterData(wrapper).peopleFilters.availableFilters.filter(
        (f) => f.isChecked,
      ),
    ).toHaveLength(0); // Should be unchecked
  });

  it('disabling the filter provider will reset its state', () => {
    const spaceFilters = createSpaceFilters(1);
    const peopleFilters = createPeopleFilters(1);

    const wrapper = mount(
      <FilterContextProvider>
        <FilterChild />
      </FilterContextProvider>,
    );

    act(() => {
      getFilterData(wrapper).spaceFilters.addFilters(spaceFilters);
      getFilterData(wrapper).peopleFilters.addFilters(peopleFilters);
    });

    wrapper.update();
    expect(getFilterData(wrapper).spaceFilters.availableFilters).toHaveLength(
      1,
    );
    expect(getFilterData(wrapper).peopleFilters.availableFilters).toHaveLength(
      1,
    );

    wrapper.setProps({
      isEnabled: false,
    });

    expect(getFilterData(wrapper).spaceFilters.availableFilters).toHaveLength(
      0,
    );
    expect(getFilterData(wrapper).peopleFilters.availableFilters).toHaveLength(
      0,
    );
  });

  describe('transformFiltersForAnalytics', () => {
    it('transforms correctly when no filters are applied', () => {
      const spaceFilters = createSpaceFilters(2);

      expect(transformFiltersForAnalytics(spaceFilters)).toEqual({
        applied: [],
        recommendedIds: [
          {
            id: spaceFilters[0]!.id,
            source: 'COLLABORATION_GRAPH',
          },
          {
            id: spaceFilters[1]!.id,
            source: 'COLLABORATION_GRAPH',
          },
        ],
      });
    });

    it('transforms correctly when filters are applied', () => {
      const spaceFilters = createSpaceFilters(2);
      spaceFilters[0] = { ...spaceFilters[0], isChecked: true };

      expect(transformFiltersForAnalytics(spaceFilters)).toEqual({
        applied: [
          {
            id: spaceFilters[0]!.id,
            source: 'COLLABORATION_GRAPH',
            index: 0,
          },
        ],
        recommendedIds: [
          {
            id: spaceFilters[0]!.id,
            source: 'COLLABORATION_GRAPH',
          },
          {
            id: spaceFilters[1]!.id,
            source: 'COLLABORATION_GRAPH',
          },
        ],
      });
    });
  });
});
