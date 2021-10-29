import { PlatformContext, ExtensionContext } from '../public';

export type ContextId = string;
export type ExtensionId = string;

export interface ExtensionInstanceIds {
  contextIds: ContextId[];
  extensionId: ExtensionId;
  localId: string;
  functionId?: string;
}

export type EnvironmentType = 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION';
export type ViewportSizeType = 'small' | 'medium' | 'large' | 'xlarge';

export interface ForgeUIExtensionType {
  id: string;
  installationId?: string;
  environmentId?: string;
  properties: {
    title?: string;
    description?: string;
    resource?: string;
    viewportSize?: ViewportSizeType;
    config?: { function?: string };
  };
  appOwner?: {
    accountId: string;
    name: string;
    picture: string;
  };
  appVersion?: string;
  environmentType?: EnvironmentType;
  type?: string; // e.g. confluence:contentAction, confluence:contextMenu
  consentUrl?: string;
  currentUserConsent?: {
    user: {
      aaid: string;
    };
    appEnvironmentVersion: {
      id: string;
    };
    consentedAt: string;
  };
  requiresUserConsent?: boolean;
}

interface ADFEntityMark {
  type: string;
  attrs?: { [name: string]: any };
}

interface ADFEntity {
  type: string;
  attrs?: { [name: string]: any };
  content?: Array<ADFEntity | undefined>;
  marks?: Array<ADFEntityMark>;
  text?: string;
  [key: string]: any;
}

// duplicated ReferenceEntity from @atlaskit/editor-common to avoid adding @atlaskit/editor-common as a dependency
type ReferenceEntity = ADFEntity | Object;

export interface LegacyForgeContext {
  accountId?: string;
  cloudId?: string;
  contentId?: string;
  spaceKey?: string;
  platformContext?: PlatformContext;
  extensionContext?: ExtensionContext & { references?: Array<ReferenceEntity> };
  isConfig?: boolean;
}
