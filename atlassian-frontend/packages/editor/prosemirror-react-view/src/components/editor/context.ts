import { createContext } from 'react';

import { ReactEditorView } from './hooks/use-editor';

export const ReactEditorViewContext = createContext<ReactEditorView | null>(
  null,
);
