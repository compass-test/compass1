import { AddressFormValues, BillingDetails } from '../../common/types';

export const mapFromFormToBillingDetails = (
  form: AddressFormValues,
): BillingDetails => ({
  name: form.organization,
  postalAddress: {
    country: form.country,
    city: form['address-level2'],
    line1: form['address-line1'],
    line2: form['address-line2'],
    state: form['address-level1'],
    postcode: form['postal-code'],
  },
  taxId: form['tax-id'] || undefined,
});

export const mapFromBillingDetailsToForm = ({
  name,
  postalAddress,
  taxId,
}: BillingDetails): AddressFormValues => ({
  organization: name,
  country: postalAddress.country,
  'address-level2': postalAddress.city,
  'address-line1': postalAddress.line1,
  'postal-code': postalAddress.postcode,
  'address-line2': postalAddress.line2,
  'address-level1': postalAddress.state,
  'tax-id': taxId,
});
