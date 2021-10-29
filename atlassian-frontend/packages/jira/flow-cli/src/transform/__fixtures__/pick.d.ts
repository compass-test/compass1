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

export interface D extends A, B {
  dfoo: string;
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

export type SimplePick = Pick<A, 'foo'>;
export type NotFoundPick = Pick<A, 'Blub'>;
export type NestedPick = Pick<Pick<B, 'bbar' | 'bfoo'>, 'bbar'>;
export type PickInDefinition = Pick<C, 'cfoo'>;

export interface C {
  cfoo: Pick<B, 'bfoo' | 'bbar'>;
  cbar: number;
  cbaz: number;
}

export type IntersectionPick = Pick<A & B, 'bar' | 'bfoo'>;
export type OptionalAndComplexPropertyPick = Pick<
  OptionalAndComplexSignatures,
  'status' | 'metadata'
>;

export type PickIncludedOtherUtilities = Pick<
  OptionalAndComplexSignatures,
  Exclude<keyof OptionalAndComplexSignatures, 'isCardVisible'>
>;

export type PickWithDefinitionsInHeritageClaue = Pick<
  D,
  'dfoo' | 'bfoo' | 'foo'
>;

export interface RadioProps extends WithAnalyticsEventsProps {
  /** the aria-label attribute associated with the radio element */
  ariaLabel?: string;
  /** Field disabled */
  isDisabled?: boolean;
  /** Marks this as a required field */
  isRequired?: boolean;
  /** Field is invalid */
  isInvalid?: boolean;
  /** Set the field as checked */
  isChecked?: boolean;
  /** The label value for the input rendered to the dom */
  label?: ReactNode;
  /** Field name */
  name?: string;
  /** onChange event handler, passed into the props of each Radio Component instantiated within RadioGroup */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onMouseDown?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  /** onInvalid event handler, passed into the props of each Radio Component instantiated within RadioGroup */
  onInvalid?: (e: SyntheticEvent<any>) => void;
  /** Field value */
  value?: RadioValue;
  /**
      A `testId` prop is provided for specified elements, which is a unique string that appears as a data attribute `data-testid` in the rendered code, serving as a hook for automated tests
      we have 2 different testid generated based on the one you pass to the Radio component:
      - `{testId}--hidden-radio` to check if it got changed to checked/unchecked.
      - `{testId}--radio-label` to click the input, because in IE11 the input has opacity: 0 and can't be interacted.
    */
  testId?: string;
}
