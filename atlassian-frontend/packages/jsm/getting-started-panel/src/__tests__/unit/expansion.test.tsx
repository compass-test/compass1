import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import { mount } from 'enzyme';

import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { FadeIn, StaggeredEntrance } from '@atlaskit/motion';

import {
  ExpansionContext,
  Expander,
  ExpansionButton,
} from '../../common/ui/expansion';

jest.mock('@atlassian/analytics-bridge', () => ({
  fireUIAnalytics: jest.fn(),
}));

describe('Expander', () => {
  const toggleExpanded = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  const Child = () => <Fragment />;
  const OtherChild = () => <Fragment />;

  describe.each([
    [true, 'no children', []],
    [false, 'no children', []],
    [true, 'one child', [Child]],
    [false, 'one child', [Child]],
    [true, 'many children', [Child, OtherChild]],
    [false, 'many children', [Child, OtherChild]],
  ])('when isExpanded=%s with %s', (isExpanded, _, children) => {
    const expanderWithContext = mount(
      <ExpansionContext.Provider value={{ isExpanded, toggleExpanded }}>
        <Expander>
          {children.map((X, i) => (
            <X key={i} />
          ))}
        </Expander>
      </ExpansionContext.Provider>,
    ).find(Expander);

    if (isExpanded) {
      if (children.length > 0) {
        it('should show all the children', () => {
          children.forEach((child) =>
            expect(expanderWithContext.find(child)).toHaveLength(1),
          );
        });

        it('should show all the children inside a StaggeredEntrance', () => {
          const staggeredEntrance = expanderWithContext.find(StaggeredEntrance);
          children.forEach((child) =>
            expect(staggeredEntrance.find(child)).toHaveLength(1),
          );
        });

        it('should show all the children inside in-order FadeIn elements', () => {
          const staggeredEntrance = expanderWithContext.find(StaggeredEntrance);
          children.forEach((child, i) =>
            expect(
              staggeredEntrance.find(FadeIn).at(i).find(child),
            ).toHaveLength(1),
          );
        });
      }
    } else {
      it('should not render any StaggeredEntrance', () => {
        expect(expanderWithContext.find(StaggeredEntrance)).toHaveLength(0);
      });

      it('should show no children', () => {
        expect(expanderWithContext.find(Child)).toHaveLength(0);
        expect(expanderWithContext.find(OtherChild)).toHaveLength(0);
      });
    }
  });
});

describe('ExpansionButton', () => {
  const toggleExpanded = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe.each([true, false])('when isExpanded=%s', (isExpanded) => {
    const buttonWithContext = mount(
      <IntlProvider locale="en">
        <ExpansionContext.Provider value={{ isExpanded, toggleExpanded }}>
          <ExpansionButton />
        </ExpansionContext.Provider>
      </IntlProvider>,
    ).find(ExpansionButton);

    it('should toggle the expansion when pressed', () => {
      expect(toggleExpanded).toHaveBeenCalledTimes(0);

      buttonWithContext.simulate('click');

      expect(toggleExpanded).toHaveBeenCalledTimes(1);

      buttonWithContext.simulate('click');

      expect(toggleExpanded).toHaveBeenCalledTimes(2);
    });

    if (isExpanded) {
      it('should be a "show less" button', () => {
        expect(buttonWithContext.text()).toBe('Show Less');
      });

      it('should fire a "show less" UI event', () => {
        expect(toggleExpanded).toHaveBeenCalledTimes(0);

        buttonWithContext.simulate('click');

        expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
        expect(fireUIAnalytics).toHaveBeenCalledWith(
          expect.objectContaining({
            payload: expect.objectContaining({
              action: 'clicked',
              actionSubject: 'button',
            }),
          }),
          'jsmGettingStartedPanelChecklistShowLessButton',
        );
      });
    } else {
      it('should be a "show more" button', () => {
        expect(buttonWithContext.text()).toBe('Show More');
      });

      it('should fire a "show more" UI event', () => {
        expect(toggleExpanded).toHaveBeenCalledTimes(0);

        buttonWithContext.simulate('click');

        expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
        expect(fireUIAnalytics).toHaveBeenCalledWith(
          expect.objectContaining({
            payload: expect.objectContaining({
              action: 'clicked',
              actionSubject: 'button',
            }),
          }),
          'jsmGettingStartedPanelChecklistShowMoreButton',
        );
      });
    }
  });
});
