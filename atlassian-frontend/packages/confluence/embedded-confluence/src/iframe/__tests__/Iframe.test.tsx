import React from 'react';
import { render } from '@testing-library/react';

import { Iframe } from '../Iframe';

describe('EmbeddedConfluenceIframe', () => {
  const props = {
    src: 'http://www.google.com',
    otherProp: '123',
    spaceKey: '123',
    contentId: '456',
    parentProductContentContainerId: 'parent-1',
    parentProduct: 'JSM',
  };

  test('render the iframe', () => {
    const { queryByTestId } = render(<Iframe {...props} />);

    expect(queryByTestId('confluence-page-iframe')).toBeTruthy();
  });
});
