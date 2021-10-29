import React from 'react';
import { shallow } from 'enzyme';
import {
  DialogExpansionContextProvider,
  DialogExpansionContext,
} from '../dialog-expansion-context';

let mockAllowExpand = jest.fn();
jest.mock('react', () =>
  Object.assign({}, jest.requireActual('react'), {
    useCallback: jest.fn().mockImplementation((fn) => fn),
    useState: jest.fn().mockImplementation((val) => {
      return [false, mockAllowExpand];
    }),
    useRef: jest.fn().mockImplementation((val) => ({
      current: val,
    })),
  }),
);

it('should verify that mockAllowExpand is called', () => {
  const mockSetExpanded = jest.fn();
  const context = jest.fn();
  const wrapper = shallow(
    <DialogExpansionContextProvider
      isExpanded={false}
      setIsExpanded={mockSetExpanded}
    >
      <DialogExpansionContext.Consumer>
        {context}
      </DialogExpansionContext.Consumer>
    </DialogExpansionContextProvider>,
  );
  wrapper.render();

  context.mock.calls[0][0].allowChangeExpand(false);
  expect(mockAllowExpand).toHaveBeenCalledWith(false);

  context.mock.calls[0][0].setIsExpanded(true);
  expect(mockSetExpanded).toHaveBeenCalledTimes(0);

  context.mock.calls[0][0].allowChangeExpand(true);
  expect(mockAllowExpand).toHaveBeenCalledWith(true);
});
