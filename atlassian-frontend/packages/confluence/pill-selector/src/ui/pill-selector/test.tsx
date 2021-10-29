import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { defineMessages, FormattedMessage } from 'react-intl';

import { B50, N20A } from '@atlaskit/theme/colors';

import { PillSelector } from './index';

describe('PillSelector', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'pill-selector';
      const i18n = defineMessages({
        starred: {
          id: 'space-directory.filters.starred',
          defaultMessage: 'Starred',
          description:
            'Name of a filter that will show the user has starred (favorited)',
        },
      });

      const pills = [
        { name: 'starred', content: <FormattedMessage {...i18n.starred} /> },
      ];
      const defaultPill = 'starred';

      const { getByTestId } = render(
        <PillSelector
          selectedPillName={defaultPill}
          pills={pills}
          testId={testId}
        />,
      );
      expect(getByTestId(testId)).toBeTruthy();
    });

    test('Should be found by data-testid', async () => {
      const testId = 'pill-selector';
      const i18n = defineMessages({
        starred: {
          id: 'space-directory.filters.starred',
          defaultMessage: 'Starred',
          description:
            'Name of a filter that will show the user has starred (favorited)',
        },
        personal: {
          id: 'space-directory.filters.personal.v2',
          defaultMessage: 'Personal',
          description:
            "Name of a filter that will show personal spaces (previously this read 'Personal spaces' but now just says 'Personal')",
        },
      });

      const pills = [
        { name: 'starred', content: <FormattedMessage {...i18n.starred} /> },
        { name: 'personal', content: <FormattedMessage {...i18n.personal} /> },
      ];
      const defaultPill = 'starred';

      const { getByTestId } = render(
        <PillSelector
          selectedPillName={defaultPill}
          pills={pills}
          testId={testId}
        />,
      );
      expect(getByTestId('starred')).toHaveStyle(`background-color: ${B50}`);

      fireEvent.click(getByTestId('personal'));

      expect(getByTestId('starred')).toHaveStyle(`background-color: ${N20A}`);
      expect(getByTestId('starred')).toHaveStyle(`background-color: ${N20A}`);
      expect(getByTestId('personal')).toHaveStyle(`background-color: ${B50}`);
    });
  });
});
