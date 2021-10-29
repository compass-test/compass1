import React from 'react';

import { mount } from 'enzyme';

import { SelectWithoutAnalytics } from '@atlaskit/select/Select';
import { GroupedOptionsType, OptionType } from '@atlaskit/select/types';

import { SmartContext } from '../../common/types';
import withSmarts, { fetchRankedFields } from '../../index';

interface DebounceFunction {
  cancel: jest.Mock;
}

jest.mock('lodash/debounce', () => (fn: DebounceFunction) => {
  fn.cancel = jest.fn();
  return fn;
});

jest.mock('../../services/ranker', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const groupedOptions: GroupedOptionsType<OptionType> = [
  {
    label: 'Recent labels',
    options: [
      {
        value: 'value1',
        label: 'label1',
      },
      {
        value: 'value2',
        label: 'label2',
      },
    ],
  },
  {
    label: 'All labels',
    options: [
      {
        value: 'value3',
        label: 'label3',
      },
    ],
  },
];

const emptyGroupedOptions: GroupedOptionsType<OptionType> = [
  {
    label: 'Recent labels',
    options: [],
  },
  {
    label: 'All labels',
    options: [],
  },
];

const defaultOptions: OptionType[] = [
  {
    value: 'value1',
    label: 'label1',
  },
  {
    value: 'value2',
    label: 'label2',
  },
  {
    value: 'value3',
    label: 'label3',
  },
];

const rankedOptions: OptionType[] = [
  {
    value: 'value2',
    label: 'label2',
  },
  {
    value: 'value3',
    label: 'label3',
  },
  {
    value: 'value1',
    label: 'label1',
  },
];
const smartContext: SmartContext = {
  containerId: 'container1',
  fieldId: 'field1',
  objectId: 'objectId1',
  principalId: 'principalId1',
  product: 'jira',
  tenantId: 'tenant123',
  smartRank: false,
};
const defaultProps = {
  options: defaultOptions,
  isMulti: false,
  smartContext: smartContext,
};

const flushPromises = () => {
  return new Promise((resolve) => setImmediate(resolve));
};

describe('withSmarts', () => {
  let fetchRankedFieldsMock = fetchRankedFields as jest.Mock;
  const smartSelectWrapper = (props?: any) => {
    const SmartSelect = withSmarts(SelectWithoutAnalytics);
    return mount(
      <SmartSelect
        {...defaultProps}
        {...props}
        smartContext={{ ...defaultProps.smartContext, ...props?.smartContext }}
      ></SmartSelect>,
    );
  };

  beforeEach(() => {
    fetchRankedFieldsMock.mockReturnValue(Promise.resolve(rankedOptions));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the provided select component', async () => {
    const component = smartSelectWrapper();
    await flushPromises();
    expect(component.find('AtlaskitSelect').props()).toHaveProperty(
      'options',
      defaultOptions,
    );
  });

  it('should rank if smart rank is true', async () => {
    const component = smartSelectWrapper({
      ...defaultProps,
      smartContext: {
        ...smartContext,
        smartRank: true,
      },
      isMulti: false,
    });
    await flushPromises(); //wait for async ranking
    component.update(); //update then enzyme wrapper to match the react component
    expect(component.find('AtlaskitSelect').props()).toHaveProperty(
      'options',
      rankedOptions,
    );
    expect(fetchRankedFieldsMock).toHaveBeenCalledTimes(1);
  });

  it('should rerank if options changes', async () => {
    // Component is loaded with first set of options
    const component = smartSelectWrapper({
      ...defaultProps,
      smartContext: {
        ...smartContext,
        smartRank: true,
      },
      isMulti: false,
    });
    await flushPromises(); //wait for async ranking
    component.update(); //update then enzyme wrapper to match the react component

    expect(fetchRankedFieldsMock).toHaveBeenCalledTimes(1);

    // Component is loaded with a new set of option
    component.setProps({
      options: [
        ...defaultOptions,
        { value: 'new-option', label: 'new-option' },
      ],
    });
    await flushPromises();
    component.update();

    expect(fetchRankedFieldsMock).toHaveBeenCalledTimes(2);
  });

  it('should rank for grouped options', async () => {
    // ranked options return 2 > 3 > 1
    // so grouped will be Recent labels: 2 > 1 (i.e. reversed), All labels: 3
    const rerankedGroupedOptions1 = [
      ...(groupedOptions[0].options as OptionType[]).reverse(),
    ];
    const rerankedGroupedOptions2 = [...groupedOptions[1].options];
    const component = smartSelectWrapper({
      ...defaultProps,
      options: groupedOptions,
      smartContext: {
        ...smartContext,
        smartRank: true,
      },
      isMulti: false,
    });
    await flushPromises(); //wait for async ranking
    component.update(); //update then enzyme wrapper to match the react component

    const finalOptions: GroupedOptionsType<any> = component
      .find('AtlaskitSelect')
      .prop('options');
    expect(finalOptions[0].label).toEqual('Recent labels');
    expect(finalOptions[0].options).toEqual(rerankedGroupedOptions1);
    expect(finalOptions[1].label).toEqual('All labels');
    expect(finalOptions[1].options).toEqual(rerankedGroupedOptions2);
    expect(fetchRankedFieldsMock).toHaveBeenCalledTimes(1);
  });

  it('should not rerank if options remain the same', async () => {
    // Component is loaded with first set of options
    const component = smartSelectWrapper({
      ...defaultProps,
      smartContext: {
        ...smartContext,
        smartRank: true,
      },
      isMulti: false,
    });
    await flushPromises();
    component.update();

    expect(fetchRankedFieldsMock).toHaveBeenCalledTimes(1);

    component.setProps({
      options: [...defaultOptions],
    });
    await flushPromises();
    component.update();
    // ensure no extra call to FRS
    expect(fetchRankedFieldsMock).toHaveBeenCalledTimes(1);
  });

  it('should not rank if smart rank is false', async () => {
    const component = smartSelectWrapper({
      ...defaultProps,
      smartContext: {
        ...smartContext,
        smartRank: false,
      },
      isMulti: false,
    });
    await flushPromises();
    component.update();
    expect(component.find('AtlaskitSelect').props()).toHaveProperty(
      'options',
      defaultOptions,
    );
    expect(fetchRankedFieldsMock).toHaveBeenCalledTimes(0);
  });

  it('should not rank if smart rank is not provided', async () => {
    const component = smartSelectWrapper({
      ...defaultProps,
      smartContext: {
        ...smartContext,
      },
      isMulti: false,
    });
    await flushPromises();
    component.update();
    expect(component.find('AtlaskitSelect').props()).toHaveProperty(
      'options',
      defaultOptions,
    );
    expect(fetchRankedFieldsMock).toHaveBeenCalledTimes(0);
  });
  it('should pass empty grouped options through', async () => {
    const component = smartSelectWrapper({
      ...defaultProps,
      options: emptyGroupedOptions,
      smartContext: {
        ...smartContext,
        smartRank: false,
      },
      isMulti: false,
    });
    expect(component.find('AtlaskitSelect').props()).toHaveProperty(
      'options',
      emptyGroupedOptions,
    );
  });
});
