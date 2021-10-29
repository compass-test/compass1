import { FormattedMessage } from 'react-intl';

export enum TemplateType {
  Confluence,
  Link,
  More, // for post-expand to open up the create modal
}

interface TemplateCommon {
  type: TemplateType;
  key: string;
  name: FormattedMessage.MessageDescriptor;
  description?: FormattedMessage.MessageDescriptor;
  tooltip?: FormattedMessage.MessageDescriptor;
  iconRender: ({
    size,
    color,
  }: {
    size: 'small' | 'medium';
    color: string;
  }) => React.ReactNode;
  defaultIconColor: string;
}

export type BlueprintModuleCompleteKey =
  | 'com.atlassian.confluence.plugins.confluence-software-blueprints:requirements-blueprint'
  | 'com.atlassian.confluence.plugins.confluence-business-blueprints:decisions-blueprint'
  | 'com.atlassian.confluence.plugins.confluence-business-blueprints:meeting-notes-blueprint'
  | 'com.atlassian.confluence.plugins.confluence-software-blueprints:retrospectives-blueprint';

export interface ConfluenceTemplate extends TemplateCommon {
  type: TemplateType.Confluence;
  blueprintModuleCompleteKey: BlueprintModuleCompleteKey | null;
  getTitle?: () => string;
  screenShot: {
    preExpand: string;
    postExpand: string;
  };
}

export interface LinkTemplate extends TemplateCommon {
  type: TemplateType.Link;
  url: string;
  renderShortcutIcon: boolean;
}

export interface MoreTemplate extends TemplateCommon {
  type: TemplateType.More;
}

export type Template = ConfluenceTemplate | LinkTemplate | MoreTemplate;
