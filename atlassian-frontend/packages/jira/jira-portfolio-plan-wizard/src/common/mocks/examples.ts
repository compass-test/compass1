import { addDecorator } from '@storybook/react';

export type DecoratorFunction = Parameters<typeof addDecorator>[0];

export interface StoryMetadata {
  title: string;
  decorators?: DecoratorFunction[];
}
