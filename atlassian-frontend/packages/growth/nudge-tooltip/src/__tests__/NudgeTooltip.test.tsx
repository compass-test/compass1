import React from 'react';
import { mount } from 'enzyme';
import NudgeTooltip from '../components/nudge-tooltip/NudgeTooltip';
import { NudgeTooltipPulse } from '../components/shared/styled';
import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

jest.useFakeTimers();
describe('@atlassiansox/nudge-tooltip', () => {
  it('should hide pulse on click', async () => {
    const uniqueText = 'somereallyinterestinguniquetext';
    const otherUniqueText = 'someotheruniquettext';
    const onHide = jest.fn();
    let wrapper = mount(
      <NudgeTooltip
        content={uniqueText}
        delay={1}
        hideTooltipOnClick={true}
        minReadTime={900}
        onHide={onHide}
      >
        <p>{otherUniqueText}</p>
      </NudgeTooltip>,
    );

    const beforeClickPulse = wrapper.find(NudgeTooltipPulse);
    const beforeClickPulseHTML = beforeClickPulse.html();
    expect(beforeClickPulse).toHaveLength(1);

    beforeClickPulse.simulate('click');
    wrapper.update();
    const afterClickPulse = wrapper.find(NudgeTooltipPulse);
    expect(afterClickPulse).toHaveLength(1);
    // A change in classname indicates a change in the prop passed down,
    // and in this case changes the opacity from 1 to 0.
    expect(beforeClickPulseHTML).not.toEqual(afterClickPulse.html());

    afterClickPulse.simulate('click');
    wrapper.update();

    expect(onHide).toHaveBeenCalled();

    // Checks to make sure that the opacity doesnt change again
    expect(beforeClickPulseHTML).not.toEqual(
      wrapper.find(NudgeTooltipPulse).html(),
    );
  });

  it("should not hide tooltip on click when 'hideTooltipOnClik' is false", () => {
    const uniqueText = 'somereallyinterestinguniquetext';
    const otherUniqueText = 'someotheruniquettext';
    const wrapper = mount(
      <NudgeTooltip content={uniqueText} hideTooltipOnClick={false}>
        <p>{otherUniqueText}</p>
      </NudgeTooltip>,
    );

    const beforeClickPulse = wrapper.find(NudgeTooltipPulse);
    const beforeClickPulseHTML = beforeClickPulse.html();
    expect(beforeClickPulse).toHaveLength(1);

    beforeClickPulse.simulate('click');
    wrapper.update();
    const afterClickPulse = wrapper.find(NudgeTooltipPulse);
    expect(afterClickPulse).toHaveLength(1);
    // In this case there is no change in CSS, so class names should be the same
    expect(beforeClickPulseHTML).toEqual(afterClickPulse.html());
  });

  it('should mark the nudge as complete after a period of time ', async () => {
    const uniqueText = 'somereallyinterestinguniquetext';
    const otherUniqueText = 'someotheruniquettext';
    const onShow = jest.fn();
    const onHide = jest.fn();

    const tooltip = (
      <NudgeTooltip
        content={uniqueText}
        delay={1000}
        hideTooltipOnClick={true}
        minReadTime={1000}
        onShow={onShow}
        onHide={onHide}
      >
        <p>{otherUniqueText}</p>
      </NudgeTooltip>
    );

    const { queryByText, getByText, rerender } = render(tooltip);

    fireEvent.mouseOver(getByText(otherUniqueText));
    act(() => {
      jest.runAllTimers();
    });
    expect(queryByText(uniqueText)).toBeTruthy();

    expect(onShow).toHaveBeenCalled();
    fireEvent.mouseOut(getByText(otherUniqueText));
    act(() => {
      jest.runAllTimers();
    });

    rerender(tooltip);

    // Waits for exit animation to finish
    act(() => {
      jest.runAllTimers();
    });

    expect(queryByText(uniqueText)).toBeFalsy();
  });
});
