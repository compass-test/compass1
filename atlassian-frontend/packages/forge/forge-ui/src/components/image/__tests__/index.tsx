import React from 'react';
import { render } from '@testing-library/react';
import Image from '..';

test('displays image from src', () => {
  const { getByAltText, container } = render(
    <Image
      src="https://media.giphy.com/media/jUwpNzg9IcyrK/source.gif"
      alt="homer"
    />,
  );

  expect(container.firstChild!.nodeName.toUpperCase()).toBe('IMG');
  expect(getByAltText('homer')).toBeTruthy();
});
