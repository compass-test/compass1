import root from './window-global';
import { hook } from './hook';
import { patch } from './patch';
import * as custom from './custom';

// expose global hook
if (!root.__RRA_GLOBAL_HOOK__) {
  try {
    if ('top' in root) {
      root.top.__RRA_GLOBAL_HOOK__ = hook;
    }
  } catch (_) {
    // CORS
  }
  root.__RRA_GLOBAL_HOOK__ = hook;
}

// React global hook
if (typeof root.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
  patch(root.__REACT_DEVTOOLS_GLOBAL_HOOK__);
} else {
  root.__REACT_DEVTOOLS_GLOBAL_HOOK__ = custom;
  hook.patched = true;
}
