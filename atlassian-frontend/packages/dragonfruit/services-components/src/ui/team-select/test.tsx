import React from 'react';

import { mount } from 'enzyme';

import {
  CompassTestProvider,
  waitForElements,
} from '@atlassian/dragonfruit-testing';

import {
  TeamSelectFailureLoadingOptions,
  TeamSelectNoResults,
  TeamSelectSuccess,
  TeamSelectWithDefault,
  TeamSelectWithDefaultForbidden,
  TeamSelectWithDefaultGenericError,
  TeamSelectWithDefaultNotFound,
} from './examples';
import {
  NoOptionsMessageDefault,
  NoOptionsMessageError,
} from './no-options-message';
import {
  SingleValue,
  SingleValueForbidden,
  SingleValueGenericError,
  SingleValueNotFound,
} from './single-value';

describe('TeamSelect', () => {
  describe('without default team', () => {
    it('should allow a user to select an option', async () => {
      const wrapper = mount(
        <CompassTestProvider locale="en">
          <TeamSelectSuccess />
        </CompassTestProvider>,
      );

      // Open dropdown menu
      const dropdownIndicator = wrapper.find(`[aria-label="open"]`).first();
      dropdownIndicator.simulate('mouseDown', { button: 0 });

      // Select option
      const options = await waitForElements(wrapper, 'Option');
      options.first().simulate('click');

      // Check selected option
      const selectedValue = wrapper.find(SingleValue).first();
      expect(selectedValue.text()).toEqual('Compass Crux');
    });

    it('should display an empty state message if there are no options', async () => {
      const wrapper = mount(
        <CompassTestProvider locale="en">
          <TeamSelectNoResults />
        </CompassTestProvider>,
      );

      // Open dropdown menu
      const dropdownIndicator = wrapper.find(`[aria-label="open"]`).first();
      dropdownIndicator.simulate('mouseDown', { button: 0 });

      // Check no options message
      const noOptionsMessage = await waitForElements(
        wrapper,
        NoOptionsMessageDefault,
      );
      expect(noOptionsMessage.text()).toEqual('No matches found');
    });

    it('should display a failure message if failed to fetch options', async () => {
      const wrapper = mount(
        <CompassTestProvider locale="en">
          <TeamSelectFailureLoadingOptions />
        </CompassTestProvider>,
      );

      // Open dropdown menu
      const dropdownIndicator = wrapper.find(`[aria-label="open"]`).first();
      dropdownIndicator.simulate('mouseDown', { button: 0 });

      // Check no options message
      const noOptionsMessage = await waitForElements(
        wrapper,
        NoOptionsMessageError,
      );
      expect(noOptionsMessage.text()).toContain(
        "We couldn't load the team list.",
      );
    });
  });

  describe('with default team', () => {
    it('should display default team as selected option', async () => {
      const wrapper = mount(
        <CompassTestProvider locale="en">
          <TeamSelectWithDefault />
        </CompassTestProvider>,
      );

      // Check selected option
      // We need to wait for correct text to appear because the loading state is displayed first
      const selectedValue = await waitForElements(
        wrapper,
        SingleValue,
        'Compass Crux',
      );
      expect(selectedValue.at(0).text()).toEqual('Compass Crux');
    });

    it('should display failure label if failed to fetch team details', async () => {
      const wrapper = mount(
        <CompassTestProvider locale="en">
          <TeamSelectWithDefaultGenericError />
        </CompassTestProvider>,
      );

      // Check selected option
      // We need to wait for correct text to appear because the loading state is displayed first
      const selectedValue = await waitForElements(
        wrapper,
        SingleValueGenericError,
        'Error loading data',
      );
      expect(selectedValue.at(0).text()).toEqual('Error loading data');
    });

    it('should display access restricted label if no permission to view team details', async () => {
      const wrapper = mount(
        <CompassTestProvider locale="en">
          <TeamSelectWithDefaultForbidden />
        </CompassTestProvider>,
      );

      // Check selected option
      // We need to wait for correct text to appear because the loading state is displayed first
      const selectedValue = await waitForElements(
        wrapper,
        SingleValueForbidden,
        'Request access to view',
      );
      expect(selectedValue.at(0).text()).toEqual('Request access to view');
    });

    it('should display team deleted label if team does not exist', async () => {
      const wrapper = mount(
        <CompassTestProvider locale="en">
          <TeamSelectWithDefaultNotFound />
        </CompassTestProvider>,
      );

      // Check selected option
      // We need to wait for correct text to appear because the loading state is displayed first
      const selectedValue = await waitForElements(
        wrapper,
        SingleValueNotFound,
        'Team deleted',
      );
      expect(selectedValue.at(0).text()).toEqual('Team deleted');
    });
  });
});
