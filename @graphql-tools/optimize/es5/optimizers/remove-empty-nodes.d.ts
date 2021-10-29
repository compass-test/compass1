import { DocumentOptimizer } from '../types';
/**
 * This optimizer removes empty nodes/arrays (directives/argument/variableDefinitions) from a given DocumentNode of operation/fragment.
 * @param input
 */
export declare const removeEmptyNodes: DocumentOptimizer;
