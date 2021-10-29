import { Reducer } from 'react';

export type Value = string;

export type HandleConfirm = (newValue: Value) => Promise<void>;

export type State = {
  editedValue: Value | undefined;
  isLoading: boolean;
};

export type Action =
  | { type: 'confirmRequest'; value: Value }
  | { type: 'confirmSuccess' }
  | { type: 'confirmFailure' }
  | { type: 'cancel' };

export type InlineEditReducer = Reducer<State, Action>;
