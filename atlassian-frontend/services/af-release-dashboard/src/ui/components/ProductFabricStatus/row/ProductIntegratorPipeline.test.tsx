import React from 'react';
import { ProductIntegratorPipeline } from './ProductIntegratorPipeline';
import { render } from '@testing-library/react';
import useAxios from 'axios-hooks';
import { IntegratorHistoryGet } from '../../../../server/routes/integrator-history';
import MockDate from 'mockdate';
import moment from 'moment-timezone';

jest.mock('axios-hooks');
moment.tz.setDefault('Australia/Sydney');
jest.setMock('moment', moment);

describe('ProductIntegratorStatus', () => {
  beforeEach(() => {
    (useAxios as any).mockReturnValue([
      { loading: true, data: undefined, error: undefined },
      jest.fn(),
    ]);
  });

  it('Should show table header', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <ProductIntegratorPipeline />
        </tbody>
      </table>,
    );
    expect(getByText('Product Integrator:')).not.toBeNull();
  });

  it('should show loading text', () => {
    (useAxios as any).mockReturnValue([
      { loading: true, data: undefined, error: undefined },
      jest.fn(),
    ]);
    const { getByText } = render(
      <table>
        <tbody>
          <ProductIntegratorPipeline />
        </tbody>
      </table>,
    );
    expect(getByText('Loading')).not.toBeNull();
  });

  it('should show error text', () => {
    (useAxios as any).mockReturnValue([
      { loading: undefined, data: undefined, error: true },
      jest.fn(),
    ]);
    const { getByText } = render(
      <table>
        <tbody>
          <ProductIntegratorPipeline />
        </tbody>
      </table>,
    );
    expect(getByText('Error')).not.toBeNull();
  });

  describe('data', () => {
    it('should show failed if there is no success pipeline', () => {
      MockDate.set('2021-03-03');
      const data: IntegratorHistoryGet = {
        lastFailure: {
          buildNumber: 'test-buildnumber',
          status: 'FAILED',
          pipelineTimestamp: '2021-03-01T00:00:00.000Z',
        },
        lastSuccess: undefined,
      };
      (useAxios as any).mockReturnValue([
        { loading: undefined, data, error: undefined },
        jest.fn(),
      ]);
      const { getByText } = render(
        <table>
          <tbody>
            <ProductIntegratorPipeline />
          </tbody>
        </table>,
      );
      expect(getByText('failed')).not.toBeNull();
      expect(getByText('2 days ago')).not.toBeNull();
      expect(getByText('2 days ago').closest('a')).toHaveAttribute(
        'href',
        'https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home#!/results/test-buildnumber',
      );
    });
    it('should show success if there is no failed pipeline', () => {
      MockDate.set('2021-03-03');
      const data: IntegratorHistoryGet = {
        lastFailure: undefined,
        lastSuccess: {
          buildNumber: 'test',
          status: 'SUCCESS',
          pipelineTimestamp: '2021-03-01T00:00:00.000Z',
        },
      };
      (useAxios as any).mockReturnValue([
        { loading: undefined, data, error: undefined },
        jest.fn(),
      ]);
      const { getByText } = render(
        <table>
          <tbody>
            <ProductIntegratorPipeline />
          </tbody>
        </table>,
      );
      expect(getByText('success')).not.toBeNull();
      expect(getByText('2 days ago')).not.toBeNull();
    });

    it('should show success if it is the most recent build', () => {
      MockDate.set('2021-03-05');
      const data: IntegratorHistoryGet = {
        lastFailure: {
          buildNumber: 'test',
          status: 'FAILED',
          pipelineTimestamp: '2021-03-01T00:00:00.000Z',
        },
        lastSuccess: {
          buildNumber: 'test',
          status: 'SUCCESS',
          pipelineTimestamp: '2021-03-02T00:00:00.000Z',
        },
      };
      (useAxios as any).mockReturnValue([
        { loading: undefined, data, error: undefined },
        jest.fn(),
      ]);
      const { getByText } = render(
        <table>
          <tbody>
            <ProductIntegratorPipeline />
          </tbody>
        </table>,
      );
      expect(getByText('success')).not.toBeNull();
      expect(getByText('3 days ago')).not.toBeNull();
    });

    it('should show failed if it is the most recent build', () => {
      MockDate.set('2021-03-05');
      const data: IntegratorHistoryGet = {
        lastFailure: {
          buildNumber: 'test',
          status: 'FAILED',
          pipelineTimestamp: '2021-03-02T00:00:00.000Z',
        },
        lastSuccess: {
          buildNumber: 'test',
          status: 'SUCCESS',
          pipelineTimestamp: '2021-03-01T00:00:00.000Z',
        },
      };
      (useAxios as any).mockReturnValue([
        { loading: undefined, data, error: undefined },
        jest.fn(),
      ]);
      const { getByText, getByTestId } = render(
        <table>
          <tbody>
            <ProductIntegratorPipeline />
          </tbody>
        </table>,
      );
      expect(getByText('failed')).not.toBeNull();
      expect(getByText('3 days ago', { exact: false })).not.toBeNull();
      expect(getByTestId('prev-success-build').textContent).toContain(
        'Last successful sync was 4 days ago',
      );
    });
  });
});
