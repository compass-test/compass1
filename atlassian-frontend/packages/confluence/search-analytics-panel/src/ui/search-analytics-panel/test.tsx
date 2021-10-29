import React from 'react';

import { render } from '@testing-library/react';

import { Menu } from './subcomponents/menu';
import Subtable, { SubtableBody } from './subcomponents/table';

describe('SearchAnalyticsPanel', () => {
  describe('testId property', () => {
    test('Should be found by data-testid (menu)', async () => {
      const testId = 'search-analytics-panel-menu';

      const { getByTestId } = render(<Menu testId={testId} />);
      expect(getByTestId(testId)).toBeTruthy();
    });
    test('Should be found by data-testid (table)', async () => {
      const testId = 'search-analytics-panel-table';
      const visitMetric = {
        singular: 'visit',
        plural: 'visits',
      };

      const content1 = {
        name: 'Micros',
        shouldShowAnalyticsIconOnHover: true,
        value: 102,
        metric: visitMetric,
        key: '10',
        iconUrl:
          'https://hello.atlassian.net/wiki/download/attachments/169282319/MICROS?version=4&modificationDate=1525195397590&cacheVersion=1&api=v2',
      };

      const content2 = {
        name: 'Team Anywhere',
        shouldShowAnalyticsIconOnHover: true,
        value: 30,
        iconUrl:
          'https://hello.atlassian.net/wiki/download/attachments/791846337/TEAMA?version=2&modificationDate=1596568392322&cacheVersion=1&api=v2',
        metric: visitMetric,
        key: '2',
      };
      const allContent = [content1, content2];
      const maxRows = 2;

      const { getByTestId } = render(
        <Subtable title="Most-clicked Spaces" testId={testId}>
          <SubtableBody content={allContent} maxRows={maxRows} />
        </Subtable>,
      );
      expect(getByTestId(testId)).toBeTruthy();
    });

    test('Should not show data (empty state)', async () => {
      const noDataDetails = "Users didn't click on anything during this time";
      const { getByText } = render(
        <Subtable title="Most-clicked Spaces">
          <SubtableBody content={[]} maxRows={2} />
        </Subtable>,
      );

      expect(getByText(noDataDetails)).toBeTruthy();
    });
  });
});
