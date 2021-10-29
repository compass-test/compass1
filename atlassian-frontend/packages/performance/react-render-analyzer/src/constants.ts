export const FunctionComponent = 0;
export const ClassComponent = 1;
export const IndeterminateComponent = 2;
export const ContextConsumer = 9;
export const ForwardRef = 11;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const SimpleMemoComponent = 15;
export const IncompleteClassComponent = 17;

export const FORWARD_REF_NUMBER = 0xead0;
export const FORWARD_REF_SYMBOL_STRING = 'Symbol(react.forward_ref)';
export const MEMO_NUMBER = 0xead3;
export const MEMO_SYMBOL_STRING = 'Symbol(react.memo)';
export const PROVIDER_NUMBER = 0xeacd;
export const PROVIDER_SYMBOL_STRING = 'Symbol(react.provider)';
export const CONTEXT_NUMBER = 0xeace;
export const CONTEXT_SYMBOL_STRING = 'Symbol(react.context)';

export const PerformedWork = 1;

export enum ContextType {
  NoContext,
  Legacy,
  Standard,
}

export const DOMRendererPackageName = 'react-dom';
