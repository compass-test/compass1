import { CompassComponentLabelForUI } from '../../types';

export const createLabels = (count: number): CompassComponentLabelForUI[] => {
  const labels = [];
  for (let i = 1; i <= count; i++) {
    labels.push({
      name: `label${i}`,
    });
  }
  return labels;
};

export type LabelTagColors =
  | 'greenLight'
  | 'tealLight'
  | 'blueLight'
  | 'purpleLight'
  | 'redLight'
  | 'yellowLight';

const tagColors = [
  'greenLight',
  'tealLight',
  'blueLight',
  'purpleLight',
  'redLight',
  'yellowLight',
];

const getHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash;
  }

  return hash;
};

export const getTagColor = (tagName: string): LabelTagColors =>
  tagColors[Math.abs(getHash(tagName)) % tagColors.length] as LabelTagColors;
