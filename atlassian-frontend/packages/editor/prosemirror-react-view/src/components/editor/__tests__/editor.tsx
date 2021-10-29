import React from 'react';

import { render } from '@testing-library/react';

import { doc, p } from '@atlaskit/editor-test-helpers/doc-builder';
import defaultSchema from '@atlaskit/editor-test-helpers/schema';

import { Editor } from '../editor';

const initialDoc = doc(p('Hello World'));

describe('Editor View', () => {
  it('should render a react view', async () => {
    const { findByText } = render(
      <Editor schema={defaultSchema} initialDoc={initialDoc(defaultSchema)} />,
    );

    await expect(findByText(/Hello/i)).resolves.toBeInTheDocument();
  });
});
