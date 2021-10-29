import React from 'react';

import { render } from '@testing-library/react';

import InlineTextArea from './index';

describe('InlineTextArea', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'dragonfruit-common-ui';
      const { getByTestId } = render(
        <InlineTextArea
          testId={testId}
          placeholder="Placeholder!"
          defaultValue="text"
          onConfirm={() => null}
          onCancel={() => null}
        />,
      );
      expect(getByTestId(testId)).toBeTruthy();
    });
  });
});
