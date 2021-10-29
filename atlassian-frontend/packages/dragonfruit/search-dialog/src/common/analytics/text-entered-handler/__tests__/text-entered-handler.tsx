import React from 'react';
import { shallow } from 'enzyme';
import { TextEnteredHandler } from '../text-entered-handler';

const DEBOUNCE_TIME = 0;

describe('TextEnteredHandler', () => {
  const textEntered = jest.fn();
  const query = 'abc';
  const props = {
    textEntered,
    query,
    debouncceTime: DEBOUNCE_TIME,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fire when query is updated', async () => {
    const wrapper = shallow(<TextEnteredHandler {...props} />);

    wrapper.setProps({ ...props, query: 'abcd' });
    await new Promise((resolve) => setTimeout(() => resolve(), DEBOUNCE_TIME));
    await new Promise((resolve) => setTimeout(() => resolve(), 0));

    expect(textEntered).toHaveBeenCalledTimes(1);
  });

  it('should not fire when other props are updated', async () => {
    const wrapper = shallow(<TextEnteredHandler {...props} />);

    wrapper.setProps({ ...props, searchSessionId: 'abcdefdshufhdkru' });
    await new Promise((resolve) => setTimeout(() => resolve(), DEBOUNCE_TIME));
    await new Promise((resolve) => setTimeout(() => resolve(), 0));

    expect(textEntered).toHaveBeenCalledTimes(0);
  });
});
