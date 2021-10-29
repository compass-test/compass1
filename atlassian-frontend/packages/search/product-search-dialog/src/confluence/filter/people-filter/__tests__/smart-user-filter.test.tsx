import React from 'react';
import SmartUserFilter, {
  mapOptionDataToOptionType,
} from '../smart-user-filter';
import { FilterOptionSource } from '../../../../common/filters/types';
import {
  OnChange,
  OptionData,
  SmartUserPicker,
  SmartUserPickerProps,
} from '@atlaskit/user-picker';
import { shallow, ShallowWrapper } from 'enzyme';
import { OptionType } from '@atlassian/search-dialog';
import { PeopleFilterOption } from '../../../../confluence/filter-context';
import { useClients } from '../../../clients';

const loadOptions = jest.fn();
const refocusEditLink = jest.fn();
const onConfirmMock = jest.fn();
const onMenuClosedMock = jest.fn();

jest.mock('../../../clients', () => ({
  useClients: jest.fn(),
}));

const defaultOptions: OptionType<PeopleFilterOption>[] = [
  {
    label: 'Test',
    value: {
      id: '12345',
      isChecked: false,
      isVisible: true,
      filterSource: FilterOptionSource.SMART_USER_PICKER,
      displayName: 'Bob',
      avatarUrl: 'myavatar.com',
    },
  },
];

const filterProps = {
  placeholderText: 'Search Here',
  loadOptions,
  defaultOptions,
  refocusEditLink,
  isEdit: true,
};

const render = (): ShallowWrapper =>
  shallow(
    <SmartUserFilter
      {...filterProps}
      onConfirm={onConfirmMock}
      onMenuClosed={onMenuClosedMock}
    />,
  );

const mockUser: OptionData = {
  type: 'user',
  id: '12345',
  name: 'Bob',
  avatarUrl: 'myavatar.com',
};

describe('SmartUserFilter component', () => {
  let mockUseClients = useClients as jest.Mock;

  beforeEach(() => {
    (mockUseClients as jest.Mock).mockImplementation().mockReturnValue({
      cloudId: 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Will call onConfirm when a value is selected via onChange in the SmartUserPicker', async () => {
    let optionType = mapOptionDataToOptionType(mockUser);

    expect(optionType).toEqual({
      label: 'Bob',
      value: {
        avatarUrl: 'myavatar.com',
        displayName: 'Bob',
        id: '12345',
        isChecked: true,
        isVisible: true,
        filterSource: FilterOptionSource.SMART_USER_PICKER,
      },
    });
  });

  test('Will call onConfirm and pass the user as a OptionType', async () => {
    const smartUserPicker = render().find(SmartUserPicker);
    const props: SmartUserPickerProps = smartUserPicker.props();
    const onChange = props.onChange as OnChange;
    const user1 = mockUser;
    onChange(user1, 'select-option');

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
    expect(onConfirmMock).toHaveBeenCalledWith(
      mapOptionDataToOptionType(mockUser),
    );
  });

  test('Will setIsEdit to false upon call to onChange', async () => {
    const smartUserPicker = render().find(SmartUserPicker);
    const props: SmartUserPickerProps = smartUserPicker.props();
    const onChange = props.onChange as OnChange;
    const user1 = mockUser;
    onChange(user1, 'select-option');

    expect(onMenuClosedMock).toHaveBeenCalledTimes(1);
  });

  test('Will refocusEditLink be called when onBlur is called', async () => {
    const smartUserPicker = render().find(SmartUserPicker);
    const props: SmartUserPickerProps = smartUserPicker.props();
    props.onBlur && props.onBlur();

    expect(refocusEditLink).toHaveBeenCalledTimes(1);
  });
});

describe('SmartUserPicker props', () => {
  test('Is the correct fieldId prop being passed into SmartUserPicker', async () => {
    const smartUserPicker = render().find(SmartUserPicker);
    const props: SmartUserPickerProps = smartUserPicker.props();
    const fieldId = props.fieldId;

    expect(fieldId).toEqual('quickSearch');
  });

  test('Is the correct productKey prop being passed into SmartUserPicker', async () => {
    const smartUserPicker = render().find(SmartUserPicker);
    const props: SmartUserPickerProps = smartUserPicker.props();
    const productKey = props.productKey;

    expect(productKey).toEqual('confluence');
  });

  test('Is the correct principalId prop being passed into SmartUserPicker', async () => {
    const smartUserPicker = render().find(SmartUserPicker);
    const props: SmartUserPickerProps = smartUserPicker.props();
    const principalId = props.principalId;

    expect(principalId).toEqual('Context');
  });
});
