import { GlobalWithHooks } from '../types';

const win = typeof window !== 'undefined' ? window : null;
const gbl = typeof global !== 'undefined' ? global : null;

export default (win || gbl || this) as Window | GlobalWithHooks;
