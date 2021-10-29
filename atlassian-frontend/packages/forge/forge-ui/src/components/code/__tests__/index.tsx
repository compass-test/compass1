import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import Code from '..';
import { InlineContext } from '../../../context/inline';
import { TextMarkup } from '../../text';

jest.mock('@atlaskit/code', () => {
  const originalModule = jest.requireActual('@atlaskit/code');
  return {
    ...originalModule,
    Code: jest.fn(() => <div>Inline code</div>),
    CodeBlock: jest.fn(() => <div>Block code</div>),
  };
});

describe('Code component', () => {
  const code = `const x = 10`;

  const CodeComponent = (
    <Suspense fallback={<div>loading</div>}>
      <Code text={code} language="javascript" />
    </Suspense>
  );

  test('should render inline code when inline context value is true', async () => {
    const InlineCode = (
      <InlineContext.Provider value={{ inline: true }}>
        {CodeComponent}
      </InlineContext.Provider>
    );

    const { findByText } = render(InlineCode);

    expect(await findByText('Inline code')).toBeTruthy();
  });
  test('should render block-level code when inline context value is false', async () => {
    const { findByText } = render(CodeComponent);

    expect(await findByText('Block code')).toBeTruthy();
  });
  test('should render inline code when used inside TextMarkup component', async () => {
    const { findByText } = render(<TextMarkup>{CodeComponent}</TextMarkup>);

    expect(await findByText('Inline code')).toBeTruthy();
  });
});
