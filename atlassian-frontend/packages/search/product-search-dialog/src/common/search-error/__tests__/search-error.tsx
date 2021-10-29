import React from 'react';
import SearchError from '../search-error';
import { ShallowWrapper } from 'enzyme';
import {
  shallowWithIntl,
  mountWithIntl,
} from '../../../__tests__/__fixtures__/intl-test-helpers';
import { Button } from '../search-error.styled';

describe('<SearchError/>', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    // eslint-disable-next-line
    (console.warn as any).mockRestore();
  });

  describe('on rendering', () => {
    let deepWrapper: any;
    let shallowWrapper: ShallowWrapper;
    let onRetrySpy: any;

    beforeEach(() => {
      onRetrySpy = jest.fn();
      deepWrapper = mountWithIntl(<SearchError onRetry={onRetrySpy} />);
      shallowWrapper = shallowWithIntl(<SearchError onRetry={onRetrySpy} />);
    });

    it('should render as expected.', () => {
      expect(shallowWrapper).toMatchSnapshot();
    });

    describe('on focusing on `try again` and tabbed away', () => {
      beforeEach(() => {
        deepWrapper.simulate('keydown', { key: 'Tab', keyCode: 9 });
      });

      it('should not fire onRetry', () => {
        expect(onRetrySpy).not.toBeCalled();
      });
    });

    describe('on focusing on `try again` and pressed enter', () => {
      beforeEach(() => {
        deepWrapper
          .find(Button)
          .simulate('keydown', { key: 'Enter', keyCode: 13 });
      });

      it('should fire onRetry', () => {
        expect(onRetrySpy).toBeCalled();
      });
    });

    describe('on clicking `try again`', () => {
      beforeEach(() => {
        deepWrapper.find(Button).simulate('click');
      });

      it('should fire onRetry', () => {
        expect(onRetrySpy).toBeCalled();
      });
    });
  });
});
