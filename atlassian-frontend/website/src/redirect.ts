import path from 'path';
import data from './site';
import { find } from './utils/fs';

function main() {
  const [prefix, group, pkg, example] = parsePathname(window.location.pathname);
  if (!['examples', 'packages'].includes(prefix)) {
    return;
  }

  if (!group || !pkg) {
    return;
  }

  const url = new URL(window.location.href);
  url.pathname = '/examples.html';
  url.searchParams.set('groupId', group);
  url.searchParams.set('packageId', pkg);
  url.searchParams.set('exampleId', example || '');

  window.location.href = url.toString();
}

function parsePathname(pathname: string): string[] {
  if (pathname === '/') {
    return findFirstExample() ?? [];
  }

  const fragments = pathname.split('/').filter(Boolean);
  return fragments;
}

function findFirstExample() {
  let found: string | undefined;

  find(data, (item, filePath) => {
    found = filePath;
    return item.type === 'file' && /\.ts?x/.test(item.id);
  });

  if (!found) {
    return;
  }

  const normalizedPath = found.replace(/^root\//, '');
  const basePath = path.join(normalizedPath, '..', '..');
  const baseName = path.basename(normalizedPath, path.extname(normalizedPath));
  return [...basePath.split('/'), baseName.replace(/^\d+-/, '')];
}

document.addEventListener('DOMContentLoaded', main);

export {};
