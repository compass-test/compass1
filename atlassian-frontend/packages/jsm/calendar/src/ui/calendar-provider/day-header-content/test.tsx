import React, { ReactElement } from 'react';

import { shallow } from 'enzyme';

import type { GlobalThemeTokens } from '@atlaskit/theme/types';

import type { CalendarView, CalendarViewRange } from '../../../common/types';

import { DayHeaderContentProps, useDayHeaderContent } from './index';

jest.mock('react', () => ({
  ...(jest.requireActual('react') as any),
  useCallback: (callback: any) => callback,
}));

jest.mock('@atlaskit/theme/components', () => ({
  __esModule: true,
  default: {
    Consumer: ({
      children,
    }: {
      children: (theme: GlobalThemeTokens) => ReactElement;
    }) => children({ mode: 'light' }),
  },
  themed: (options: any) => options.light,
}));

describe('useDayHeaderContent', () => {
  const render = (
    view: CalendarView,
    viewRange: CalendarViewRange,
    props: DayHeaderContentProps,
  ) => {
    const Component = () => {
      const DayHeaderContent = useDayHeaderContent(
        view,
        viewRange,
        (date, options) =>
          new Intl.DateTimeFormat('en-US', options).format(
            new Date(date as string | Date),
          ),
      );
      return <DayHeaderContent {...props} />;
    };

    return shallow(<Component />).dive();
  };

  it('should render as expected in the list view', () => {
    const wrapper = render('list', 'month', {
      text: 'date text',
      date: new Date('2020-01-01T00:00Z'),
      isPast: false,
      isToday: false,
    }).dive();

    expect(wrapper).toMatchInlineSnapshot(`"date text"`);
  });

  it('should render as expected in the month grid view', () => {
    const wrapper = render('grid', 'month', {
      text: 'Wed',
      date: new Date('2020-01-01T00:00Z'),
      isPast: false,
      isToday: false,
    }).dive();

    expect(wrapper).toMatchInlineSnapshot(`
      <DayText
        theme={
          Object {
            "mode": "light",
          }
        }
      >
        Wed
      </DayText>
    `);
  });

  it('should render as expected in the day and week grid view', () => {
    const wrapper = render('grid', 'week', {
      text: 'date text',
      date: new Date('2020-01-01T00:00Z'),
      isPast: false,
      isToday: false,
    }).dive();

    expect(wrapper).toMatchInlineSnapshot(`
      <GridDayContainer
        isPast={false}
      >
        <DayText
          theme={
            Object {
              "mode": "light",
            }
          }
        >
          Wed
        </DayText>
        <GridDayNumber
          isToday={false}
          theme={
            Object {
              "mode": "light",
            }
          }
        >
          1
        </GridDayNumber>
      </GridDayContainer>
    `);
  });

  it('should render as expected in the day and week grid view when in the past', () => {
    const wrapper = render('grid', 'week', {
      text: 'date text',
      date: new Date('2020-01-01T00:00Z'),
      isPast: true,
      isToday: false,
    }).dive();

    expect(wrapper).toMatchInlineSnapshot(`
      <GridDayContainer
        isPast={true}
      >
        <DayText
          theme={
            Object {
              "mode": "light",
            }
          }
        >
          Wed
        </DayText>
        <GridDayNumber
          isToday={false}
          theme={
            Object {
              "mode": "light",
            }
          }
        >
          1
        </GridDayNumber>
      </GridDayContainer>
    `);
  });

  it("should render as expected in the day and week grid view when today's date", () => {
    const wrapper = render('grid', 'week', {
      text: 'date text',
      date: new Date('2020-01-01T00:00Z'),
      isPast: false,
      isToday: true,
    }).dive();

    expect(wrapper).toMatchInlineSnapshot(`
      <GridDayContainer
        isPast={false}
      >
        <DayText
          theme={
            Object {
              "mode": "light",
            }
          }
        >
          Wed
        </DayText>
        <GridDayNumber
          isToday={true}
          theme={
            Object {
              "mode": "light",
            }
          }
        >
          1
        </GridDayNumber>
      </GridDayContainer>
    `);
  });
});
