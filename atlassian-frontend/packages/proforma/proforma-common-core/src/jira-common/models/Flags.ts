export enum BooleanFlags {
  ReadOnlyQuestions = 'ReadOnlyQuestions',
}

export type Flags = {
  [key in keyof typeof BooleanFlags]?: boolean;
};
