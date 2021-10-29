import React from 'react';

import { act } from '@testing-library/react-hooks';
import { mount, ReactWrapper } from 'enzyme';
import uuid from 'uuid';

import { AnalyticsListener } from '@atlaskit/analytics-next';
import { SelectWithoutAnalytics } from '@atlaskit/select/Select';
import {
  ActionMeta,
  GroupedOptionsType,
  InputActionMeta,
  OptionType,
  ValueType,
} from '@atlaskit/select/types';

import { SmartContext } from '../../common/types';
import withSmarts, { fetchRankedFields } from '../../index';

expect.extend({ toMatchCall });

jest.mock('../../services/ranker', () => ({
  __esModule: true,
  default: jest.fn(),
}));

//const sessionId = 'sessionId';
jest.mock('uuid/v4', () => ({
  __esModule: true,
  default: {
    v4: jest.fn(),
  },
}));

const defaultOptions: OptionType[] = [
  {
    value: '1',
    label: 'Sydney',
  },
  {
    value: '2',
    label: 'Melbourne',
  },
  {
    value: '3',
    label: 'Brisbane',
  },
];

const rankedOptions: OptionType[] = [
  {
    value: '2',
    label: 'Melbourne',
  },
  {
    value: '3',
    label: 'Brisbane',
  },
  {
    value: '1',
    label: 'Sydney',
  },
];

