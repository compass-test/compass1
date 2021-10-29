import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderResult } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import ChooseToMigrateApps from '../ChooseToMigrateApps';

const RADIO_ALL_LABEL_TEST_ID =
  'choose-to-migrate-apps-option-all--radio-label';
const RADIO_ALL_INPUT_TEST_ID =
  'choose-to-migrate-apps-option-all--radio-input';
const RADIO_INPUT_NONE_TEST_ID =
  'choose-to-migrate-apps-option-none--radio-input';

const DESCRIPTION_SELECT_ALL_ENABLED =
  'We will migrate the data of the apps you selected where an automated migration path exists.';
const DESCRIPTION_SELECT_ALL_DISABLED =
  'Assign statuses in your App assessment, and we’ll migrate the data if an automated migration path exists.';

const TOOLTIP_WHEN_CORE_DATA_IS_NOT_SELECTED =
  'Select core data. In JCMA it will be either projects/users and in CCMA spaces/users';

describe('ChooseToMigrateApps', () => {
  describe('When there are apps to be migrated', () => {
    const mockChange = jest.fn();
    let wrapper: RenderResult;
    beforeEach(() => {
      wrapper = render(
        <IntlProvider locale="en">
          <ChooseToMigrateApps
            selectedValue="none"
            appsCount={5}
            isCoreDataSelected
            isLoading={false}
            descriptionOnSelectAllEnabled={DESCRIPTION_SELECT_ALL_ENABLED}
            descriptionOnSelectAllDisabled={DESCRIPTION_SELECT_ALL_DISABLED}
            toolTipContentIfCoreDataNotSelected={
              TOOLTIP_WHEN_CORE_DATA_IS_NOT_SELECTED
            }
            onChange={mockChange}
          />
        </IntlProvider>,
      );
    });

    it('then the radio button selection should be none by default', () => {
      const { getByTestId } = wrapper;
      const radioButtonSelectAll = getByTestId(RADIO_ALL_INPUT_TEST_ID);
      const radioButtonSelectNone = getByTestId(RADIO_INPUT_NONE_TEST_ID);

      expect(radioButtonSelectAll).not.toHaveAttribute('checked');
      expect(radioButtonSelectNone).toHaveAttribute('checked');
    });

    it('then all selection is enabled', () => {
      const { getByTestId } = wrapper;
      const radioButtonSelectAll = getByTestId(RADIO_ALL_INPUT_TEST_ID);

      expect(radioButtonSelectAll).toBeEnabled();
    });

    it('then the description for the select all option should match the text', () => {
      const { getByTestId } = wrapper;
      const radioButtonSelectAllLabel = getByTestId(RADIO_ALL_LABEL_TEST_ID);

      expect(radioButtonSelectAllLabel.textContent).toContain(
        DESCRIPTION_SELECT_ALL_ENABLED,
      );
    });

    it('then the all selection displays the count of apps to be migrated', () => {
      const { getByTestId } = wrapper;
      const radioButtonLabelSelectAll = getByTestId(RADIO_ALL_LABEL_TEST_ID);

      expect(radioButtonLabelSelectAll.textContent).toContain(
        '5 marked as Needed in cloud with a migration path',
      );
    });
  });

  describe('When the server has no apps to be migrated', () => {
    const mockChange = jest.fn();
    let wrapper: RenderResult;
    beforeEach(() => {
      wrapper = render(
        <IntlProvider locale="en">
          <ChooseToMigrateApps
            selectedValue="none"
            appsCount={0}
            isCoreDataSelected
            isLoading={false}
            descriptionOnSelectAllEnabled={DESCRIPTION_SELECT_ALL_ENABLED}
            descriptionOnSelectAllDisabled={DESCRIPTION_SELECT_ALL_DISABLED}
            toolTipContentIfCoreDataNotSelected={
              TOOLTIP_WHEN_CORE_DATA_IS_NOT_SELECTED
            }
            onChange={mockChange}
          />
        </IntlProvider>,
      );
    });

    it('then radio button set should select "none" by default', () => {
      const { getByTestId } = wrapper;
      const radioButtonSelectNone = getByTestId(RADIO_INPUT_NONE_TEST_ID);

      expect(radioButtonSelectNone).toHaveAttribute('checked');
    });

    it('then radio button "All" should be disabled', () => {
      const { getByTestId } = wrapper;
      const radioButtonSelectAll = getByTestId(RADIO_ALL_INPUT_TEST_ID);

      expect(radioButtonSelectAll).toBeDisabled();
    });

    it('then the description for the select all option should match the text', () => {
      const { getByTestId } = wrapper;
      const radioButtonSelectAllLabel = getByTestId(RADIO_ALL_LABEL_TEST_ID);

      expect(radioButtonSelectAllLabel.textContent).toContain(
        DESCRIPTION_SELECT_ALL_DISABLED,
      );
    });
  });

  describe('When there is no core data selected', () => {
    const mockChange = jest.fn();

    let wrapper: RenderResult;
    beforeEach(() => {
      wrapper = render(
        <IntlProvider locale="en">
          <ChooseToMigrateApps
            selectedValue="none"
            appsCount={5}
            isCoreDataSelected={false}
            isLoading={false}
            descriptionOnSelectAllEnabled={DESCRIPTION_SELECT_ALL_ENABLED}
            descriptionOnSelectAllDisabled={DESCRIPTION_SELECT_ALL_DISABLED}
            toolTipContentIfCoreDataNotSelected={
              TOOLTIP_WHEN_CORE_DATA_IS_NOT_SELECTED
            }
            onChange={mockChange}
          />
        </IntlProvider>,
      );
    });

    it('then “none“ is selected by default', () => {
      const { getByTestId } = wrapper;
      const radioButtonSelectNone = getByTestId(RADIO_INPUT_NONE_TEST_ID);

      expect(radioButtonSelectNone).toHaveAttribute('checked');
    });

    it('then “all“ selection option is disabled', () => {
      const { getByTestId } = wrapper;
      const radioButtonSelectAll = getByTestId(RADIO_ALL_INPUT_TEST_ID);

      expect(radioButtonSelectAll).toBeDisabled();
    });

    it('then the description for the select all option should match the text', () => {
      const { getByTestId } = wrapper;
      const radioButtonSelectAllLabel = getByTestId(RADIO_ALL_LABEL_TEST_ID);

      expect(radioButtonSelectAllLabel.textContent).toContain(
        DESCRIPTION_SELECT_ALL_DISABLED,
      );
    });
  });

  describe('When the number of apps that needs to be migrated is being fetched', () => {
    const mockChange = jest.fn();
    let wrapper: RenderResult;
    beforeEach(() => {
      wrapper = render(
        <IntlProvider locale="en">
          <ChooseToMigrateApps
            selectedValue="none"
            appsCount={undefined}
            isCoreDataSelected
            isLoading
            descriptionOnSelectAllEnabled={DESCRIPTION_SELECT_ALL_ENABLED}
            descriptionOnSelectAllDisabled={DESCRIPTION_SELECT_ALL_DISABLED}
            toolTipContentIfCoreDataNotSelected={
              TOOLTIP_WHEN_CORE_DATA_IS_NOT_SELECTED
            }
            onChange={mockChange}
          />
        </IntlProvider>,
      );
    });

    it('then none is selected', () => {
      const { getByTestId } = wrapper;
      const radioButtonSelectNone = getByTestId(RADIO_INPUT_NONE_TEST_ID);

      expect(radioButtonSelectNone).toHaveAttribute('checked');
    });

    it('then All is disabled', () => {
      const { getByTestId } = wrapper;
      const radioButtonSelectAll = getByTestId(RADIO_ALL_INPUT_TEST_ID);

      expect(radioButtonSelectAll).toBeDisabled();
    });

    it('then the description for the select all option should match the text', () => {
      const { getByTestId } = wrapper;
      const radioButtonSelectAllLabel = getByTestId(RADIO_ALL_LABEL_TEST_ID);

      expect(radioButtonSelectAllLabel.textContent).toContain(
        DESCRIPTION_SELECT_ALL_DISABLED,
      );
    });
  });

  describe('Given the selectedValue is "all"', () => {
    const mockChange = jest.fn();
    it('then "All" radio button is selected', () => {
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <ChooseToMigrateApps
            selectedValue="all"
            appsCount={5}
            isCoreDataSelected
            isLoading={false}
            descriptionOnSelectAllEnabled={DESCRIPTION_SELECT_ALL_ENABLED}
            descriptionOnSelectAllDisabled={DESCRIPTION_SELECT_ALL_DISABLED}
            toolTipContentIfCoreDataNotSelected={
              TOOLTIP_WHEN_CORE_DATA_IS_NOT_SELECTED
            }
            onChange={mockChange}
          />
        </IntlProvider>,
      );
      const radioButtonSelectAll = getByTestId(RADIO_ALL_INPUT_TEST_ID);

      expect(radioButtonSelectAll).toHaveAttribute('checked');
    });
  });
});
