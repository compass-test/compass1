import { LOG_LEVEL_BASE } from '../constants';
import Debug from 'debug';

export const getLogger = (label: string) => Debug(`${LOG_LEVEL_BASE}${label}`);
