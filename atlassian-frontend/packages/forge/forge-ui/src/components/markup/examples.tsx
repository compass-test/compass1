import React from 'react';
import { Strong, Em, Link, Strike } from './';
import { TextMarkup } from '../text';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

const NEW_LINES = `
  New
  Lines
`;

export function InHTML() {
  return (
    <>
      <Strong>I went on a holiday </Strong>
      and it was <Strong>hot</Strong>! In fact, the holiday was on a{' '}
      <Em>
        rocket around the <Strike>Moon</Strike>{' '}
        <Link href="https://en.wikipedia.org/wiki/Sun">Sun</Link>
      </Em>
      .{NEW_LINES}
    </>
  );
}

export function InTextMarkup() {
  return (
    <TextMarkup>
      <Strong>I went on a holiday </Strong>
      and it was <Strong>hot</Strong>! In fact, the holiday was on a{' '}
      <Em>
        rocket around the <Strike>Moon</Strike>{' '}
        <Link href="https://en.wikipedia.org/wiki/Sun">Sun</Link>
      </Em>
      .{NEW_LINES}
    </TextMarkup>
  );
}

export function LinkExamples() {
  return (
    <TextMarkup>
      <Link href="https://www.atlassian.com">Atlassian</Link>
      <Link appearance="primary-button" href="https://www.atlassian.com">
        Go to Atlassian
      </Link>
      New tab:{' '}
      <Link appearance="button" href="https://www.atlassian.com" openNewTab>
        Go to Atlassian
      </Link>
    </TextMarkup>
  );
}
