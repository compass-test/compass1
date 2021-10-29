import React from 'react';

import { domOutputSpecToReactElement } from '../serializers/utils/dom-output-spec';

describe('dom serializer', () => {
  describe('toReactElement', () => {
    const Text = () => <>foo</>;
    test('should create a paragraph', () => {
      expect(
        domOutputSpecToReactElement(['p', 0], undefined, <Text />),
      ).toEqual(
        <p>
          <Text />
        </p>,
      );
    });

    test('should create a link', () => {
      expect(
        domOutputSpecToReactElement(
          ['a', { href: 'http://google.com' }],
          undefined,
          <Text />,
        ),
      ).toEqual(
        <a href="http://google.com">
          <Text />
        </a>,
      );
    });
  });
});
