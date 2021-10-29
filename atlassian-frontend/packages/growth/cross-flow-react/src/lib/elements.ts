import { createSpinner } from '@atlassiansox/iframe-plugin';

export function createModalElement() {
  const div = document.createElement('div');
  div.style.height = '100%';
  return div;
}

export function createLoaderElement() {
  const div = document.createElement('div');
  const spinner = createSpinner();
  div.style.display = 'flex';
  div.style.height = '100%';
  div.style.alignItems = 'center';
  div.style.justifyContent = 'center';
  div.appendChild(spinner);
  return div;
}
