import React from 'react';
import { shallowWithIntl } from '../../../__tests__/__fixtures__/intl-test-helpers';

import {
  ProductSearchInput,
  ProductSearchInputWithIntl,
} from '../product-search-input';

import { SearchInput } from '@atlassian/search-dialog';
import { Trigger } from '../../../common/analytics/events';
import { shallow } from 'enzyme';

jest.mock('@atlassian/search-dialog', () => ({ SearchInput: () => <div /> }));

const mockFireEvent = jest.fn();

jest.mock('../../analytics', () =>
  Object.assign({}, jest.requireActual('../../analytics'), {
    useAnalytics: () => ({
      fireAnalyticsEvent: mockFireEvent,
    }),
  }),
);

jest.mock('../../../common/search-session-provider', () => ({
  useSearchSessionId: () => 'searchSessionId',
}));

jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    useCallback: (f: any) => f,
    useContext: (context: any) => context,
  };
});

const mockUseDialogExpansionContext = jest.fn();
jest.mock('../../../extensible/dialog-expansion-context', () => {
  const actualDialog = jest.requireActual(
    '../../../extensible/dialog-expansion-context',
  );
  return {
    ...actualDialog,
    useDialogExpansionContext: () => {
      mockUseDialogExpansionContext();
      return { allowChangeExpand: jest.fn() };
    },
  };
});

const onOpen = jest.fn();
const productSearchDialogOnInput = jest.fn();
const preQueryScreenViewed = jest.fn();
const searchSessionId = 'testsessionid';

const commonProps = {
  expandedPlaceholder: 'expanded placeholder',
  collapsedPlaceholder: 'collapsed placeholder',
  searchSessionId,
  preQueryScreenViewed,
  onNavigate: () => {},
  forwardRef: null,
  onOpen,
  onInput: productSearchDialogOnInput,
  debounceTime: 0,
  value: '',
  isLoading: false,
};