const groupedOptions: GroupedOptionsType<OptionType> = [
  {
    label: 'Cities',
    options: [
      {
        value: '1',
        label: 'Sydney',
      },
      {
        value: '2',
        label: 'Melbourne',
      },
      {
        value: '3',
        label: 'Brisbane',
      },
    ],
  },
  {
    label: 'Towns',
    options: [
      {
        value: '3',
        label: 'Brisbane',
      },
    ],
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
  requiresHashing: false,
};

const defaultProps = {
  options: defaultOptions,
  smartContext: smartContext,
};
const onEvent = jest.fn();
const SmartSelect = withSmarts(SelectWithoutAnalytics);

const AnalyticsTestComponent = (props: any = {}) => {
  const smartSelectProps = {
    ...defaultProps,
    ...props,
    smartContext: {
      ...defaultProps.smartContext,
      ...props.smartContext,
    },
  };
  return (
    <AnalyticsListener channel="fabric-elements" onEvent={onEvent}>
      <SmartSelect {...smartSelectProps} />
    </AnalyticsListener>
  );
};

function toMatchCall(fn: jest.Mock, expected: any) {
  const results = fn.mock.calls.map(([arg]) => {
    try {
      return expect(arg).toMatchObject(expected);
    } catch (err) {
      return err;
    }
  });
  const errors = results.filter((result: any) => result instanceof Error);
  const pass = results.some((result: any) => !(result instanceof Error));
  return {
    pass,
    errors,
    message: () =>
      `Expected fn to be called with object matching ${JSON.stringify(
        expected,
      )}.\n${errors.map((err: Error) => err.message).join('\n')}`,
  };
}

//See https://hello.atlassian.net/wiki/spaces/~gawadhwal/pages/1044087626/Analytics+spec
describe('withSmarts analytics', () => {
  let uuidMockv4 = uuid.v4 as jest.Mock;
  let component: ReactWrapper;
  let fetchRankedFieldsMock = fetchRankedFields as jest.Mock;

  beforeEach(() => {
    component = mount(<AnalyticsTestComponent />);
    fetchRankedFieldsMock.mockReturnValue(Promise.resolve(rankedOptions));
    uuidMockv4
      .mockImplementationOnce(() => 'sessionId-1')
      .mockImplementationOnce(() => 'sessionId-2');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // test helpers
  const matchRemoveValueActionAnalytic = (
    action: 'deselect-option' | 'remove-value' | 'pop-value',
  ) => {
    const value: ValueType<OptionType> = {
      value: '2',
      label: 'Melbourne',
    };
    const actionMeta: ActionMeta =
      action === 'deselect-option'
        ? {
            action: action,
            name: '2',
            option: value,
          }
        : {
            action: action,
            name: '2',
            removedValue: value,
          };
    // @ts-ignore
    component
      ?.find('AtlaskitSelect')
      ?.props()
      // @ts-ignore
      ?.onChange(value, actionMeta);
    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'removed',
          actionSubject: 'option',
          attributes: {
            removedItem: '2',
          },
        },
      },
      'fabric-elements',
    );
  };

  it('should trigger an optionSelectionSession started event with context attributes', async () => {
    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'started',
          actionSubject: 'optionSelectionSession',
          containerId: 'container1',
          eventType: 'ui',
          userId: 'principalId1',
          attributes: {
            fieldId: 'field1',
            tenantId: 'tenant123',
            userId: 'principalId1',
          },
        },
      },
      'fabric-elements',
    );
  });

  it('should trigger an optionSelectionSession started event with a session and journey id', async () => {
    expect(onEvent).toHaveBeenCalledTimes(1);
    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'started',
          actionSubject: 'optionSelectionSession',
          attributes: {
            sessionId: 'sessionId-1',
            journeyId: 'sessionId-1',
          },
        },
      },
      'fabric-elements',
    );
  });

  it('should trigger an option changed event with hashed values', async () => {
    component = mount(
      <AnalyticsTestComponent smartContext={{ requiresHashing: true }} />,
    );
    const value: ValueType<OptionType> = {
      value: '2',
      label: 'Melbourne',
    };
    const actionMeta: ActionMeta = {
      action: 'select-option',
      name: 'Melbourne',
      option: value,
    };
    const props = component.find('AtlaskitSelect').props();
    act(() => {
      // @ts-ignore
      props.onChange(value, actionMeta);
    });
    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'changed',
          actionSubject: 'option',
          eventType: 'ui',
          userId: 'principalId1',
          containerId: 'container1',
          attributes: {
            optionIds: [
              'a0a256247a769d94b81277810fc083cf1cef6ae2',
              'c548ff40966623961ac6b69a10b306d149ceb27e',
              '567bf76889fc2939a62fb5c0da7e28c29b08ff40',
            ],
            options: [
              '8c6cd418ee9f8b249925a0e077dc6c442bcf3046',
              '26c13c61c1c9ac3ffc55147a17afda3d401b3a15',
              'f02bc4b199c96a5dea170f146b3e62fc611ad152',
            ],
            optionsLengths: [6, 9, 8],
            selectedOption: 'c548ff40966623961ac6b69a10b306d149ceb27e', //hashed value
            selectedOptions: ['26c13c61c1c9ac3ffc55147a17afda3d401b3a15'],
            selectedOptionIds: ['c548ff40966623961ac6b69a10b306d149ceb27e'],
            selectedOptionsLengths: [9],
            selectedOrder: 1,
          },
        },
      },
      'fabric-elements',
    );
  });

  it('should trigger an option changed event with payload that considers grouped input structure', async () => {
    const value: ValueType<OptionType> = {
      value: '2',
      label: 'Melbourne',
    };
    const actionMeta: ActionMeta = {
      action: 'select-option',
      name: 'Melbourne',
      option: value,
    };

    component = mount(
      <AnalyticsTestComponent
        smartContext={{ requiresHashing: false }}
        options={groupedOptions}
      />,
    );
    const props = component.find('AtlaskitSelect').props();
    act(() => {
      // @ts-ignore
      props.onChange(value, actionMeta);
    });
    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'changed',
          actionSubject: 'option',
          eventType: 'ui',
          userId: 'principalId1',
          containerId: 'container1',
          attributes: {
            groupingSize: 2, // two groups (Cities vs Towns)
            optionIds: ['1', '2', '3', '3'],
            options: ['Sydney', 'Melbourne', 'Brisbane', 'Brisbane'],
            optionsLengths: [6, 9, 8, 8],
            selectedOption: '2',
            selectedOptions: ['Melbourne'],
            selectedOptionIds: ['2'],
            selectedOptionsLengths: [9],
            selectedOrder: 1,
          },
        },
      },
      'fabric-elements',
    );
  });

  it('should trigger an option changed event and restart the session', async () => {
    const value: ValueType<OptionType> = {
      value: '2',
      label: 'Melbourne',
    };
    const actionMeta: ActionMeta = {
      action: 'select-option',
      name: 'Melbourne',
      option: value,
    };

    component = mount(<AnalyticsTestComponent />);
    const props = component.find('AtlaskitSelect').props();
    act(() => {
      // @ts-ignore
      props.onChange(value, actionMeta);
    });

    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'started',
          actionSubject: 'optionSelectionSession',
          attributes: {
            sessionId: 'sessionId-1',
            journeyId: 'sessionId-1',
          },
        },
      },
      'fabric-elements',
    );
    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'changed',
          actionSubject: 'option',
          eventType: 'ui',
          userId: 'principalId1',
          containerId: 'container1',
          attributes: {
            optionIds: ['1', '2', '3'],
            options: ['Sydney', 'Melbourne', 'Brisbane'],
            optionsLengths: [6, 9, 8],
            selectedOption: '2',
            selectedOptions: ['Melbourne'],
            selectedOptionIds: ['2'],
            selectedOptionsLengths: [9],
            selectedOrder: 1,
            sessionId: 'sessionId-1',
            journeyId: 'sessionId-1',
          },
        },
      },
      'fabric-elements',
    );
    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'ended',
          actionSubject: 'optionSelectionSession',
          attributes: {
            sessionId: 'sessionId-1',
            journeyId: 'sessionId-1',
          },
        },
      },
      'fabric-elements',
    );
    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'started',
          actionSubject: 'optionSelectionSession',
          attributes: {
            sessionId: 'sessionId-2',
            journeyId: 'sessionId-1', // journeyId remains consistent across mount cycle
          },
        },
      },
      'fabric-elements',
    );
  });

  it('should trigger option changed when new option is created', async () => {
    const value: ValueType<OptionType> = {
      value: '5',
      label: 'Auckland',
    };
    const actionMeta: ActionMeta = {
      action: 'create-option',
      name: 'Auckland',
    };
    const props = component.find('AtlaskitSelect').props();
    act(() => {
      // @ts-ignore
      props.onChange(value, actionMeta);
    });
    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'changed',
          actionSubject: 'option',
        },
      },
      'fabric-elements',
    );
  });

  it('should trigger an option removed event when deselect-value', async () => {
    matchRemoveValueActionAnalytic('deselect-option');
  });

  it('should trigger an option removed event on pop-value action', async () => {
    matchRemoveValueActionAnalytic('pop-value');
  });

  it('should trigger an option removed event on remove-value action', async () => {
    matchRemoveValueActionAnalytic('remove-value');
  });

  it('should trigger an optionSelect opened event', async () => {
    // @ts-ignore
    component.find('AtlaskitSelect').props().onMenuOpen();
    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'opened',
          actionSubject: 'optionSelect',
        },
      },
      'fabric-elements',
    );
  });

  it('should trigger an optionSelect closed event', async () => {
    // @ts-ignore
    component.find('AtlaskitSelect').props().onMenuClose();
    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'closed',
          actionSubject: 'optionSelect',
        },
      },
      'fabric-elements',
    );
  });

  it('should trigger a filter changed event on set-value input event', async () => {
    const inputActionMeta: InputActionMeta = {
      action: 'set-value',
    };
    let select = component.find('AtlaskitSelect');
    // @ts-ignore
    select.props().onInputChange('Oliver', inputActionMeta);
    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'changed',
          actionSubject: 'filter',
        },
      },
      'fabric-elements',
    );
  });

  it('should trigger a filter changed event on input-change input event', async () => {
    const inputActionMeta: InputActionMeta = {
      action: 'input-change',
    };
    let select = component.find('AtlaskitSelect');
    // @ts-ignore
    select.props().onInputChange('Oliver', inputActionMeta);
    expect(onEvent).toMatchCall(
      {
        payload: {
          action: 'changed',
          actionSubject: 'filter',
        },
      },
      'fabric-elements',
    );
  });
});
