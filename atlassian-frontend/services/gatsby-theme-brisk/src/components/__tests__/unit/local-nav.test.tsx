import React from 'react';
import { render, fireEvent } from '@testing-library/react';

// Components
import { LocalNav } from '../../local-nav/local-nav';

const hasSubheadingsArr = [
  { depth: 2, value: 'Default', id: 'default' },
  { depth: 2, value: 'Appearance', id: 'appearance' },
  { depth: 3, value: 'Circle', id: 'circle' },
  { depth: 3, value: 'Square', id: 'square' },
  { depth: 2, value: 'Size', id: 'size' },
  { depth: 3, value: 'xxlarge', id: 'xxlarge' },
  { depth: 3, value: 'xlarge', id: 'xlarge' },
  { depth: 3, value: 'large', id: 'large' },
  { depth: 3, value: 'medium', id: 'medium' },
  { depth: 3, value: 'small', id: 'small' },
  { depth: 3, value: 'xsmall', id: 'xsmall' },
  { depth: 2, value: 'Displaying a tooltip', id: 'displaying-a-tooltip' },
];

const noSubheadingsArr = [
  {
    depth: 2,
    value: 'Build trust in every interaction',
    id: 'build-trust-in-every-interaction',
  },
  {
    depth: 2,
    value: 'Connect people to collaborate better',
    id: 'connect-people-to-collaborate-better',
  },
  {
    depth: 2,
    value: 'Match purpose and feel familiar',
    id: 'match-purpose-and-feel-familiar',
  },
  {
    depth: 2,
    value: 'Drive momentum from end to end',
    id: 'drive-momentum-from-end-to-end',
  },
  {
    depth: 2,
    value: 'Guide mastery for greater value',
    id: 'guide-mastery-for-greater-value',
  },
];

const checkboxTest = [
  { depth: 2, value: 'Default', id: 'default' },
  { depth: 2, value: 'Controlled', id: 'controlled' },
  { depth: 2, value: 'Uncontrolled', id: 'uncontrolled' },
  { depth: 2, value: 'Disabled', id: 'disabled' },
  { depth: 2, value: 'Invalid', id: 'invalid' },
  { depth: 2, value: 'Indeterminate', id: 'indeterminate' },
  { depth: 2, value: 'Required', id: 'required' },
  { depth: 2, value: 'Size', id: 'size' },
];

describe('LocalNav - Component', () => {
  // mock IntersectionObserver functions
  Object.defineProperty(window, 'IntersectionObserver', {
    value: jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })),
  });

  // PAGE WITH SUBHEADINGS: Test any heading in the MIDDLE
  it('onClick sets the correct heading.id (tests depth of two)', () => {
    const { getByText } = render(<LocalNav headings={hasSubheadingsArr} />);
    fireEvent.click(getByText('Default'));
    expect(
      getByText('Default')
        .parentElement.closest('li')
        .classList.contains('selected'),
    ).toBe(true);
  });

  // PAGE WITH SUBHEADINGS: Test the LAST heading
  it('onClick sets the correct heading.id for the last subheading (tests depth of two)', () => {
    const { getByText } = render(<LocalNav headings={hasSubheadingsArr} />);
    fireEvent.click(getByText('Displaying a tooltip'));
    expect(
      getByText('Displaying a tooltip')
        .parentElement.closest('li')
        .classList.contains('selected'),
    ).toBe(true);
  });

  // PAGE WITH SUBHEADINGS: Test the FIRST subheading under a heading
  it('onClick sets the correct heading.id for the first subheading under a heading', () => {
    const { getByText } = render(<LocalNav headings={hasSubheadingsArr} />);
    fireEvent.click(getByText('Circle'));
    expect(
      getByText('Circle')
        .parentElement.closest('li')
        .classList.contains('selected'),
    ).toBe(true);
  });

  // PAGE WITHOUT SUBHEADINGS: Test a heading in the middle
  it('onClick sets correct heading.id for subheadings in the middle', () => {
    const { getByText } = render(<LocalNav headings={noSubheadingsArr} />);
    fireEvent.click(getByText('Drive momentum from end to end'));
    expect(
      getByText('Drive momentum from end to end')
        .parentElement.closest('li')
        .classList.contains('selected'),
    ).toBe(true);
  });

  // PAGE WITHOUT SUBHEADINGS: Test the first heading
  it('onClick sets correct heading.id for the first heading', () => {
    const { getByText } = render(<LocalNav headings={noSubheadingsArr} />);
    fireEvent.click(getByText('Build trust in every interaction'));
    expect(
      getByText('Build trust in every interaction')
        .parentElement.closest('li')
        .classList.contains('selected'),
    ).toBe(true);
  });

  // PAGE WITHOUT SUBHEADINGS: Test the last heading
  it('onClick sets correct heading.id for the last heading', () => {
    const { getByText } = render(<LocalNav headings={noSubheadingsArr} />);
    fireEvent.click(getByText('Guide mastery for greater value'));
    expect(
      getByText('Guide mastery for greater value')
        .parentElement.closest('li')
        .classList.contains('selected'),
    ).toBe(true);
  });

  it('onClick sets correct heading.id for the LAST HEADING', () => {
    const { getByText } = render(<LocalNav headings={checkboxTest} />);
    fireEvent.click(getByText('Size'));
    expect(
      getByText('Size')
        .parentElement.closest('li')
        .classList.contains('selected'),
    ).toBe(true);
  });
});
