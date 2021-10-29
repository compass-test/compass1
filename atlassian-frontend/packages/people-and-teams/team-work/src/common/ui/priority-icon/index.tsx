import React from 'react';

import { Size } from '@atlaskit/icon';
import PriorityBlockerIcon from '@atlaskit/icon-priority/glyph/priority-blocker';
import PriorityCriticalIcon from '@atlaskit/icon-priority/glyph/priority-critical';
import PriorityHighIcon from '@atlaskit/icon-priority/glyph/priority-high';
import PriorityHighestIcon from '@atlaskit/icon-priority/glyph/priority-highest';
import PriorityLowIcon from '@atlaskit/icon-priority/glyph/priority-low';
import PriorityLowestIcon from '@atlaskit/icon-priority/glyph/priority-lowest';
import PriorityMajorIcon from '@atlaskit/icon-priority/glyph/priority-major';
import PriorityMediumIcon from '@atlaskit/icon-priority/glyph/priority-medium';
import PriorityMinorIcon from '@atlaskit/icon-priority/glyph/priority-minor';
import PriorityTrivialIcon from '@atlaskit/icon-priority/glyph/priority-trivial';
import QuestionIcon from '@atlaskit/icon/glyph/question';
import { N200 } from '@atlaskit/theme/colors';

export type Priority = {
  name: string;
};

export const PriorityIcon = ({
  name,
  size = 'small',
}: Priority & {
  size?: Size;
}) => {
  const nlower = name.toLowerCase();

  switch (true) {
    case nlower === 'trivial':
      return <PriorityTrivialIcon size={size} label={name} />;
    case nlower === 'minor':
      return <PriorityMinorIcon size={size} label={name} />;
    case nlower === 'lowest':
      return <PriorityLowestIcon size={size} label={name} />;
    case nlower === 'low':
      return <PriorityLowIcon size={size} label={name} />;
    case nlower === 'medium':
      return <PriorityMediumIcon size={size} label={name} />;
    case nlower === 'high':
      return <PriorityHighIcon size={size} label={name} />;
    case nlower === 'highest':
      return <PriorityHighestIcon size={size} label={name} />;
    case nlower === 'major':
      return <PriorityMajorIcon size={size} label={name} />;
    case nlower === 'blocker':
      return <PriorityBlockerIcon size={size} label={name} />;
    case nlower === 'critical':
      return <PriorityCriticalIcon size={size} label={name} />;
    default:
      return <QuestionIcon size={size} label={name} primaryColor={N200} />;
  }
};

export default PriorityIcon;
