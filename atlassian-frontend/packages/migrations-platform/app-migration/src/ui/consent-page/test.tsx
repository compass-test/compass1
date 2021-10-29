import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import userEvents from '@testing-library/user-event';

import {
  AppConsentPageAllCompleted,
  AppConsentPageAllStatus,
  AppConsentPageLoading,
  AppConsentPageWithIncompleteAssessment,
} from './examples';
import type { Props } from './main';

describe('<AppConsentPage />', () => {
  let onBack: jest.MockedFunction<Props['onBack']>;
  let onClose: jest.MockedFunction<Props['onClose']>;
  let onConsent: jest.MockedFunction<Props['onConsent']>;
  let onContinue: jest.MockedFunction<Props['onContinue']>;
  let onNavigateToAssessment: jest.MockedFunction<
    Props['onNavigateToAssessment']
  >;
  let renderResult: RenderResult;

  beforeEach(() => {
    onBack = jest.fn();
    onClose = jest.fn();
    onConsent = jest.fn();
    onContinue = jest.fn();
    onNavigateToAssessment = jest.fn();
  });

  describe('given the page is loading', () => {
    beforeEach(() => {
      renderResult = render(
        <AppConsentPageLoading
          onClose={onClose}
          onConsent={onConsent}
          onContinue={onContinue}
          onNavigateToAssessment={onNavigateToAssessment}
        />,
      );
    });

    it('should not be able to continue', () => {
      userEvents.click(renderResult.getByTestId('buttonConfirm'));
      expect(onContinue).toHaveBeenCalledTimes(0);
    });
  });

  describe('given all completed consent apps', () => {
    beforeEach(() => {
      renderResult = render(
        <AppConsentPageAllCompleted
          onClose={onClose}
          onConsent={onConsent}
          onContinue={onContinue}
          onNavigateToAssessment={onNavigateToAssessment}
        />,
      );
    });

    it('should be able to continue', () => {
      userEvents.click(renderResult.getByTestId('buttonConfirm'));
      expect(onContinue).toHaveBeenCalledTimes(1);
    });

    it('should show the correct progress status', () => {
      expect(
        renderResult.queryByText('3 of 3 policies agreed'),
      ).toBeInTheDocument();
    });
  });

  describe('given mixed completed/uncompleted consent apps', () => {
    beforeEach(() => {
      renderResult = render(
        <AppConsentPageAllStatus
          onClose={onClose}
          onBack={onBack}
          onConsent={onConsent}
          onContinue={onContinue}
          onNavigateToAssessment={onNavigateToAssessment}
        />,
      );
    });

    it('should be able to navigate back the page', () => {
      userEvents.click(renderResult.getByTestId('buttonCancel'));
      expect(onBack).toHaveBeenCalledTimes(1);
    });

    it('should be able to close the page', () => {
      userEvents.click(renderResult.getByTestId('closeButton'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should be able to navigate to the assessment page', () => {
      userEvents.click(renderResult.getByTestId('buttonAssess'));
      expect(onNavigateToAssessment).toHaveBeenCalledTimes(1);
    });

    it('should not be able to continue', () => {
      userEvents.click(renderResult.getByTestId('buttonConfirm'));
      expect(onContinue).toHaveBeenCalledTimes(0);
    });

    it('should show the correct progress status', () => {
      expect(
        renderResult.queryByText('1 of 4 policies agreed'),
      ).toBeInTheDocument();
    });
  });

  describe('given there are un assessed apps', () => {
    beforeEach(() => {
      renderResult = render(
        <AppConsentPageWithIncompleteAssessment onContinue={onContinue} />,
      );
    });

    it('should not be able to continue', () => {
      userEvents.click(renderResult.getByTestId('buttonConfirm'));
      expect(onContinue).toHaveBeenCalledTimes(0);
      expect(renderResult.getByTestId('buttonConfirm')).toBeDisabled();
    });
  });
});
