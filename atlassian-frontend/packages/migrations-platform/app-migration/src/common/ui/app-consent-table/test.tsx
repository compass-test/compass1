import React from 'react';

import {
  BoundFunctions,
  queries,
  render,
  RenderResult,
  within,
} from '@testing-library/react';
import userEvents from '@testing-library/user-event';

import {
  CONSENT_GIVEN,
  CONSENT_NOT_GIVEN,
  CONSENT_OUTDATED,
  NO_AUTOMATED_MIGRATION_PATH,
  NO_MIGRATION_ALTERNATIVE,
  NO_MIGRATION_NEEDED,
  SERVER_APP_OUTDATED,
} from '../../mocks';

import { AppConsentTableAllStatus } from './examples';
import type { Props } from './main';

describe('<AppConsentTable />', () => {
  let onRevokeConsent: jest.MockedFunction<Props['onRevokeConsent']>;
  let onShowConsentModal: jest.MockedFunction<Props['onShowConsentModal']>;
  let renderResult: RenderResult;
  let withinQueries: BoundFunctions<typeof queries>;

  beforeEach(() => {
    onRevokeConsent = jest.fn();
    onShowConsentModal = jest.fn();
  });

  describe('given mixed completed/uncompleted consent apps', () => {
    beforeEach(() => {
      renderResult = render(
        <AppConsentTableAllStatus
          onRevokeConsent={onRevokeConsent}
          onShowConsentModal={onShowConsentModal}
        />,
      );
    });

    describe('given in the consent given row', () => {
      beforeEach(() => {
        withinQueries = within(
          renderResult.getByTestId(`consent-table--row-${CONSENT_GIVEN.key}`),
        );
      });

      it('should show success label', () => {
        const { queryByAltText, queryByLabelText } = withinQueries;

        expect(queryByAltText(CONSENT_GIVEN.name)).toBeInTheDocument();
        expect(queryByLabelText('Success')).toBeInTheDocument();
      });

      it('should be able to revoke consent ', () => {
        const { getByTestId } = withinQueries;

        userEvents.click(getByTestId('revokeAgreement'));
        expect(onRevokeConsent).toHaveBeenCalledTimes(1);
        expect(onRevokeConsent).toHaveBeenLastCalledWith(CONSENT_GIVEN.key);
      });
    });

    describe('given in the consent not given row', () => {
      beforeEach(() => {
        withinQueries = within(
          renderResult.getByTestId(
            `consent-table--row-${CONSENT_NOT_GIVEN.key}`,
          ),
        );
      });

      it('should show error label', () => {
        const { queryByAltText, queryByLabelText } = withinQueries;

        expect(queryByAltText(CONSENT_NOT_GIVEN.name)).toBeInTheDocument();
        expect(queryByLabelText('Error')).toBeInTheDocument();
      });

      it('should be able to show the policy modal', () => {
        const { getByTestId } = withinQueries;

        userEvents.click(getByTestId('showModal'));
        expect(onShowConsentModal).toHaveBeenCalledTimes(1);
        expect(onShowConsentModal).toHaveBeenLastCalledWith(
          CONSENT_NOT_GIVEN.key,
        );
      });
    });

    describe('given in the policy outdated row', () => {
      beforeEach(() => {
        withinQueries = within(
          renderResult.getByTestId(
            `consent-table--row-${CONSENT_OUTDATED.key}`,
          ),
        );
      });

      it('should show error label', () => {
        const { queryByAltText, queryByLabelText } = withinQueries;

        expect(queryByAltText(CONSENT_OUTDATED.name)).toBeInTheDocument();
        expect(queryByLabelText('Error')).toBeInTheDocument();
      });

      it('should be able to show the policy modal ', async () => {
        const { getByTestId } = withinQueries;

        userEvents.click(getByTestId('showModal'));
        expect(onShowConsentModal).toHaveBeenCalledTimes(1);
        expect(onShowConsentModal).toHaveBeenLastCalledWith(
          CONSENT_OUTDATED.key,
        );
      });
    });

    describe('given in the no automated migration row', () => {
      beforeEach(() => {
        withinQueries = within(
          renderResult.getByTestId(
            `consent-table--row-${NO_AUTOMATED_MIGRATION_PATH.key}`,
          ),
        );
      });

      it('should show the ignore label', () => {
        const { queryByAltText, queryByLabelText } = withinQueries;

        expect(
          queryByAltText(NO_AUTOMATED_MIGRATION_PATH.name),
        ).toBeInTheDocument();
        expect(queryByLabelText('The status is ignored')).toBeInTheDocument();
      });
    });

    describe('given in the no migration alternative row', () => {
      beforeEach(() => {
        withinQueries = within(
          renderResult.getByTestId(
            `consent-table--row-${NO_MIGRATION_ALTERNATIVE.key}`,
          ),
        );
      });

      it('should show the ignore label', () => {
        const { queryByAltText, queryByLabelText } = withinQueries;

        expect(
          queryByAltText(NO_MIGRATION_ALTERNATIVE.name),
        ).toBeInTheDocument();
        expect(queryByLabelText('The status is ignored')).toBeInTheDocument();
      });
    });

    describe('given in the no migration needed row', () => {
      beforeEach(() => {
        withinQueries = within(
          renderResult.getByTestId(
            `consent-table--row-${NO_MIGRATION_NEEDED.key}`,
          ),
        );
      });

      it('should show success without action label', () => {
        const { queryByAltText, queryByLabelText } = withinQueries;

        expect(queryByAltText(NO_MIGRATION_NEEDED.name)).toBeInTheDocument();
        expect(
          queryByLabelText('Success without any further action'),
        ).toBeInTheDocument();
      });
    });

    describe('given in the server app outdated row', () => {
      beforeEach(() => {
        withinQueries = within(
          renderResult.getByTestId(
            `consent-table--row-${SERVER_APP_OUTDATED.key}`,
          ),
        );
      });

      it('should show the error label', () => {
        const { queryByAltText, queryByLabelText } = withinQueries;

        expect(queryByAltText(SERVER_APP_OUTDATED.name)).toBeInTheDocument();
        expect(queryByLabelText('Error')).toBeInTheDocument();
      });
    });
  });
});
