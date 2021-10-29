import React, { ReactElement } from 'react';

import { shallow } from 'enzyme';

import type { GlobalThemeTokens } from '@atlaskit/theme/types';

import type { CalendarViewRange } from '../../../common/types';

import { DayCellContentProps, useDayCellContent } from './index';

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

describe('useDayCellContent', () => {
  const render = (viewRange: CalendarViewRange, props: DayCellContentProps) => {
    const Component = () => {
      const DayCellContent = useDayCellContent(
        viewRange,
        'local',
        (date, options) =>
          new Intl.DateTimeFormat('en-US', options).format(
            new Date(date as string | Date),
          ),
      );
      return <DayCellContent {...props} />;
    };

    return shallow(<Component />).dive();
  };

  it('should render nothing when not in the month view range', () => {
    const wrapper = render('week', {
      date: new Date('2020-01-01T00:00Z'),
      isPast: false,
      isToday: false,
    });

    expect(wrapper).toMatchInlineSnapshot(`<Fragment />`);
  });

  it('should render correctly', () => {
    const wrapper = render('month', {
      date: new Date('2020-01-01T00:00Z'),
      isPast: false,
      isToday: false,
    }).dive();

    expect(wrapper).toMatchInlineSnapshot(`
      <DayContainer>
        <DayText
          isPast={false}
          isToday={false}
          theme={
            Object {
              "mode": "light",
            }
          }
        >
          Jan
        </DayText>
        <DayNumber
          isPast={false}
          isToday={false}
          theme={
            Object {
              "mode": "light",
            }
          }
        >
          1
        </DayNumber>
      </DayContainer>
    `);
  });

  it('should render correctly for a date in the past', () => {
    const wrapper = render('month', {
      date: new Date('2020-01-01T00:00Z'),
      isPast: true,
      isToday: false,
    }).dive();

    expect(wrapper).toMatchInlineSnapshot(`
      <DayContainer>
        <DayText
          isPast={true}
          isToday={false}
          theme={
            Object {
              "mode": "light",
            }
          }
        >
          Jan
        </DayText>
        <DayNumber
          isPast={true}
          isToday={false}
          theme={
            Object {
              "mode": "light",
            }
          }
        >
          1
        </DayNumber>
      </DayContainer>
    `);
  });

  it("should render correctly for today's date", () => {
    const wrapper = render('month', {
      date: new Date('2020-01-01T00:00Z'),
      isPast: false,
      isToday: true,
    }).dive();

    expect(wrapper).toMatchInlineSnapshot(`
      <DayContainer>
        <DayText
          isPast={false}
          isToday={true}
          theme={
            Object {
              "mode": "light",
            }
          }
        >
          Jan
        </DayText>
        <DayNumber
          isPast={false}
          isToday={true}
          theme={
            Object {
              "mode": "light",
            }
          }
        >
          1
        </DayNumber>
      </DayContainer>
    `);
  });
});
