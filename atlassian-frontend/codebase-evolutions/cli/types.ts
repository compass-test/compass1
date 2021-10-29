export type Flags = {
  readonly debug?: boolean;
};

export type ConfirmResponse = { answer: boolean };
export type InputResponse = { answer: string };
export type SelectResponse = { answer: string | string[] };

export type UserInputType = {
  task?: string;
  allDependencies?: string[];
  hasPostUpgradeTasks?: boolean;
  hasSingletons?: boolean;
  upgradeIdentifier?: string;
  rolloutStrategy?: string;
};

export type UserActionType = {
  key: string;
  question: string;
  answer: any;
};

export type Query = {
  // Used when asking the question, and in the summary
  question: string;
  // Only used when asking the question
  context?: string | string[];
};

export type Answer = string | string[] | boolean;

export type Choice = {
  value: string | string[];
  nextDecisionKey?: keyof UserInputType;
};

export type Question = {
  type: 'confirm' | 'select' | 'select-multi' | 'input';
  query: Query | string;
  // Choices presented when type is select
  choices?: Choice[];
};

export type Decision = {
  key: keyof UserInputType;
  question: Question;
  // User provided answer or choice
  answer?: Answer;
  nextKey: (this: Decision, answer: Answer) => keyof UserInputType | undefined;
  next?: () => Decision | undefined;
  prev?: () => Decision | undefined;
  setUserInput?: (userInput: UserInputType) => void;
};
