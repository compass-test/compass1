import React from 'react';

import { cleanup, render } from '@testing-library/react';
import { shallow } from 'enzyme';

import { SimulateClickOnKeydown } from './index';

afterEach(() => cleanup());

describe('SimulateClickOnKeydown', () => {
  it('should render as expected', () => {
    const { getByRole } = render(
      <SimulateClickOnKeydown>
        <div id="child" />
      </SimulateClickOnKeydown>,
    );

    const clickSimulatingDiv = getByRole('button');
    expect(clickSimulatingDiv).toBeDefined();

    expect(clickSimulatingDiv.tagName).toBe('DIV');
    expect(clickSimulatingDiv).toHaveAttribute('tabIndex', '0');
    expect(clickSimulatingDiv).toHaveAttribute('aria-hidden', 'true');
  });

  describe('scroll and click', () => {
    const shallowRender = () =>
      shallow(
        <SimulateClickOnKeydown>
          <div id="child" />
        </SimulateClickOnKeydown>,
      );

    it('should be simulated when pressing Enter on the div', () => {
      const wrapper = shallowRender();

      const target = { click: jest.fn(), scrollIntoView: jest.fn() };

      wrapper.find('div').filter({ role: 'button' }).simulate('keydown', {
        key: 'Enter',
        target,
        currentTarget: target,
      });

      expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
      expect(target.scrollIntoView).toHaveBeenCalledWith();
      expect(target.click).toHaveBeenCalledTimes(1);
      expect(target.click).toHaveBeenCalledWith();
    });

    it('should be simulated when pressing Space on the div', () => {
      const wrapper = shallowRender();

      const target = { click: jest.fn(), scrollIntoView: jest.fn() };

      wrapper.find('div').filter({ role: 'button' }).simulate('keydown', {
        key: ' ',
        target,
        currentTarget: target,
      });

      expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
      expect(target.scrollIntoView).toHaveBeenCalledWith();
      expect(target.click).toHaveBeenCalledTimes(1);
      expect(target.click).toHaveBeenCalledWith();
    });

    it('should not be simulated when pressing another key on the div', () => {
      const wrapper = shallowRender();

      const target = { click: jest.fn(), scrollIntoView: jest.fn() };

      wrapper.find('div').filter({ role: 'button' }).simulate('keydown', {
        key: 'a',
        target,
        currentTarget: target,
      });

      expect(target.scrollIntoView).not.toHaveBeenCalled();
      expect(target.click).not.toHaveBeenCalled();
    });

    it('should not be simulated when pressing Enter on a different element', () => {
      const wrapper = shallowRender();

      const target = { click: jest.fn(), scrollIntoView: jest.fn() };
      const currentTarget = { click: jest.fn(), scrollIntoView: jest.fn() };

      wrapper.find('div').filter({ role: 'button' }).simulate('keydown', {
        key: 'Enter',
        target,
        currentTarget,
      });

      expect(target.scrollIntoView).not.toHaveBeenCalled();
      expect(target.click).not.toHaveBeenCalled();
      expect(currentTarget.scrollIntoView).not.toHaveBeenCalled();
      expect(currentTarget.click).not.toHaveBeenCalled();
    });
  });
});
