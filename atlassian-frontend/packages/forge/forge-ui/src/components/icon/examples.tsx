import React from 'react';
import Icon from './';
import { IconPaths } from './imports';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

export const all = () => {
  const glyphs = Object.keys(IconPaths) as (keyof typeof IconPaths)[];
  return (
    <>
      {glyphs.map((glyph, idx) => (
        <Icon glyph={glyph} key={idx} />
      ))}
    </>
  );
};

export const size = () => {
  return (
    <>
      <Icon glyph={'chevron-left'} size={'small'} />
      <Icon glyph={'chevron-left'} size={'medium'} />
      <Icon glyph={'chevron-left'} size={'large'} />
    </>
  );
};
