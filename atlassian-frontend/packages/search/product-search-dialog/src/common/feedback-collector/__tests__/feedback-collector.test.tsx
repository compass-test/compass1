import React from 'react';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';
import AkFeedbackCollector, {
  FeedbackFlag,
} from '@atlaskit/feedback-collector';
import FeedbackCollector from '../feedback-collector';
import { ABTest } from '../../clients';
import { FeedbackButton } from '../feedback-button';

jest.mock('@atlaskit/feedback-collector', () => ({
  __esModule: true,
  default: () => <div data-test-id="AkFeedbackCollector" />,
  FeedbackFlag: () => <div data-test-id="FeedbackFlag" />,
}));

jest.mock('@atlaskit/button', () => () => <div />);

jest.mock('../feedback-button', () => ({
  FeedbackButton: () => <div data-test-id="FeedbackButton" />,
}));

jest.mock('../../ab-test-provider', () => ({
  useABTest: () =>
    ({
      abTestId: 'some_ab_test',
      experimentId: 'some_experiment',
      controlId: 'some_control',
    } as ABTest),
}));

jest.mock('../../user-context', () => ({
  useUserContext: () => ({
    user: {
      name: 'some_name',
      email: 'some_email',
    },
  }),
}));

jest.mock('../../product-context', () => {
  const productContext = jest.requireActual('../../product-context');
  return Object.assign({}, productContext, {
    usePrimaryProduct: () => productContext.Products.confluence,
    useActiveProduct: () => productContext.Products.jira,
  });
});

describe('<FeedbackCollector />', () => {
  it('renders the feedback button by default', () => {
    const wrapper = mount(<FeedbackCollector />);

    expect(wrapper.find(FeedbackFlag).exists()).toBe(false);
    expect(wrapper.find(AkFeedbackCollector).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the feedback collector dialog if button is clicked', () => {
    const wrapper = mount(<FeedbackCollector />);

    act(() => {
      wrapper.find(FeedbackButton).prop('onClick')!({
        preventDefault: jest.fn(),
      } as any);
    });

    wrapper.update();

    expect(wrapper.find(FeedbackFlag).exists()).toBe(false);
    expect(wrapper.find(AkFeedbackCollector).exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the feedback flag and closes dialog if form is submitted', () => {
    const wrapper = mount(<FeedbackCollector />);

    act(() => {
      // Open the form
      wrapper.find(FeedbackButton).prop('onClick')!({
        preventDefault: jest.fn(),
      } as any);
    });

    wrapper.update();

    act(() => {
      // The feedback collector fires both onSubmit and onClose separately when submit is clicked
      wrapper.find(AkFeedbackCollector).prop('onSubmit')!({
        type: 'comment',
        description: 'Nice!',
        canBeContacted: true,
        enrollInResearchGroup: true,
      });
      wrapper.find(AkFeedbackCollector).prop('onClose')!();
    });

    wrapper.update();

    expect(wrapper.find(FeedbackFlag).exists()).toBe(true);
    expect(wrapper.find(AkFeedbackCollector).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render the feedback flag if form is cancelled', () => {
    const wrapper = mount(<FeedbackCollector />);

    act(() => {
      // Open the form
      wrapper.find(FeedbackButton).prop('onClick')!({
        preventDefault: jest.fn(),
      } as any);
    });

    wrapper.update();

    act(() => {
      // The feedback collector fires onClose only if cancelled
      wrapper.find(AkFeedbackCollector).prop('onClose')!();
    });

    wrapper.update();

    expect(wrapper.find(FeedbackFlag).exists()).toBe(false);
    expect(wrapper.find(AkFeedbackCollector).exists()).toBe(false);
  });
});
