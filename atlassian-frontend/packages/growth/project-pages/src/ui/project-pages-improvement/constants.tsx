import BulletListIcon from '@atlaskit/icon/glyph/bullet-list';
import DecisionIcon from '@atlaskit/icon/glyph/decision';
import DiscoverFilledIcon from '@atlaskit/icon/glyph/discover-filled';
import PageIcon from '@atlaskit/icon/glyph/page';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import { B300, G300, N20, P300, T300, Y300 } from '@atlaskit/theme/colors';
import React from 'react';
import BlankPreExpandScreenshot from './assets/pre-expand/blank.svg';
import BlankPostExpandScreenshot from './assets/post-expand/blank.png';
import DecisionPreExpandScreenshot from './assets/pre-expand/decision.svg';
import DecisionPostExpandScreenshot from './assets/post-expand/decision.png';
import MeetingNotesPreExpandScreenshot from './assets/pre-expand/meeting-notes.svg';
import MeetingNotesPostExpandScreenshot from './assets/post-expand/meeting-notes.png';
import ProductRequirementsPreExpandScreenshot from './assets/pre-expand/product-requirements.svg';
import ProductRequirementsPostExpandScreenshot from './assets/post-expand/product-requirements.png';
import RetrospectivePreExpandScreenshot from './assets/pre-expand/retrospective.svg';
import RetrospectivePostExpandScreenshot from './assets/post-expand/retrospective.png';
// Manually base64 encoded so we don't get an ugly flash when going from SSR -> client
import RetrospectiveIcon from './assets/retro-icon';
import messages from './messages';
import { TemplateIcon } from './styled';
import { Template, TemplateType } from '../../controllers/template/types';
import { getDateString, getIconImageSize } from './utils';

const templates: Template[] = [
  {
    type: TemplateType.Confluence,
    key: 'blankPage',
    name: messages.blankPageTemplateName,
    description: messages.blankPageTemplateDescription,
    blueprintModuleCompleteKey: null,
    iconRender: ({ size, color }) => (
      <TemplateIcon size={size} backgroundColor={color}>
        <PageIcon label="blank" primaryColor="#fff" size={size} />
      </TemplateIcon>
    ),
    defaultIconColor: B300,
    screenShot: {
      preExpand: BlankPreExpandScreenshot,
      postExpand: BlankPostExpandScreenshot,
    },
  },
  {
    type: TemplateType.Confluence,
    key: 'productRequirements',
    name: messages.productRequirementsTemplateName,
    description: messages.productRequirementsTemplateDescription,
    blueprintModuleCompleteKey:
      'com.atlassian.confluence.plugins.confluence-software-blueprints:requirements-blueprint',
    iconRender: ({ size, color }) => (
      <TemplateIcon size={size} backgroundColor={color}>
        <BulletListIcon
          label="product-requirements"
          primaryColor="#fff"
          size={size}
        />
      </TemplateIcon>
    ),
    defaultIconColor: P300,
    screenShot: {
      preExpand: ProductRequirementsPreExpandScreenshot,
      postExpand: ProductRequirementsPostExpandScreenshot,
    },
    getTitle: () => `${getDateString()} Product requirements`,
  },
  {
    type: TemplateType.Confluence,
    key: 'decision',
    name: messages.decisionTemplateName,
    description: messages.decisionTemplateDescription,
    blueprintModuleCompleteKey:
      'com.atlassian.confluence.plugins.confluence-business-blueprints:decisions-blueprint',
    iconRender: ({ size, color }) => (
      <TemplateIcon size={size} backgroundColor={color}>
        <DecisionIcon label="decision" primaryColor="#fff" size={size} />
      </TemplateIcon>
    ),
    defaultIconColor: G300,
    screenShot: {
      preExpand: DecisionPreExpandScreenshot,
      postExpand: DecisionPostExpandScreenshot,
    },
    getTitle: () => `${getDateString()} Decision`,
  },
  {
    type: TemplateType.Confluence,
    key: 'meetingNotes',
    name: messages.meetingNotesTemplateName,
    description: messages.meetingNotesTemplateDescription,
    blueprintModuleCompleteKey:
      'com.atlassian.confluence.plugins.confluence-business-blueprints:meeting-notes-blueprint',
    iconRender: ({ size, color }) => (
      <TemplateIcon size={size} backgroundColor={color}>
        <PeopleGroupIcon
          label="meeting-notes"
          primaryColor="#fff"
          size={size}
        />
      </TemplateIcon>
    ),
    defaultIconColor: T300,
    screenShot: {
      preExpand: MeetingNotesPreExpandScreenshot,
      postExpand: MeetingNotesPostExpandScreenshot,
    },
  },
  {
    type: TemplateType.Confluence,
    key: 'retrospective',
    name: messages.retrospectiveTemplateName,
    description: messages.retrospectiveTemplateDescription,
    blueprintModuleCompleteKey:
      'com.atlassian.confluence.plugins.confluence-software-blueprints:retrospectives-blueprint',
    iconRender: ({ size, color }) => (
      <TemplateIcon size={size} backgroundColor={color}>
        <img
          src={RetrospectiveIcon}
          width={getIconImageSize(size)}
          height={getIconImageSize(size)}
        />
      </TemplateIcon>
    ),
    defaultIconColor: Y300,
    screenShot: {
      preExpand: RetrospectivePreExpandScreenshot,
      postExpand: RetrospectivePostExpandScreenshot,
    },
    getTitle: () => `${getDateString()} Retrospective`,
  },
];

const moreTemplate: Template = {
  type: TemplateType.More,
  key: 'more',
  name: messages.templatesPreExpandMore,
  iconRender: ({ size, color }) => (
    <TemplateIcon size={size} backgroundColor={color}>
      <DiscoverFilledIcon label="more" primaryColor="#000" size={size} />
    </TemplateIcon>
  ),
  defaultIconColor: N20,
};

export const postExpandTemplates: Template[] = [
  ...templates.map((t) => ({ ...t, tooltip: messages.templateTooltip })),
  {
    ...moreTemplate,
    name: messages.templatesPostExpandMore,
    tooltip: messages.templatesPostExpandMoreTooltip,
  },
];

export const preExpandTemplates: Template[] = [
  ...templates,
  {
    ...moreTemplate,
    type: TemplateType.Link,
    url: 'https://www.atlassian.com/software/confluence/templates',
    renderShortcutIcon: false,
  },
];
