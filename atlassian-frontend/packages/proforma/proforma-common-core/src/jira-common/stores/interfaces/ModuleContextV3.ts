import { PfUtils } from '../../context/providers/UtilsProvider';

/**
 * Defines the standard set of apis and utils used in version 3 modules.
 */
export interface ModuleContextV3<ApiType> {
  apis: ApiType;
  utils: PfUtils;
}
