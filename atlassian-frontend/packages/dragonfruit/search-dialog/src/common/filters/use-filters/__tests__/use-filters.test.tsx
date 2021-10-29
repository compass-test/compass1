import React from 'react';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';
import {
  Filter,
  SupportedAction,
  addFilters,
  updateFilterState,
  removeFilter,
  replaceAllFilters,
  useFilter,
  replaceAllFiltersAndMaintainChecked,
} from '../use-filters';

type Site = Filter & {
  filterUrl: string;
};

const HelloDummySite: Site = {
  filterUrl: 'https://hello.atlassian.net',
  id: 'hello-the-cloud-id',
  isChecked: false,
  isVisible: true,
};

const ProductFabricDummySite: Site = {
  filterUrl: 'https://product-fabric.atlassian.net',
  id: 'product-fabric-the-cloud-id',
  isChecked: false,
  isVisible: true,
};

const StartDummySite: Site = {
  filterUrl: 'https://start.atlassian.com/',
  id: 'start-the-cloud-id',
  isChecked: false,
  isVisible: true,
};

const JDogDummySite: Site = {
  filterUrl: 'https://jdog.jira-dev.com/',
  id: 'jdog-the-cloud-id',
  isChecked: false,
  isVisible: true,
};

const ConsumerComponent: React.FunctionComponent<{
  initialValue?: Site[];
  contextValue?: {
    filters?: Site[];
    dispatch?: (action: SupportedAction<Site>) => void;
  };
  onStateChangeSpy?: jest.Mock;
}> = ({ onStateChangeSpy, initialValue, contextValue = {} }) => {
  const result = useFilter<Site>(initialValue);
  const { filters, dispatch } = result;
  contextValue.filters = filters;
  contextValue.dispatch = dispatch;

  React.useEffect(() => {
    onStateChangeSpy?.();
  }, [onStateChangeSpy, result]);

  return null;
};

