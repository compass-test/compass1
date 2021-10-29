import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import { ReleaseMetrics } from './ReleaseMetrics';
import useAxios from 'axios-hooks';

jest.mock('axios-hooks');

describe('ReleasesAverages', () => {
  it('should show correct text when loading', () => {
    (useAxios as any).mockReturnValue([
      { loading: true, data: undefined, error: undefined },
      jest.fn(),
    ]);
    const { getByText } = render(<ReleaseMetrics />);
    expect(getByText('Loading ..', { exact: false })).not.toBeNull();
  });
  it('should show correct message if error occurs', () => {
    (useAxios as any).mockReturnValue([
      { loading: undefined, data: undefined, error: 'oh no' },
      jest.fn(),
    ]);
    const { getByText } = render(<ReleaseMetrics />);
    expect(getByText('error getting data', { exact: false })).not.toBeNull();
  });
  it('should show correct message if no deployment data is returned', () => {
    (useAxios as any).mockReturnValue([
      {
        loading: undefined,
        data: { status: 'success', payload: {} },
        error: undefined,
      },
      jest.fn(),
    ]);
    const { getByText } = render(<ReleaseMetrics />);
    expect(getByText('no data', { exact: false })).not.toBeNull();
  });
  describe('display correct data', () => {
    beforeAll(() => {
      (useAxios as any).mockReturnValue([
        {
          loading: undefined,
          data: {
            status: 'success',
            payload: {
              averageDevelopmentDurationInDays: 5,
              averageDevelopmentDurationInDaysReleases: [
                'jinx',
                'imp',
                'hat',
                'giant',
                'fire',
                'elixer',
                'dragon',
                'cauldron',
              ],
              averageStabilisationDurationInDays: 111,
              averageStabilisationDurationInDaysReleases: [
                'hat',
                'giant',
                'fire',
                'elixer',
                'dragon',
                'cauldron',
              ],
              averageAdoptionByOneProductDurationInDays: 12,
              averageAdoptionByOneProductDurationInDaysReleases: [
                'giant',
                'fire',
                'elixer',
                'dragon',
                'cauldron',
              ],
            },
          },
          error: undefined,
        },
        jest.fn(),
      ]);
    });

    it('should show correct title', () => {
      const { getByText } = render(<ReleaseMetrics />);
      expect(getByText('Metrics')).not.toBeNull();
    });
    it('should show total days from commit to adoption', async () => {
      const { getByText } = render(<ReleaseMetrics />);
      expect(
        getByText('Average time for a commit to get adopted by one product'),
      ).not.toBeNull();
      expect(getByText('128 days')).not.toBeNull();
    });
    it('should show average development days', () => {
      const { getByText } = render(<ReleaseMetrics />);
      expect(
        getByText('Average development phase', { exact: false }),
      ).not.toBeNull();
      expect(getByText('5 days')).not.toBeNull();
    });
    it('should show average stabilization days', () => {
      const { getByText } = render(<ReleaseMetrics />);
      expect(
        getByText('Average stabilisation phase', { exact: false }),
      ).not.toBeNull();
      expect(getByText('111 days')).not.toBeNull();
    });
    it('should show average days to adoption', () => {
      const { getByText } = render(<ReleaseMetrics />);
      expect(
        getByText('Average adoption phase', { exact: false }),
      ).not.toBeNull();
      expect(getByText('12 days')).not.toBeNull();
    });
    it('should show correct information in tooltip', () => {
      const wrapper = mount(<ReleaseMetrics />);
      const totalTooltip = wrapper.find('Tooltip').get(0);
      const developmentTooltip = wrapper.find('Tooltip').get(1);
      const stabilisationTooltip = wrapper.find('Tooltip').get(2);
      const adoptionTooltip = wrapper.find('Tooltip').get(3);

      expect(totalTooltip.props.content).toBe(
        'Based on the average number of days for the development, stabilisation and adoption phases',
      );
      expect(developmentTooltip.props.content).toBe(
        'Average development phase, based on 8 releases: J, I, H, G, F, E, D, C',
      );
      expect(stabilisationTooltip.props.content).toBe(
        'Average stabilisation phase, based on 6 releases: H, G, F, E, D, C',
      );
      expect(adoptionTooltip.props.content).toBe(
        'Average adoption phase, based on 5 releases: G, F, E, D, C',
      );
    });
  });
  describe('rounding data', () => {
    beforeAll(() => {
      (useAxios as any).mockReturnValue([
        {
          loading: undefined,
          data: {
            status: 'success',
            payload: {
              averageDevelopmentDurationInDays: 5.9,
              averageDevelopmentDurationInDaysReleases: [
                'jinx',
                'imp',
                'hat',
                'giant',
                'fire',
                'elixer',
                'dragon',
                'cauldron',
              ],
              averageStabilisationDurationInDays: 111.18,
              averageStabilisationDurationInDaysReleases: [
                'hat',
                'giant',
                'fire',
                'elixer',
                'dragon',
                'cauldron',
              ],
              averageAdoptionByOneProductDurationInDays: 12.9999999,
              averageAdoptionByOneProductDurationInDaysReleases: [
                'giant',
                'fire',
                'elixer',
                'dragon',
                'cauldron',
              ],
            },
          },
          error: undefined,
        },
        jest.fn(),
      ]);
    });
    it('should not round numnber with one decimal', () => {
      const { getByText } = render(<ReleaseMetrics />);
      expect(getByText('5.9 days', { exact: true })).not.toBeNull();
    });
    it('should round number with two decimals up/down', () => {
      const { getByText } = render(<ReleaseMetrics />);
      expect(getByText('111.2 days', { exact: true })).not.toBeNull();
    });
    it('should round number to next integer', () => {
      const { getByText } = render(<ReleaseMetrics />);
      expect(getByText('13 days', { exact: true })).not.toBeNull();
    });
  });
});
