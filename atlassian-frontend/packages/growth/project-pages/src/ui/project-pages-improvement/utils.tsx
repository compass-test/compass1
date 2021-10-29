import { gridSize } from '@atlaskit/theme/constants';

export const getIconSize = (size: 'small' | 'medium'): number =>
  gridSize() * (size === 'small' ? 3 : 4);

export const getIconImageSize = (size: 'small' | 'medium'): number =>
  size === 'small' ? 14 : 18;

export const getDateString = (): string => {
  const dt = new Date();
  const month = (dt.getMonth() + 1).toString().padStart(2, '0');
  const day = dt.getDate().toString().padStart(2, '0');
  return `${dt.getFullYear()}-${month}-${day}`;
};
