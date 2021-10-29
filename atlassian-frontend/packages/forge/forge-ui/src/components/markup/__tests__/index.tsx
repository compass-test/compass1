import React, { Suspense } from 'react';
import { Link, sanitizeUrl } from '../index';
import { render } from '@testing-library/react';

describe('Link', () => {
  const BASE_URL = window.location.href;
  it('uses sanitizeUrl for the href and specifies rel', () => {
    const { container } = render(<Link href="javascript:alert()">link</Link>);
    expect(container.innerHTML).toBe(
      '<a href="about:blank" rel="noopener noreferrer">link</a>',
    );
  });

  it('renders as a button when appearance is set', async () => {
    const { container, findByText } = render(
      <Suspense fallback="">
        <Link appearance="primary-button" href="/go">
          link
        </Link>
      </Suspense>,
    );
    await findByText('link');
    expect(container.innerHTML).toEqual(expect.stringContaining('ButtonBase'));
    expect(container.innerHTML).toEqual(
      expect.stringContaining('rel="noopener noreferrer"'),
    );
  });

  describe('sanitizeUrl', () => {
    it('handles naked domains the same as HTML anchor tags do', () => {
      expect(sanitizeUrl('example.com/path')).toBe(
        `${BASE_URL}example.com/path`,
      );
    });

    it('returns valid URLs', () => {
      expect(sanitizeUrl('https://example.com/path')).toBe(
        'https://example.com/path',
      );
    });

    it('returns relative paths correctly', () => {
      expect(sanitizeUrl('/issues')).toBe(`${BASE_URL}issues`);
    });

    it('returns about:blank for non allowlisted protocol links', () => {
      expect(sanitizeUrl('javascript\x3Ajavascript:alert(1)')).toBe(
        'about:blank',
      );
      expect(sanitizeUrl('chrome:iscool')).toBe('about:blank');
    });

    it('returns the link for allowlisted protocols', () => {
      expect(sanitizeUrl('mailto:charlie@atlassian.com')).toBe(
        'mailto:charlie@atlassian.com',
      );
      expect(sanitizeUrl('ftp://cool.file.com/file')).toBe(
        'ftp://cool.file.com/file',
      );
    });
  });
});
