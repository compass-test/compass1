import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import ConsentModal from './index';

describe('Given an app needs to be migrated', () => {
  const onConsent = jest.fn();
  const onClose = jest.fn();
  const props = {
    onConsent,
    onClose,
    vendorName: 'KDN Software',
    name: 'Maps ProExtra',
    appKey: '123',
    logoUrl: '',
    isVendorHighlighted: false,
    dataScopes: [],
    privacyPolicyUrl: '',
    contactVendorUrl: '',
  };

  beforeEach(() => {
    onClose.mockReset();
    onConsent.mockReset();
  });

  it("should be able to click the 'Confirm' button", () => {
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <ConsentModal {...props} />
      </IntlProvider>,
    );
    const button = getByTestId('appConsentModalConfirm');

    userEvent.click(button);
    expect(button.textContent).toBe('Confirm');
    expect(onConsent).toHaveBeenCalledTimes(1);
  });

  it("should be able to click the 'Cancel' button", () => {
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <ConsentModal {...props} />
      </IntlProvider>,
    );
    const button = getByTestId('appConsentModalCancel');
    userEvent.click(button);
    expect(button.textContent).toBe('Cancel');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  describe('Given the app is from a top vendor', () => {
    it("should display 'Top vendor' icon", () => {
      const { queryByLabelText } = render(
        <IntlProvider locale="en">
          <ConsentModal {...props} isVendorHighlighted={true} />
        </IntlProvider>,
      );

      expect(queryByLabelText('Top vendor')).toBeInTheDocument();
    });
  });

  describe('Given the app is NOT from a top vendor', () => {
    it("should not display 'Top vendor' label", () => {
      const { queryByTestId } = render(
        <IntlProvider locale="en">
          <ConsentModal {...props} isVendorHighlighted={false} />
        </IntlProvider>,
      );
      const label = queryByTestId('topVendorLabel');

      expect(label).not.toBeInTheDocument();
    });
  });

  describe('Given the app has a list of scope items', () => {
    it('should render a list of scope item descriptions', () => {
      const { getByRole } = render(
        <IntlProvider locale="en">
          <ConsentModal
            {...props}
            dataScopes={['APP_DATA_OTHER', 'APP_DATA_PII', 'APP_DATA_SECURITY']}
          />
        </IntlProvider>,
      );
      const list = getByRole('list');

      expect(list.childElementCount).toBe(3);
    });
  });

  describe('Given the app has NO scope items', () => {
    it('should not render a list of scope item descriptions', () => {
      const { getByRole } = render(
        <IntlProvider locale="en">
          <ConsentModal {...props} dataScopes={[]} />
        </IntlProvider>,
      );
      const list = getByRole('list');

      expect(list.childElementCount).toBe(0);
    });
  });

  describe('Given the vendor has a "Privacy policy" link', () => {
    it("should render the vendor's privacy policy link in the terms", () => {
      const url = 'vendor-privacy-url';
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <ConsentModal {...props} privacyPolicyUrl={url} />
        </IntlProvider>,
      );
      const link = getByTestId('vendorPrivacyPolicyLink');

      expect(link.textContent).toBe('privacy policy');
      expect(link).toHaveAttribute('href', url);
    });
  });

  describe('Given the vendor has a "Terms of use" link', () => {
    it("should render the vendor's terms of use link in the terms", () => {
      const url = 'vendor-terms-of-use-url';
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <ConsentModal {...props} contactVendorUrl={url} />
        </IntlProvider>,
      );
      const link = getByTestId('vendorTermsLink');

      expect(link.textContent).toBe('terms of use');
      expect(link).toHaveAttribute('href', url);
    });
  });
});
