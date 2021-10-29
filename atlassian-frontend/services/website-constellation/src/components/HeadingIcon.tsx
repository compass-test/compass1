import React from 'react';
import Icon from '@atlaskit/icon';
import { CATEGORY_NAMES } from '../utils/constants';
import avatarBrand from '../icons/avatar-brand.svg';
import avatarComponent from '../icons/avatar-components.svg';
import avatarContent from '../icons/avatar-content.svg';
import avatarFoundations from '../icons/avatar-foundations.svg';
import avatarGetStarted from '../icons/avatar-get-started.svg';
import avatarPatterns from '../icons/avatar-patterns.svg';
import avatarResources from '../icons/avatar-resources.svg';

const getIcon = (heading: string = '') => {
  switch (heading.toLowerCase()) {
    case CATEGORY_NAMES.BRAND:
      return avatarBrand;
    case CATEGORY_NAMES.COMPONENTS:
      return avatarComponent;
    case CATEGORY_NAMES.CONTENT:
      return avatarContent;
    case CATEGORY_NAMES.FOUNDATIONS:
      return avatarFoundations;
    case CATEGORY_NAMES.RESOURCES:
      return avatarResources;
    case CATEGORY_NAMES.PATTERNS:
      return avatarPatterns;
    case 'getting started':
      return avatarGetStarted;
    default:
      return null;
  }
};

export default function HeadingIcon({ heading }) {
  const glyph = getIcon(heading);
  return <Icon glyph={glyph} label="" size="medium" />;
}