describe('useFilters()', () => {
  it('provides default filter if available', () => {
    const contextValue = {
      filters: undefined,
    };

    mount(
      <ConsumerComponent
        initialValue={[HelloDummySite]}
        contextValue={contextValue}
      />,
    );

    expect(contextValue.filters).toStrictEqual([HelloDummySite]);
  });

  it('provides no filter if no default filter provided', () => {
    const contextValue = {
      filters: undefined,
    };

    mount(<ConsumerComponent contextValue={contextValue} />);

    expect(contextValue.filters).toStrictEqual([]);
  });

  it('does not update filter if default filter changes', () => {
    // This case is to ensure that updated the `defaultSelectedSite` does not override potentially mutated state
    const spy = jest.fn();
    let wrapper = mount(
      <ConsumerComponent
        initialValue={[HelloDummySite]}
        onStateChangeSpy={spy}
      />,
    );

    expect(spy).toBeCalledTimes(1);
    spy.mockClear();

    act(() => {
      wrapper = wrapper.setProps({
        initialValue: ProductFabricDummySite,
      });
    });

    // The child should not render again because the context is unchanged
    expect(spy).toBeCalledTimes(0);
  });

  it('adds the filter after calling add filter', () => {
    const contextValue: any = {};

    mount(<ConsumerComponent contextValue={contextValue} />);

    act(() => {
      contextValue.dispatch(addFilters([ProductFabricDummySite]));
    });

    expect(contextValue.filters).toStrictEqual([ProductFabricDummySite]);

    act(() => {
      contextValue.dispatch(addFilters([HelloDummySite]));
    });

    expect(contextValue.filters).toStrictEqual([
      ProductFabricDummySite,
      HelloDummySite,
    ]);
  });

  it('replaces filter in place after calling add filter with identical id', () => {
    const contextValue: any = {};

    mount(
      <ConsumerComponent
        initialValue={[ProductFabricDummySite, HelloDummySite]}
        contextValue={contextValue}
      />,
    );

    const NewProductFabricDummySite = {
      ...ProductFabricDummySite,
      filterUrl: 'newSiteUrl ',
    };

    act(() => {
      contextValue.dispatch(addFilters([NewProductFabricDummySite]));
    });

    expect(contextValue.filters).toStrictEqual([
      NewProductFabricDummySite,
      HelloDummySite,
    ]);
  });

  it('filter can be sorted to change insert order', () => {
    const contextValue: any = {};

    mount(<ConsumerComponent contextValue={contextValue} />);

    act(() => {
      contextValue.dispatch(
        addFilters([ProductFabricDummySite, HelloDummySite], () => -1),
      );
    });

    expect(contextValue.filters).toStrictEqual([
      HelloDummySite,
      ProductFabricDummySite,
    ]);
  });

  it('replaces filter in place after calling update filter with valid id', () => {
    const contextValue: any = {};

    mount(
      <ConsumerComponent
        initialValue={[ProductFabricDummySite, HelloDummySite]}
        contextValue={contextValue}
      />,
    );

    act(() => {
      contextValue.dispatch(updateFilterState(ProductFabricDummySite.id, true));
    });

    expect(contextValue.filters).toStrictEqual([
      { ...ProductFabricDummySite, isChecked: true, isVisible: true },
      HelloDummySite,
    ]);
  });

  it('noops after calling update filter with non-existing id', () => {
    const contextValue: any = {};

    mount(
      <ConsumerComponent
        initialValue={[ProductFabricDummySite]}
        contextValue={contextValue}
      />,
    );

    act(() => {
      contextValue.dispatch(updateFilterState(HelloDummySite.id, true));
    });

    expect(contextValue.filters).toStrictEqual([ProductFabricDummySite]);
  });

  it('removes filter after calling remove filter', () => {
    const contextValue: any = {};

    mount(
      <ConsumerComponent
        initialValue={[ProductFabricDummySite]}
        contextValue={contextValue}
      />,
    );

    expect(contextValue.filters).toStrictEqual([ProductFabricDummySite]);

    act(() => {
      contextValue.dispatch(removeFilter(ProductFabricDummySite.id));
    });

    expect(contextValue.filters).toStrictEqual([]);
  });

  it('noops after calling remove filter thats already removed', () => {
    const contextValue: any = {};

    mount(
      <ConsumerComponent
        initialValue={[ProductFabricDummySite]}
        contextValue={contextValue}
      />,
    );

    expect(contextValue.filters).toStrictEqual([ProductFabricDummySite]);

    act(() => {
      contextValue.dispatch(removeFilter(HelloDummySite.id));
    });

    expect(contextValue.filters).toStrictEqual([ProductFabricDummySite]);
  });

  it('replaces all filters after calling replace all filters', () => {
    const contextValue: any = {};

    mount(
      <ConsumerComponent
        initialValue={[ProductFabricDummySite]}
        contextValue={contextValue}
      />,
    );

    expect(contextValue.filters).toStrictEqual([ProductFabricDummySite]);

    act(() => {
      contextValue.dispatch(replaceAllFilters([]));
    });

    expect(contextValue.filters).toStrictEqual([]);
  });

  it('replaces all filters with new filters (no duplicates) after calling replace all filters and maintain checked', () => {
    const contextValue: any = {};

    mount(
      <ConsumerComponent
        initialValue={[ProductFabricDummySite]}
        contextValue={contextValue}
      />,
    );

    expect(contextValue.filters).toStrictEqual([ProductFabricDummySite]);

    act(() => {
      contextValue.dispatch(
        replaceAllFiltersAndMaintainChecked([HelloDummySite]),
      );
    });

    expect(contextValue.filters).toStrictEqual([HelloDummySite]);
  });

  it('replace all filters and maintain checked state of duplicate new filter and existing filters', () => {
    const contextValue: any = {};

    mount(
      <ConsumerComponent
        initialValue={[
          { ...ProductFabricDummySite, isChecked: true },
          { ...HelloDummySite, isChecked: true },
          StartDummySite,
        ]}
        contextValue={contextValue}
      />,
    );

    expect(contextValue.filters).toStrictEqual([
      { ...ProductFabricDummySite, isChecked: true },
      { ...HelloDummySite, isChecked: true },
      StartDummySite,
    ]);

    act(() => {
      contextValue.dispatch(
        replaceAllFiltersAndMaintainChecked([
          ProductFabricDummySite,
          StartDummySite,
        ]),
      );
    });

    expect(contextValue.filters).toStrictEqual([
      { ...ProductFabricDummySite, isChecked: true },
      StartDummySite,
    ]);
  });

  it('replace all filters and maintain checked only maintains checked state on max defualt visible sites (currently 3)', () => {
    const contextValue: any = {};

    mount(
      <ConsumerComponent
        initialValue={[
          { ...ProductFabricDummySite, isChecked: true },
          { ...HelloDummySite, isChecked: true },
          StartDummySite,
          { ...JDogDummySite, isChecked: true },
        ]}
        contextValue={contextValue}
      />,
    );

    expect(contextValue.filters).toStrictEqual([
      { ...ProductFabricDummySite, isChecked: true },
      { ...HelloDummySite, isChecked: true },
      StartDummySite,
      { ...JDogDummySite, isChecked: true },
    ]);

    act(() => {
      contextValue.dispatch(
        replaceAllFiltersAndMaintainChecked([
          ProductFabricDummySite,
          StartDummySite,
          HelloDummySite,
          JDogDummySite,
        ]),
      );
    });

    expect(contextValue.filters).toStrictEqual([
      { ...ProductFabricDummySite, isChecked: true },
      StartDummySite,
      { ...HelloDummySite, isChecked: true },
      JDogDummySite,
    ]);
  });

  it('context does not re-render children when it itself re-renders but the context is unchanged', () => {
    const contextValue: any = {};
    const spy = jest.fn();

    const wrapper = mount(
      <ConsumerComponent
        onStateChangeSpy={spy}
        initialValue={[HelloDummySite]}
        contextValue={contextValue}
      />,
    );

    const previousContextValue = { ...contextValue };
    expect(spy).toBeCalledTimes(1);

    act(() => {
      wrapper.setProps({
        otherPropsThatGetsInjected: 'something',
      });
    });

    wrapper.update();

    expect(contextValue).toStrictEqual(previousContextValue);
    expect(spy).toBeCalledTimes(1);

    wrapper.render();

    expect(contextValue).toStrictEqual(previousContextValue);
    expect(spy).toBeCalledTimes(1);
  });
});
