import { Fiber, FiberRoot } from 'react-reconciler';
import { Commit } from './commit';
import { Render } from './render';
import { Diff } from './shallow-diff';
import { AnalysisIssue } from './analyzer/issue';

declare global {
  interface Window {
    Cypress?: typeof Cypress;
    cy?: typeof cy;
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: ReactGlobalHook;
    __RRA_GLOBAL_HOOK__?: GlobalHook;
    __RRA_CYPRESS__?: Analysis[];
  }
}

export type GlobalWithHooks = NodeJS.Global & {
  __REACT_DEVTOOLS_GLOBAL_HOOK__?: ReactGlobalHook;
  __RRA_GLOBAL_HOOK__?: GlobalHook;
};

export type AnalysisListener = (commit: Commit) => void;

export interface GlobalHook {
  patched: boolean;
  subscribe(listener: AnalysisListener): () => void;
  emit(commit: Commit): void;
}

export interface Renderer {
  rendererPackageName: string;
  currentDispatcherRef: any;
  getCurrentFiber: (() => Fiber | null) | null;
}

export interface ReactGlobalHook {
  renderers: Map<number, Renderer>;
  onCommitFiberRoot: (
    rendererID: number,
    fiber: FiberRoot,
    priority?: number,
    error?: boolean,
  ) => void;
  onCommitFiberUnmount(rendererID: number, fiber: Fiber): void;
  sub: <T = any>(event: string, callback: (message: T) => void) => () => void;
}

export type AnalyzerContext = {
  commit: Commit;
  render?: Render;
  change?: Diff;
};

export interface Issue {
  change: Diff;
  issue: AnalysisIssue;
}

export interface RenderAudit {
  render: Render;
  issues: Set<Issue>;
  unnecessary: boolean;
}

export interface Analysis {
  commit: Commit;
  audits: Set<RenderAudit>;
}

export type AnalyzerCallback<C extends AnalyzerContext = AnalyzerContext> = (
  context: C,
  addIssue: (message: string, meta?: object) => void,
  issues: Set<Issue>,
) => void;
