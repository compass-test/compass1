import React from 'react';

import { fireEvent, prettyDOM, render } from '@testing-library/react';

import FocusPage from '../../src/ui/FocusPage';
import Content from '../../src/ui/FocusPage/Content';
import Wrapper from '../../src/ui/FocusPage/Wrapper';

describe('FocusPage', () => {
  test('should fire onClose on clicking close icon', () => {
    const callback = jest.fn();

    const { getByLabelText } = render(
      <FocusPage onClose={callback}>Fake content</FocusPage>,
    );

    fireEvent.click(getByLabelText('Close'));

    expect(callback).toBeCalledTimes(1);
  });

  test('should render layout with provided elements', () => {
    const { getByText } = render(
      <FocusPage
        onClose={jest.fn()}
        title="fake title"
        subtitle="fake subtitle"
        bannerMessage={<>fake banner message</>}
        headerButtons={
          <>
            <button>Button #1</button>
            <button>Button #2</button>
          </>
        }
        footerButtons={
          <>
            <button>Button #3</button>
            <button>Button #4</button>
          </>
        }
      >
        Fake Content
      </FocusPage>,
    );

    expect(getByText('fake title')).toBeInTheDocument();
    expect(getByText('fake subtitle')).toBeInTheDocument();
    expect(getByText('fake banner message')).toBeInTheDocument();
    expect(getByText('Button #1')).toBeInTheDocument();
    expect(getByText('Button #2')).toBeInTheDocument();
    expect(getByText('Button #3')).toBeInTheDocument();
    expect(getByText('Button #4')).toBeInTheDocument();
    expect(getByText('Fake Content')).toBeInTheDocument();
  });

  test('should render identical elements whether composing the Wrapper and Content manually or not', () => {
    const props = {
      onClose: jest.fn(),
      title: 'fake title',
      subtitle: 'fake subtitle',
      bannerMessage: <>fake banner message</>,
      headerButtons: (
        <>
          <button>Button #1</button>
          <button>Button #2</button>
        </>
      ),
      footerButtons: (
        <>
          <button>Button #3</button>
          <button>Button #4</button>
        </>
      ),
    };

    const { baseElement: baseElementCombined } = render(
      <FocusPage {...props}>Fake Content</FocusPage>,
    );

    const { baseElement: baseElementSplit } = render(
      <Wrapper>
        <Content {...props}>Fake Content</Content>
      </Wrapper>,
    );

    expect(prettyDOM(baseElementCombined)).toEqual(prettyDOM(baseElementSplit));
  });
});
