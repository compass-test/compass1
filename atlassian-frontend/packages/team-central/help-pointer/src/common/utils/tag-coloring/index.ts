export type HelpPointerTagColors =
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
    // tslint:disable:no-bitwise
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash;
    // tslint:enable:no-bitwise
  }

  return hash;
};

export const getTagColor = (tagName: string): HelpPointerTagColors =>
  tagColors[
    Math.abs(getHash(tagName)) % tagColors.length
  ] as HelpPointerTagColors;
