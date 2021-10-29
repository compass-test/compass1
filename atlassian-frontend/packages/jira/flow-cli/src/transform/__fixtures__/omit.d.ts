export interface A {
  foo: string;
  bar: number;
  baz: string;
}

export interface B {
  bfoo: string;
  bbar: number;
  bbaz: number;
}

export interface C extends A, B {
  cfoo: string;
}

export interface D extends Array<A>, B {
  cfoo: string;
}

export interface OptionalAndComplexSignatures {
  status: CardStatus;
  isCardVisible: boolean;
  previewOrientation: number;
  isPlayingFile: boolean;
  mediaViewerSelectedItem?: Identifier;
  metadata?: FileDetails;
  dataURI?: string;
  progress?: number;
  error?: Error;
}

export type OneKeyOmit = Omit<OptionalAndComplexSignatures, 'error'>;
export type OmitWithKeyOfOperator = Omit<OptionalAndComplexSignatures, keyof C>;
export type OmitWithTypeReference = Omit<
  OptionalAndComplexSignatures,
  Pick<A & B, 'bar' | 'bfoo'>
>;
export type MultipleKeyOmit = Omit<
  OptionalAndComplexSignatures,
  'error' | 'isCardVisible'
>;

export type OmitWithInheritInterface = Omit<C, 'cfoo'>;
export type OmitWithInheritInterfaceAndComplexTypeInHeritage = Omit<D, 'cfoo'>;
