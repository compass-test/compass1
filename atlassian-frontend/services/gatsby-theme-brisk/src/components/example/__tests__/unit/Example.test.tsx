import React from 'react';

import Button from '@atlaskit/button';
import { fireEvent, render } from '@testing-library/react';

import { Example } from '../../Example';

const TEST_SHORT_SOURCE = `
import React from 'react';

import Button from '@atlaskit/button';

export default () => <Button>Default button</Button>;

// I am here to
// extend the source
// to take 9 lines.
`.trim();

const TEST_LONG_SOURCE = `${TEST_SHORT_SOURCE}
// + 1 line
`;

const TEST_ID = 'foobar';

const TEST_COMPONENT = () => <Button testId={TEST_ID}>Default button</Button>;

const TEST_SHORT_EXAMPLE = (
  <Example Component={TEST_COMPONENT} source={TEST_SHORT_SOURCE} />
);

const TEST_LONG_EXAMPLE = (
  <Example Component={TEST_COMPONENT} source={TEST_LONG_SOURCE} />
);

describe('Example UI', () => {
  it('should not require expansion if it is 9 lines or less', () => {
    const { queryByText } = render(TEST_SHORT_EXAMPLE);

    const collapseButton = queryByText(/show more/i);

    expect(collapseButton).not.toBeInTheDocument();
  });

  it('should require expansion if it is 10 lines or more', () => {
    const { queryByText } = render(TEST_LONG_EXAMPLE);

    const collapseButton = queryByText(/show more/i);

    expect(collapseButton).toBeInTheDocument();
  });

  it('should display the component it is passed', () => {
    const { getByTestId } = render(TEST_SHORT_EXAMPLE);

    const component = getByTestId(TEST_ID);

    expect(component).toBeInTheDocument();
  });

  it('should render the source it is passed', () => {
    const { container } = render(TEST_SHORT_EXAMPLE);

    const codeBlock = container.querySelector('code');

    expect(codeBlock.textContent).toBe(TEST_SHORT_SOURCE);
  });

  it('should expand when the collapse button is clicked', () => {
    const { container, queryByText } = render(TEST_LONG_EXAMPLE);

    const collapseButton = queryByText(/show more/i).closest('button');
    const codeBlockContainer = container.querySelector('[id^="example-"]');

    expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    expect(codeBlockContainer).not.toHaveStyle('max-height: none');

    fireEvent.click(collapseButton);
    expect(collapseButton).toHaveAttribute('aria-expanded', 'true');
    expect(codeBlockContainer).toHaveStyle('max-height: none');
  });

  it('should then collapse when clicked again', () => {
    const { container, queryByText } = render(TEST_LONG_EXAMPLE);

    const collapseButton = queryByText(/show more/i).closest('button');
    const codeBlockContainer = container.querySelector('[id^="example-"]');

    fireEvent.click(collapseButton);
    fireEvent.click(collapseButton);
    expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    expect(codeBlockContainer).not.toHaveStyle('max-height: none');
  });
});
