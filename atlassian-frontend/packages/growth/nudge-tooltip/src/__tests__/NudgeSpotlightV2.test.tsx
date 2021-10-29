import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import NudgeSpotlight from '../components/nudge-spotlight/NudgeSpotlightV2';
// eslint-disable-next-line import/no-extraneous-dependencies
import Button from '@atlaskit/button/custom-theme-button';
import { NudgeTooltipPulse } from '../components/shared/styled';
import Portal from '@atlaskit/portal';
import { render, fireEvent, wait } from '@testing-library/react';
//hidden  should hide the entire thing (nudge / tooltip)
//autoshow should hide the tooltip only but show pulse
describe('@atlassiansox/nudge-tooltip', () => {
  let hidden: boolean;
  const setHidden = jest.fn(() => {
    hidden = true;
  });
  beforeEach(() => {
    hidden = false;
    jest.clearAllMocks();
  });

  it('should change effectively hide spotlight and pulse, while unmounting properly', async () => {
    const onClick = jest.fn();
    const onShow = jest.fn();
    const onRender = jest.fn();
    const onHide = jest.fn();

    const { getByText, queryByText, unmount } = render(
      <NudgeSpotlight
        hidden={hidden}
        setHidden={setHidden}
        content="anotherLeft"
        position="left"
        width={100}
        onClick={onClick}
        onShow={onShow}
        onRender={onRender}
        onHide={onHide}
        hideNudgeOnClick={true}
        hideSpotlightOnOutsideClick={true}
      >
        <Button onClick={() => {}}>left</Button>
      </NudgeSpotlight>,
    );
    expect(onShow).toHaveBeenCalled();
    expect(onRender).toHaveBeenCalled();
    expect(queryByText('anotherLeft')).toBeTruthy();
    fireEvent.click(getByText('left'));
    expect(setHidden).toHaveBeenCalled();
    expect(hidden).toEqual(true);
    expect(onClick).toHaveBeenCalled();

    unmount();
    expect(onHide).toHaveBeenCalled();
  });

  it('should not show the spotlight if "hidden" is true', () => {
    // Effectively renders an instance where nudge was clicked.
    const { queryByText } = render(
      <NudgeSpotlight
        hidden={true}
        setHidden={setHidden}
        content="anotherLeft"
        position="left"
        width={100}
        hideNudgeOnClick={true}
        hideSpotlightOnOutsideClick={true}
      >
        <Button onClick={() => {}}>left</Button>
      </NudgeSpotlight>,
    );
    expect(queryByText('anotherLeft')).toBeFalsy();
  });

  it('should properly set the update functions', async () => {
    let updateFunc: any = null;
    const setUpdateFunc = jest.fn((func: any) => (updateFunc = func));
    expect(updateFunc).toBeNull();
    act(() => {
      mount(
        <NudgeSpotlight
          hidden={hidden}
          setHidden={setHidden}
          content="left"
          position="left"
          width={100}
          registerUpdateFn={setUpdateFunc}
        >
          <Button onClick={() => {}}>left</Button>
        </NudgeSpotlight>,
      );
    });
    // Just making sure you can actually retrieve the internal update function
    expect(setUpdateFunc).toHaveBeenCalled();
    expect(updateFunc).not.toBeNull();
  });

  it('should not show spotlight when "autoShow" = false', () => {
    act(() => {
      const wrapper = mount(
        <NudgeSpotlight
          hidden={hidden}
          setHidden={setHidden}
          content="left"
          position="left"
          width={100}
          autoShow={false}
        >
          <Button onClick={() => {}}>left</Button>
        </NudgeSpotlight>,
      );

      expect(wrapper.find(NudgeTooltipPulse).exists()).toBeTruthy();
      expect(wrapper.find(Portal).exists()).not.toBeTruthy();
    });
  });

  it('should not call setHidden when "hideNudgeOnClick" is false', () => {
    act(() => {
      const wrapper = mount(
        <NudgeSpotlight
          hidden={hidden}
          setHidden={setHidden}
          content="left"
          position="left"
          width={100}
          hideNudgeOnClick={false}
        >
          <Button onClick={() => {}}>left</Button>
        </NudgeSpotlight>,
      );
      wrapper.find(NudgeTooltipPulse).simulate('click');
      // Prop setHidden function is what actually hides the nudge
      // so if it hasnt been called its not hidden
      expect(setHidden).toHaveBeenCalledTimes(0);
    });
  });

  it('should hide spotlight on outside click', async () => {
    const onOutsideClickThing = jest.fn(() => {});
    const { queryByText } = render(
      <NudgeSpotlight
        hidden={hidden}
        setHidden={setHidden}
        content="anotherLeft"
        position="left"
        width={100}
        onOutsideClick={onOutsideClickThing}
        hideNudgeOnClick={true}
        hideSpotlightOnOutsideClick={true}
      >
        <Button onClick={() => {}}>left</Button>
      </NudgeSpotlight>,
    );
    fireEvent.click(document);
    await wait(() => {
      fireEvent.click(document);
      expect(onOutsideClickThing).toHaveBeenCalled();
      expect(queryByText('anotherLeft')).toBeFalsy();
    });
  });
});
