export type UIScaleIncrements = 'SMALL' | 'MEDIUM' | 'LARGE';
export type UIScaleExtendedIncrements =
  | 'SMALLEST'
  | UIScaleIncrements
  | 'XLARGE'
  | 'XXLARGE'
  | 'LARGEST';

export type UIScale = {
  [key in UIScaleIncrements]: number;
};

export type ExtendedUIScale = {
  [key in UIScaleExtendedIncrements]: number;
};