describe('<SearchInputWithPlaceholder />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot when explicitly expanded', () => {
    const wrapper = shallowWithIntl(
      <ProductSearchInputWithIntl {...commonProps} isExpanded />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when explicitly collapsed', () => {
    const wrapper = shallowWithIntl(
      <ProductSearchInputWithIntl {...commonProps} isExpanded={false} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('updates value on input field onInput', () => {
    const wrapper = shallowWithIntl(
      <ProductSearchInputWithIntl {...commonProps} isExpanded />,
    );
    const searchInput = wrapper.find(SearchInput);

    // Setup
    const onInput = searchInput.prop('onInput');
    expect(wrapper.find(SearchInput).prop('value')).toBe('');

    // Execute
    onInput!('something');
    wrapper.update();

    // Assert
    expect(productSearchDialogOnInput).toHaveBeenCalledWith('something');
  });

  it("Doesn't call onInput if value hasn't changed", () => {
    const onInput = jest.fn();
    const wrapper = shallowWithIntl(
      <ProductSearchInputWithIntl
        {...commonProps}
        value="hello"
        isExpanded
        onInput={onInput}
      />,
    );

    wrapper.find(SearchInput).first().simulate('input', 'hello');

    expect(onInput).toBeCalledTimes(0);
  });

  it('calls onEnter callback correctly with when dialog is expanded', () => {
    const callback = jest.fn();
    const wrapper = shallowWithIntl(
      <ProductSearchInputWithIntl
        {...commonProps}
        isExpanded
        onEnter={callback}
      />,
    );

    // Execute
    const onEnter = wrapper.find(SearchInput).prop('onEnter');
    onEnter!('keyboard_event' as any);

    expect(callback).toBeCalledWith('keyboard_event');
    expect(callback).toBeCalledTimes(1);
  });

  it('does not call onEnter callback when dialog is collapsed', () => {
    const callback = jest.fn();
    const wrapper = shallowWithIntl(
      <ProductSearchInputWithIntl
        {...commonProps}
        isExpanded={false}
        onNavigate={callback}
      />,
    );

    // Execute
    const onEnter = wrapper.find(SearchInput).prop('onEnter');
    onEnter!('keyboard_event' as any);

    expect(callback).not.toBeCalled();
  });

  it('does not error when there is onEnterPressed callback', () => {
    const wrapper = shallowWithIntl(
      <ProductSearchInputWithIntl {...commonProps} isExpanded />,
    );

    // Execute
    const onEnter = wrapper.find(SearchInput).prop('onEnter');
    onEnter!('keyboard_event' as any);

    // We expect no errors reaching here
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  describe('onOpen', () => {
    it('is called when input is changed and the dialog is collapsed', () => {
      const wrapper = shallowWithIntl(
        <ProductSearchInputWithIntl {...commonProps} isExpanded={false} />,
      );

      expect(onOpen).not.toBeCalled();

      wrapper.find(SearchInput).prop('onInput')!('some query');

      expect(onOpen).toBeCalled();
      expect(productSearchDialogOnInput).toBeCalled();
    });

    it('is not called when input is changed and the dialog is expanded', () => {
      const wrapper = shallowWithIntl(
        <ProductSearchInputWithIntl {...commonProps} isExpanded />,
      );

      expect(onOpen).not.toBeCalled();

      wrapper.find(SearchInput).prop('onInput')!('some query');

      expect(onOpen).not.toBeCalled();
      expect(productSearchDialogOnInput).toBeCalled();
    });

    it('is called when input is clicked and the dialog is collapsed', () => {
      const wrapper = shallowWithIntl(
        <ProductSearchInputWithIntl {...commonProps} isExpanded={false} />,
      );

      expect(onOpen).not.toBeCalled();

      wrapper.find(SearchInput).prop('onClick')!({} as any);

      expect(onOpen).toBeCalled();
    });

    it('is not called when input is clicked and the dialog is collapsed', () => {
      const wrapper = shallowWithIntl(
        <ProductSearchInputWithIntl {...commonProps} isExpanded />,
      );

      expect(onOpen).not.toBeCalled();

      wrapper.find(SearchInput).prop('onClick')!({} as any);

      expect(onOpen).not.toBeCalled();
    });
  });

  describe('analytics', () => {
    it('calls preQueryScreenViewed with click trigger when input is clicked', () => {
      const wrapper = shallowWithIntl(
        <ProductSearchInputWithIntl {...commonProps} isExpanded={false} />,
      );

      wrapper.find(SearchInput).prop('onClick')!({} as any);

      expect(preQueryScreenViewed).toHaveBeenCalledWith({
        trigger: Trigger.CLICK,
        searchSessionId,
      });
    });

    it('calls preQueryScreenViewed with textEntered trigger when input is typed', () => {
      const wrapper = shallowWithIntl(
        <ProductSearchInputWithIntl {...commonProps} isExpanded={false} />,
      );

      wrapper.find(SearchInput).prop('onInput')!('some query');

      expect(preQueryScreenViewed).toHaveBeenCalledWith({
        trigger: Trigger.TEXT_ENTERED,
        searchSessionId,
      });
    });

    it("doesn't call preQueryScreenViewed when input is expanded", () => {
      const wrapper = shallowWithIntl(
        <ProductSearchInputWithIntl {...commonProps} isExpanded />,
      );

      wrapper.find(SearchInput).prop('onInput')!('some query');
      wrapper.find(SearchInput).prop('onClick')!({} as any);

      expect(preQueryScreenViewed).not.toHaveBeenCalled();
    });
  });
});

describe('ProductSearchInput', () => {
  const advancedSearchAnalyticsProps = {
    actionSubjectId: 'advancedSearchSubject',
    advancedSearchURL: 'advanced-searchh-url',
  };

  afterEach(() => {
    mockFireEvent.mockReset();
  });

  it('calls onNavigate callback correctly with correct analytics', () => {
    const callback = jest.fn();

    const wrapper = shallow(
      <ProductSearchInput
        {...commonProps}
        {...advancedSearchAnalyticsProps}
        isExpanded
        onNavigate={callback}
      />,
    );

    // Check for dialog expansion context hook
    expect(mockUseDialogExpansionContext).toHaveBeenCalled();

    // Execute
    const onEnter = wrapper.find(ProductSearchInputWithIntl).prop('onEnter');
    onEnter!('keyboard_event' as any);

    expect(callback).toBeCalledWith(
      advancedSearchAnalyticsProps.advancedSearchURL,
      'keyboard_event',
    );
    expect(callback).toBeCalledTimes(1);

    expect(mockFireEvent).toHaveBeenCalledWith({
      actionSubjectId: advancedSearchAnalyticsProps.actionSubjectId,
      action: 'selected',
      actionSubject: 'advancedSearchLink',
      attributes: {
        isLoading: false,
        newTab: false,
        trigger: 'shortcut',
      },
      eventType: 'track',
      source: 'searchDialog',
    });
  });

  it('removes inputSkeleton window object on render', () => {
    window.inputSkeletonState = {
      query: '',
      placeholder: '',
      isFocused: true,
      selectionStart: 0,
      selectionEnd: 0,
      selectionDirection: 'none',
      listeners: [],
    };

    shallowWithIntl(
      <ProductSearchInputWithIntl {...commonProps} value="hello" isExpanded />,
    );

    expect(window['inputSkeletonState']).toBe(undefined);
  });
});
