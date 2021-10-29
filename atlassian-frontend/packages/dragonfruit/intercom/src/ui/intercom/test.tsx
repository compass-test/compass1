import React from 'react';

import { render } from '@testing-library/react';

import { UI_INTERCOM_ENABLED } from '@atlassian/dragonfruit-feature-flags';
import { useGetAccountInfo } from '@atlassian/dragonfruit-tenant-context';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { Intercom } from './index';

const mockBoot = jest.fn();
const mockAccountInfo = {
  data: {
    name: 'Bartholomew JoJo "Bart" Simpson',
    email: 'bsimpson@springfield.com',
  },
};

jest.mock('react-use-intercom', () => ({
  useIntercom: () => ({
    boot: mockBoot,
  }),
}));

jest.mock('@atlassian/dragonfruit-tenant-context', () =>
  Object.assign(
    {},
    jest.requireActual('@atlassian/dragonfruit-tenant-context'),
    {
      useGetAccountInfo: jest.fn(),
    },
  ),
);

describe('Intercom', () => {
  afterEach(() => jest.clearAllMocks());

  test('FF is off -> should not boot Intercom', async () => {
    (useGetAccountInfo as any).mockReturnValueOnce(mockAccountInfo);

    render(
      <CompassTestProvider
        flags={{
          [UI_INTERCOM_ENABLED]: false,
        }}
      >
        <Intercom />
      </CompassTestProvider>,
    );

    expect(useGetAccountInfo).toBeCalledTimes(1);
    expect(mockBoot).toBeCalledTimes(0);
  });

  test('FF is on -> should boot Intercom', async () => {
    (useGetAccountInfo as any).mockReturnValueOnce(mockAccountInfo);

    render(
      <CompassTestProvider
        flags={{
          [UI_INTERCOM_ENABLED]: true,
        }}
      >
        <Intercom />
      </CompassTestProvider>,
    );

    expect(useGetAccountInfo).toBeCalledTimes(1);
    expect(mockBoot).toBeCalledTimes(1);
    expect(mockBoot).toBeCalledWith({
      company: {
        companyId: '1a2c9aaf-25e9-4d3d-91b2-35f21a01a223',
        name: 'localhost (7550aec5-71ad-43de-8402-8f7d2d37398c)',
        website: 'localhost',
      },
      email: 'bsimpson@springfield.com',
      name: 'Bartholomew JoJo "Bart" Simpson',
      userId: '7dd4fc4403edb50ef3812f71',
    });
  });

  test('FF is on and no account info -> should not boot Intercom', async () => {
    (useGetAccountInfo as any).mockReturnValueOnce({ data: {} });

    render(
      <CompassTestProvider
        flags={{
          [UI_INTERCOM_ENABLED]: true,
        }}
      >
        <Intercom />
      </CompassTestProvider>,
    );

    expect(useGetAccountInfo).toBeCalledTimes(1);
    expect(mockBoot).toBeCalledTimes(0);
  });
});
