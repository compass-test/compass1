import React from 'react';

import { DecoratorFn } from '@storybook/react';
type StoryFn = () => JSX.Element;

type Settings = {
  title?: string;
  decorators?: DecoratorFn[];
};

type Example = () => JSX.Element;

export function createExample(story: StoryFn, settings?: Settings): Example {
  const { decorators = [] } = settings ?? {};
  const withTestId = (fn: StoryFn) => {
    return React.createElement(
      'div',
      {
        'data-vr-root': 'true',
      },
      fn(),
    );
  };

  const finalDecorators = [...decorators, withTestId];
  return () =>
    finalDecorators.reduce(
      (acc, decorator) =>
        decorator(
          () => acc,
          {} as any /** we don't really need StoryContext in here */,
        ),
      story(),
    );
}
