import AddNew from '@atlaskit/icon/glyph/add-item';
import Comment from '@atlaskit/icon/glyph/comment';
import EmojiAdd from '@atlaskit/icon/glyph/emoji-add';
import Feedback from '@atlaskit/icon/glyph/feedback';
import LinkIcon from '@atlaskit/icon/glyph/link';
import Pages from '@atlaskit/icon/glyph/page';

import messages from './messages';
import { FeatureItem } from './types';

export const featureItems: FeatureItem[] = [
  {
    icon: Pages,
    title: messages.projectPagesTitle,
    description: messages.projectPagesDescription,
  },
  {
    icon: AddNew,
    title: messages.bestPracticeTemplatesTitle,
    description: messages.bestPracticeTemplatesDescription,
  },
  {
    icon: LinkIcon,
    title: messages.createJiraIssuesTitle,
    description: messages.createJiraIssuesDescription,
  },
  {
    icon: Comment,
    title: messages.coEditingTitle,
    description: messages.coEditingDescription,
  },
  {
    icon: Feedback,
    title: messages.realTimeInsightsTitle,
    description: messages.realTimeInsightsDescription,
  },
  {
    icon: EmojiAdd,
    title: messages.freeTitle,
    description: messages.freeDescription,
  },
];
