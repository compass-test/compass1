import React from 'react';

import { cleanup, render } from '@testing-library/react';

import { ShipToDetailsPage } from '../../common/utils/page-objects/ship-to-details-page';
import { fullBillingDetails, fullShipToDetails } from '../../mocks';

import { EmptyForm, FullyPreFilledForm } from './examples';

afterEach(() => cleanup);

describe('Ship to details form', () => {
  test('Blur event on a required field causes error message to be displayed', async () => {
    const { container } = render(<EmptyForm />);

    await ShipToDetailsPage
      //
      .waitTillSettled()
      .submit();

    [
      'Company name',
      'City',
      'Address 1',
      'Postal code',
      'Country',
      'State',
    ].forEach(async (field) => {
      expect(
        await ShipToDetailsPage.addressForm(container).fieldError(field),
      ).toEqual('Required field');
    });
  });

  test('Submit handler will not be invoked if validation does not pass', async () => {
    const submitHandler = jest.fn();
    render(<EmptyForm onSubmit={submitHandler} />);

    await ShipToDetailsPage
      //
      .waitTillSettled()
      .submit();

    expect(submitHandler).toHaveBeenCalledTimes(0);
  });

  test('Submit handler will be invoked if form is full before submission', async () => {
    const submitHandler = jest.fn();
    render(<FullyPreFilledForm onSubmit={submitHandler} />);

    await ShipToDetailsPage
      //
      .waitTillSettled()
      .submit();

    expect(submitHandler).toHaveBeenCalledWith(fullShipToDetails, {
      dirty: false,
    });
  });

  test('By clicking the use billing address checkbox the details update', async () => {
    const submitHandler = jest.fn();
    render(<FullyPreFilledForm onSubmit={submitHandler} />);

    await ShipToDetailsPage
      //
      .waitTillSettled()
      .clickBillToCheckbox()
      .submit();

    expect(submitHandler).toHaveBeenCalledWith(fullBillingDetails, {
      dirty: true,
    });
  });
});
