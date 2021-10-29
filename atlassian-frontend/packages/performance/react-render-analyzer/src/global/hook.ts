import root from './window-global';
import { AnalysisListener, GlobalHook } from '../types';
import { Commit } from '../commit';

export const hook: GlobalHook =
  ('top' in root && root.top.__RRA_GLOBAL_HOOK__) ||
  root.__RRA_GLOBAL_HOOK__ ||
  (() => {
    const listeners: AnalysisListener[] = [];

    return {
      patched: false,
      subscribe(listener: AnalysisListener) {
        listeners.push(listener);
        return function off() {
          const index = listeners.indexOf(listener);
          if (index !== -1) {
            listeners.splice(index, 1);
          }
        };
      },
      emit(commit: Commit) {
        listeners.forEach((listener) => listener(commit));
      },
    };
  })();
