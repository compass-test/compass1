import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import {
  FilterContextProvider,
  useFilterContext,
  FilterContextProps,
  transformFiltersForAnalytics,
  DEFAULT_BINARY_STATUS_CATEGORY_FILTERS,
} from '../filter-context';

import {
  createProjectFilters,
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

  describe('AssigneeFilter', () => {
    it('provides filter context to children', () => {
      const wrapper = mount(
        <FilterContextProvider>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(getFilterData(wrapper).assigneeFilters.availableFilters).toEqual(
        [],
      );
    });

    it('child does not need a parent provider', () => {
      const wrapper = mount(<FilterChild />);

      expect(getFilterData(wrapper).assigneeFilters.availableFilters).toEqual(
        [],
      );
    });

    it('can add filters', () => {
      const wrapper = mount(
        <FilterContextProvider>
          <FilterChild />
        </FilterContextProvider>,
      );

      const peopleFilters = createPeopleFilters(1);
      act(() => {
        getFilterData(wrapper).assigneeFilters.addFilters(peopleFilters);
      });
      wrapper.update();

      expect(getFilterData(wrapper).assigneeFilters.availableFilters).toEqual(
        peopleFilters,
      );
    });

    it('adding existing filter updates it instead', () => {
      const peopleFilters = createPeopleFilters(2);

      const wrapper = mount(
        <FilterContextProvider defaultAssigneeFilters={peopleFilters}>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters[0],
      ).toEqual(peopleFilters[0]);
      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters[0].isChecked,
      ).toBe(false);

      act(() => {
        getFilterData(wrapper).assigneeFilters.addFilters([
          { ...peopleFilters[0], isChecked: true },
        ]);
      });
      wrapper.update();

      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters[0],
      ).toEqual({
        ...peopleFilters[0],
        isChecked: true,
      });
    });

    it('can update existing filters', () => {
      const peopleFilters = createPeopleFilters(2);

      const wrapper = mount(
        <FilterContextProvider defaultAssigneeFilters={peopleFilters}>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters[0],
      ).toEqual(peopleFilters[0]);
      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters[0].isChecked,
      ).toBe(false);

      act(() => {
        getFilterData(wrapper).assigneeFilters.updateFilter(
          peopleFilters[0].id,
          true,
        );
      });
      wrapper.update();

      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters[0],
      ).toEqual({
        ...peopleFilters[0],
        isChecked: true,
      });
    });

    it('can not update filters that do not exist', () => {
      const peopleFilters = createPeopleFilters(1);

      const wrapper = mount(
        <FilterContextProvider defaultAssigneeFilters={peopleFilters}>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters[0],
      ).toEqual(peopleFilters[0]);

      act(() => {
        getFilterData(wrapper).assigneeFilters.updateFilter(
          `${peopleFilters[0].id} some uniq identifier`,
          true,
        );
      });
      wrapper.update();

      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters[0],
      ).toEqual(peopleFilters[0]);
    });

    it('can clear filters', () => {
      const peopleFilters = createPeopleFilters(2, { checkedNumber: 2 });

      const wrapper = mount(
        <FilterContextProvider defaultAssigneeFilters={peopleFilters}>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters,
      ).toHaveLength(2);
      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters.filter(
          (f) => f.isChecked,
        ),
      ).toHaveLength(2);

      act(() => {
        getFilterData(wrapper).assigneeFilters.clearFilter();
      });
      wrapper.update();

      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters,
      ).toHaveLength(2);
      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters.filter(
          (f) => f.isChecked,
        ),
      ).toHaveLength(0); // Should be unchecked
    });

    it('disabling the filter provider will reset its state', () => {
      const peopleFilters = createPeopleFilters(1);

      const wrapper = mount(
        <FilterContextProvider>
          <FilterChild />
        </FilterContextProvider>,
      );

      act(() => {
        getFilterData(wrapper).assigneeFilters.addFilters(peopleFilters);
      });

      wrapper.update();
      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters,
      ).toHaveLength(1);

      wrapper.setProps({
        isEnabled: false,
      });

      expect(
        getFilterData(wrapper).assigneeFilters.availableFilters,
      ).toHaveLength(0);
    });
  });

  describe('ProjectFilter', () => {
    it('provides filter context to children', () => {
      const wrapper = mount(
        <FilterContextProvider>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(getFilterData(wrapper).projectFilters.availableFilters).toEqual(
        [],
      );
    });

    it('child does not need a parent provider', () => {
      const wrapper = mount(<FilterChild />);

      expect(getFilterData(wrapper).projectFilters.availableFilters).toEqual(
        [],
      );
    });

    it('can add filters', () => {
      const wrapper = mount(
        <FilterContextProvider>
          <FilterChild />
        </FilterContextProvider>,
      );

      const projectFilters = createProjectFilters(1);

      act(() => {
        getFilterData(wrapper).projectFilters.addFilters(projectFilters);
      });
      wrapper.update();

      expect(getFilterData(wrapper).projectFilters.availableFilters).toEqual(
        projectFilters,
      );
    });

    it('adding existing filter updates it instead', () => {
      const projectFilters = createProjectFilters(2);

      const wrapper = mount(
        <FilterContextProvider defaultProjectFilters={projectFilters}>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(getFilterData(wrapper).projectFilters.availableFilters[0]).toEqual(
        projectFilters[0],
      );
      expect(
        getFilterData(wrapper).projectFilters.availableFilters[0].isChecked,
      ).toBe(false);

      act(() => {
        getFilterData(wrapper).projectFilters.addFilters([
          { ...projectFilters[0], isChecked: true },
        ]);
      });
      wrapper.update();

      expect(getFilterData(wrapper).projectFilters.availableFilters[0]).toEqual(
        {
          ...projectFilters[0],
          isChecked: true,
        },
      );
    });

    it('can update existing filters', () => {
      const projectFilters = createProjectFilters(2);

      const wrapper = mount(
        <FilterContextProvider defaultProjectFilters={projectFilters}>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(getFilterData(wrapper).projectFilters.availableFilters[0]).toEqual(
        projectFilters[0],
      );
      expect(
        getFilterData(wrapper).projectFilters.availableFilters[0].isChecked,
      ).toBe(false);

      act(() => {
        getFilterData(wrapper).projectFilters.updateFilter(
          projectFilters[0].id,
          true,
        );
      });
      wrapper.update();

      expect(getFilterData(wrapper).projectFilters.availableFilters[0]).toEqual(
        {
          ...projectFilters[0],
          isChecked: true,
        },
      );
    });

    it('can not update filters that do not exist', () => {
      const projectFilters = createProjectFilters(1);

      const wrapper = mount(
        <FilterContextProvider defaultProjectFilters={projectFilters}>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(getFilterData(wrapper).projectFilters.availableFilters[0]).toEqual(
        projectFilters[0],
      );

      act(() => {
        getFilterData(wrapper).projectFilters.updateFilter(
          `${projectFilters[0].id} some uniq identifier`,
          true,
        );
      });
      wrapper.update();

      expect(getFilterData(wrapper).projectFilters.availableFilters[0]).toEqual(
        projectFilters[0],
      );
    });

    it('can clear filters', () => {
      const projectFilters = createProjectFilters(2, { checkedNumber: 2 });

      const wrapper = mount(
        <FilterContextProvider defaultProjectFilters={projectFilters}>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(
        getFilterData(wrapper).projectFilters.availableFilters,
      ).toHaveLength(2);
      expect(
        getFilterData(wrapper).projectFilters.availableFilters.filter(
          (f) => f.isChecked,
        ),
      ).toHaveLength(2);

      act(() => {
        getFilterData(wrapper).projectFilters.clearFilter();
      });
      wrapper.update();

      expect(
        getFilterData(wrapper).projectFilters.availableFilters,
      ).toHaveLength(2);
      expect(
        getFilterData(wrapper).projectFilters.availableFilters.filter(
          (f) => f.isChecked,
        ),
      ).toHaveLength(0); // Should be unchecked
    });

    it('disabling the filter provider will reset its state', () => {
      const projectFilters = createProjectFilters(1);

      const wrapper = mount(
        <FilterContextProvider>
          <FilterChild />
        </FilterContextProvider>,
      );

      act(() => {
        getFilterData(wrapper).projectFilters.addFilters(projectFilters);
      });

      wrapper.update();
      expect(
        getFilterData(wrapper).projectFilters.availableFilters,
      ).toHaveLength(1);

      wrapper.setProps({
        isEnabled: false,
      });

      expect(
        getFilterData(wrapper).projectFilters.availableFilters,
      ).toHaveLength(0);
    });
  });

  describe('BinaryStatusCategoryFilter', () => {
    it('provides filter context to children', () => {
      const wrapper = mount(
        <FilterContextProvider>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(
        getFilterData(wrapper).binaryStatusCategoryFilters.availableFilters,
      ).toEqual(DEFAULT_BINARY_STATUS_CATEGORY_FILTERS);
    });

    it('child does not need a parent provider', () => {
      const wrapper = mount(<FilterChild />);

      expect(
        getFilterData(wrapper).binaryStatusCategoryFilters.availableFilters,
      ).toEqual([]);
    });

    it('can update existing filters', () => {
      const wrapper = mount(
        <FilterContextProvider>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(
        getFilterData(wrapper).binaryStatusCategoryFilters.availableFilters[0]
          .isChecked,
      ).toBe(false);

      act(() => {
        getFilterData(wrapper).binaryStatusCategoryFilters.updateFilter(
          DEFAULT_BINARY_STATUS_CATEGORY_FILTERS[0].id,
          true,
        );
      });
      wrapper.update();

      expect(
        getFilterData(wrapper).binaryStatusCategoryFilters.availableFilters[0],
      ).toEqual({
        ...DEFAULT_BINARY_STATUS_CATEGORY_FILTERS[0],
        isChecked: true,
      });
    });

    it('can not update filters that do not exist', () => {
      const wrapper = mount(
        <FilterContextProvider>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(
        getFilterData(wrapper).binaryStatusCategoryFilters.availableFilters[0],
      ).toEqual(DEFAULT_BINARY_STATUS_CATEGORY_FILTERS[0]);

      act(() => {
        getFilterData(wrapper).binaryStatusCategoryFilters.updateFilter(
          `${DEFAULT_BINARY_STATUS_CATEGORY_FILTERS[0].id} some uniq identifier`,
          true,
        );
      });
      wrapper.update();

      expect(
        getFilterData(wrapper).binaryStatusCategoryFilters.availableFilters[0],
      ).toEqual(DEFAULT_BINARY_STATUS_CATEGORY_FILTERS[0]);
    });

    it('can clear filters', () => {
      const wrapper = mount(
        <FilterContextProvider>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(
        getFilterData(wrapper).binaryStatusCategoryFilters.availableFilters,
      ).toHaveLength(2);
      act(() => {
        getFilterData(wrapper).binaryStatusCategoryFilters.updateFilter(
          DEFAULT_BINARY_STATUS_CATEGORY_FILTERS[0].id,
          true,
        );
      });
      wrapper.update();
      act(() => {
        getFilterData(wrapper).binaryStatusCategoryFilters.updateFilter(
          DEFAULT_BINARY_STATUS_CATEGORY_FILTERS[1].id,
          true,
        );
      });
      wrapper.update();
      expect(
        getFilterData(
          wrapper,
        ).binaryStatusCategoryFilters.availableFilters.filter(
          (f) => f.isChecked,
        ),
      ).toHaveLength(2);

      act(() => {
        getFilterData(wrapper).binaryStatusCategoryFilters.clearFilter();
      });
      wrapper.update();

      expect(
        getFilterData(wrapper).binaryStatusCategoryFilters.availableFilters,
      ).toHaveLength(2);
      expect(
        getFilterData(
          wrapper,
        ).binaryStatusCategoryFilters.availableFilters.filter(
          (f) => f.isChecked,
        ),
      ).toHaveLength(0); // Should be unchecked
    });

    it('disabling the filter provider will clear its state', () => {
      const wrapper = mount(
        <FilterContextProvider>
          <FilterChild />
        </FilterContextProvider>,
      );

      expect(
        getFilterData(wrapper).binaryStatusCategoryFilters.availableFilters,
      ).toHaveLength(2);
      act(() => {
        getFilterData(wrapper).binaryStatusCategoryFilters.updateFilter(
          DEFAULT_BINARY_STATUS_CATEGORY_FILTERS[0].id,
          true,
        );
      });
      wrapper.update();
      act(() => {
        getFilterData(wrapper).binaryStatusCategoryFilters.updateFilter(
          DEFAULT_BINARY_STATUS_CATEGORY_FILTERS[1].id,
          true,
        );
      });
      wrapper.update();
      expect(
        getFilterData(
          wrapper,
        ).binaryStatusCategoryFilters.availableFilters.filter(
          (f) => f.isChecked,
        ),
      ).toHaveLength(2);

      wrapper.setProps({
        isEnabled: false,
      });

      expect(
        getFilterData(
          wrapper,
        ).binaryStatusCategoryFilters.availableFilters.filter(
          (f) => f.isChecked,
        ),
      ).toHaveLength(0);
    });
  });
});

describe('transformFiltersForAnalytics', () => {
  it('transforms correctly when no filters are applied', () => {
    const projectFilters = createProjectFilters(2);

    expect(transformFiltersForAnalytics(projectFilters)).toEqual({
      applied: [],
      recommendedIds: [
        {
          id: projectFilters[0].id,
          source: 'COLLABORATION_GRAPH',
        },
        {
          id: projectFilters[1].id,
          source: 'COLLABORATION_GRAPH',
        },
      ],
    });
  });

  it('transforms correctly when filters are applied', () => {
    const projectFilters = createProjectFilters(2);
    projectFilters[0] = { ...projectFilters[0], isChecked: true };

    expect(transformFiltersForAnalytics(projectFilters)).toEqual({
      applied: [
        {
          id: projectFilters[0].id,
          source: 'COLLABORATION_GRAPH',
          index: 0,
        },
      ],
      recommendedIds: [
        {
          id: projectFilters[0].id,
          source: 'COLLABORATION_GRAPH',
        },
        {
          id: projectFilters[1].id,
          source: 'COLLABORATION_GRAPH',
        },
      ],
    });
  });
});
