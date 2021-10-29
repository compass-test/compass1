import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import {
  DisabledForAttachmentsOnly,
  DisabledForConfigOnly,
  MigratingMultiplePlans,
  MigratingOnePlan,
  NoSelection,
  NotMigratingAnyPlans,
} from './examples';

describe('<AdvancedRoadmapsTaskCard />', () => {
  describe('when in initial state', () => {
    it('should show no plans selected', () => {
      const { getByText } = render(<NoSelection />);
      expect(getByText('No plans selected')).toBeInTheDocument();
    });

    it('should show Select button', () => {
      const { getByText } = render(<NoSelection />);
      expect(getByText('Select')).toBeEnabled();
    });

    it('should fire onSelect handler when Select button is clicked', () => {
      const onSelect = jest.fn();
      const { getByText } = render(<NoSelection onSelect={onSelect} />);
      expect(onSelect).not.toHaveBeenCalled();
      fireEvent.click(getByText('Select'));
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('should show Skip button', () => {
      const { getByText } = render(<NoSelection />);
      expect(getByText(`Skip plans`)).toBeEnabled();
    });

    it('should fire onSkip handler when Skip button is clicked', () => {
      const onSkip = jest.fn();
      const { getByText } = render(<NoSelection onSkip={onSkip} />);
      expect(onSkip).not.toHaveBeenCalled();
      fireEvent.click(getByText(`Skip plans`));
      expect(onSkip).toHaveBeenCalledTimes(1);
    });
  });

  describe('when chosen to not migrate any plans', () => {
    it('should display selection text', () => {
      const { getByText } = render(<NotMigratingAnyPlans />);
      expect(getByText('0 plans')).toBeInTheDocument();
    });

    it('should display Not Migrating text', () => {
      const { getByText } = render(<NotMigratingAnyPlans />);
      expect(getByText('You haven’t selected any plans.')).toBeInTheDocument();
    });

    it('should show Edit butoon', () => {
      const { getByText } = render(<NotMigratingAnyPlans />);
      expect(getByText('Edit')).toBeEnabled();
    });
  });

  describe('when chosen to not migrate any plans and is migrating project attachements only', () => {
    it('should display proper message', () => {
      const { getByText } = render(<DisabledForAttachmentsOnly />);
      expect(
        getByText(
          'Since only project attachments are selected, no plans can be migrated.',
        ),
      ).toBeInTheDocument();
    });

    it('should show the Select button disabled', () => {
      const { getByText } = render(<DisabledForAttachmentsOnly />);
      expect(getByText('Select')).toBeDisabled();
    });
  });

  describe('when chosen to not migrate any plans and is migrating project configurations only', () => {
    it('should display proper message', () => {
      const { getByText } = render(<DisabledForConfigOnly />);
      expect(
        getByText(
          'Since only project configuration is selected, no plans can be migrated.',
        ),
      ).toBeInTheDocument();
    });

    it('should show the Select button disabled', () => {
      const { getByText } = render(<DisabledForConfigOnly />);
      expect(getByText('Select')).toBeDisabled();
    });
  });

  describe('when chosen to migrate a single plan', () => {
    it('should display the number of plan selected', () => {
      const { getByText } = render(<MigratingOnePlan />);
      expect(getByText('1 plan')).toBeInTheDocument();
    });

    it('should display a description of the selection', () => {
      const { getByText } = render(<MigratingOnePlan />);
      expect(
        getByText('Includes all associated issue sources and entities'),
      ).toBeInTheDocument();
    });
  });

  [
    {
      description: 'attachments only',
      overrideProps: { isMigratingProjectAttachmentsOnly: true },
    },
    {
      description: 'configurations only',
      overrideProps: { isMigratingProjectConfigurationsOnly: true },
    },
  ].forEach(({ description, overrideProps }) => {
    describe(`when chosen to migrate a single plan and is migrating project ${description}`, () => {
      it('should display the error icon', () => {
        const { getByRole } = render(<MigratingOnePlan {...overrideProps} />);
        expect(getByRole('img')).toHaveAttribute('aria-label', 'Error');
      });

      it('should continue to display the number of plan selected', () => {
        const { getByText } = render(<MigratingOnePlan {...overrideProps} />);
        expect(getByText('1 plan')).toBeInTheDocument();
      });

      it('should continue to display a description of the selection', () => {
        const { getByText } = render(<MigratingOnePlan {...overrideProps} />);
        expect(
          getByText('Includes all associated issue sources and entities'),
        ).toBeInTheDocument();
      });

      it('should show Edit button enabled', () => {
        const { getByText } = render(<MigratingOnePlan {...overrideProps} />);
        expect(getByText('Edit')).toBeEnabled();
      });

      it('should show Skip Plans button enabled', () => {
        const { getByText } = render(<MigratingOnePlan {...overrideProps} />);
        expect(getByText('Skip plans')).toBeEnabled();
      });

      it('should show run handler Skip Plans button enabled', () => {
        const onUnselectAllPlans = jest.fn();
        const { getByText } = render(
          <MigratingOnePlan
            {...overrideProps}
            onUnselectAllPlans={onUnselectAllPlans}
          />,
        );
        expect(onUnselectAllPlans).not.toHaveBeenCalled();
        fireEvent.click(getByText('Skip plans'));
        expect(onUnselectAllPlans).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when chosen to migrate multiples plan', () => {
    it('should display the number of plan selected', () => {
      const { getByText } = render(<MigratingMultiplePlans />);
      expect(getByText('5 plans')).toBeInTheDocument();
    });

    it('should display a description of the selection', () => {
      const { getByText } = render(<MigratingMultiplePlans />);
      expect(
        getByText('Includes all associated issue sources and entities'),
      ).toBeInTheDocument();
    });
  });
});
