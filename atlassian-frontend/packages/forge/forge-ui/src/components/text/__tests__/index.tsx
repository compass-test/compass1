import React from 'react';
import { render } from '@testing-library/react';
import { TextPlain, toParagraphs, validateAlign } from '..';

test('displays the context inside a div', () => {
  const { getByText, container } = render(<TextPlain content="test content" />);

  expect(container.firstChild!.nodeName.toUpperCase()).toBe('DIV');
  expect(getByText('test content')).toBeTruthy();
});

test('splits text into paragraphs', () => {
  const paragraphs = `
  line1

  line2
  `;
  const { getByText } = render(<TextPlain content={paragraphs} />);

  const line1 = getByText('line1');
  const line2 = getByText('line2');
  expect(line1.nodeName).toBe('P');
  expect(line2.nodeName).toBe('P');
});

describe('toParagraphs', () => {
  it('splits lines separated by two newlines', () => {
    expect(
      toParagraphs(`one line

    second line`),
    ).toEqual(['one line', 'second line']);
  });

  it('does not split lines separated by one newline', () => {
    expect(
      toParagraphs(`one line
    second line`),
    ).toEqual([
      `one line
    second line`,
    ]);
  });

  it('trims leading and trailing whitespace', () => {
    expect(
      toParagraphs(`

      one line after two blank lines

      `),
    ).toEqual([`one line after two blank lines`]);
  });
});

describe('validateAlign', () => {
  it('allows valid align values', () => {
    expect(validateAlign('center')).toBe('center');
  });

  it('defaults to start for undefined', () => {
    expect(validateAlign()).toBe('start');
  });

  it('defaults to start for invalid values', () => {
    expect(
      validateAlign(
        'end; background: lightblue url("http://bad/url/pog.gif") no-repeat fixed center;',
      ),
    ).toBe('start');
  });
});
