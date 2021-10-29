import React from 'react';
import { createDefaultExport } from '@atlassian/aux-test-utils';
import { Tag, TagGroup } from './';
import { TagColor } from '@atlassian/forge-ui-types';
import { TextPlain } from '../text';

export default createDefaultExport();

export const basic = () => (
  <p>
    Hello <Tag text={'tag 1'} /> World
  </p>
);

export const multiple = () => (
  <p>
    Hello <Tag text={'tag 1'} />
    <Tag text={'tag 2'} />
    <Tag text={'tag 3'} /> World
  </p>
);

export const colored = () => {
  const colors: TagColor[] = [
    'default',
    'green',
    'blue',
    'red',
    'purple',
    'grey',
    'teal',
    'yellow',
    'green-light',
    'blue-light',
    'red-light',
    'purple-light',
    'grey-light',
    'teal-light',
    'yellow-light',
  ];
  return (
    <>
      {colors.map((color, index) => {
        return <Tag key={index} text={String(color)} color={color} />;
      })}
    </>
  );
};

export const testUndefinedColor = () => (
  <Tag text={'expect to be grey'} color={undefined} />
);

export const basicTagGroup = () => (
  <TagGroup>
    <Tag text={'tag 1'} />
    <Tag text={'tag 2'} />
  </TagGroup>
);

export const tagGroup = () => (
  <>
    <TagGroup>
      <Tag text={'tag 1'} />
      <Tag text={'tag 2'} />
    </TagGroup>
    <TextPlain content={'Tags should be block'} />
  </>
);
