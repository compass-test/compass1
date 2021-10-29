import { FormViewApisV3 } from '../../apis/interfaces/FormViewApisV3';
import { PermissionLevel } from '../../models/PermissionLevel';

import { ModuleContextV3 } from './ModuleContextV3';

/**
 * Defines the standard set of permissions, apis, and utils used by form view modules.
 */
export interface FormViewModuleContext extends ModuleContextV3<FormViewApisV3> {
  permissions: PermissionLevel;
}
