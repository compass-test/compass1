import React from 'react';

import { mount } from 'enzyme';

import Form, {
  ErrorMessage,
  Field,
  HelperMessage,
  ValidMessage,
} from '@atlaskit/form';
import Select from '@atlaskit/select';

import { RunnerAction } from '../../../types';
import ConfigureStep from '../../ConfigureStep';
import ErrorCard from '../../ErrorCard';
import { FlagProvider } from '../../FlagContext';

describe('<ConfigureStep />', () => {
  const defaultProps = (
    isReconfiguringRunner: boolean,
    actionError: boolean | string,
    runnerAction: RunnerAction,
  ) => {
    return {
      onSubmit: jest.fn(),
      customName: '',
      customLabels: [],
      isReconfiguringRunner: isReconfiguringRunner,
      runnerAction: runnerAction,
      runnerActionError: actionError,
    };
  };

  it('should render component', () => {
    const component = mount(
      <FlagProvider initialFlags={{ windowsEnabled: false }}>
        <ConfigureStep {...defaultProps(false, false, RunnerAction.CREATE)} />,
      </FlagProvider>,
    );
    expect(component.find(Form).length).toBe(1);
    expect(component.find(Field).length).toBe(2);
    expect(component.find(HelperMessage).length).toBe(1);
    expect(component.find(ValidMessage).length).toBe(0);
    expect(component.find(ErrorMessage).length).toBe(0);
    expect(component.find(Select).length).toBe(2);
    expect(component.find(Select).get(0).props.options.length).toBe(1);
  });

  it('should not render errorCard component when no create runner error', () => {
    const component = mount(
      <ConfigureStep {...defaultProps(false, false, RunnerAction.CREATE)} />,
    );
    expect(component.find(ErrorCard).length).toBe(0);
  });

  it('should render errorCard component on create runner error', () => {
    const component = mount(
      <ConfigureStep
        {...defaultProps(false, 'custom error', RunnerAction.CREATE)}
      />,
    );
    expect(component.find(ErrorCard).length).toBe(1);
    expect(component.find(ErrorCard).html()).toEqual(
      expect.stringMatching(/(.*)custom error(.*)/),
    );
  });

  it('should render errorCard component with custom message on create runner error', () => {
    const component = mount(
      <ConfigureStep {...defaultProps(false, true, RunnerAction.CREATE)} />,
    );
    expect(component.find(ErrorCard).length).toBe(1);
    expect(component.find(ErrorCard).html()).toEqual(
      expect.stringMatching(
        /(.*)Something went wrong. Wait a few minutes and try again(.*)/,
      ),
    );
  });

  it('should render errorCard component on edit runner error', () => {
    const component = mount(
      <ConfigureStep {...defaultProps(true, true, RunnerAction.EDIT)} />,
    );
    expect(component.find(ErrorCard).length).toBe(1);
    expect(component.find(ErrorCard).html()).toEqual(
      expect.stringMatching(
        /(.*)Something went wrong. Wait a few minutes and try again(.*)/,
      ),
    );
  });

  it('should render errorCard component with custom message on edit runner error', () => {
    const component = mount(
      <ConfigureStep
        {...defaultProps(true, 'custom error', RunnerAction.EDIT)}
      />,
    );
    expect(component.find(ErrorCard).length).toBe(1);
    expect(component.find(ErrorCard).html()).toEqual(
      expect.stringMatching(/(.*)custom error(.*)/),
    );
  });

  it('should render windows system option when windows is enabled', () => {
    const component = mount(
      <FlagProvider initialFlags={{ windowsEnabled: true }}>
        <ConfigureStep {...defaultProps(true, false, RunnerAction.EDIT)} />,
      </FlagProvider>,
    );
    expect(component.find(Form).length).toBe(1);
    expect(component.find(Field).length).toBe(2);
    expect(component.find(HelperMessage).length).toBe(1);
    expect(component.find(ValidMessage).length).toBe(0);
    expect(component.find(ErrorMessage).length).toBe(0);
    expect(component.find(Select).length).toBe(2);
    expect(component.find(Select).get(0).props.options.length).toBe(2);
  });
});
