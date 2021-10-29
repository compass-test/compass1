import { Team } from '@atlaskit/user-picker';
import type { TagSelectOptions } from '@atlassian/tc-tag-picker';

import {
  HelpPointerOwner,
  HelpPointerTag,
  HelpPointerType,
} from '../../../types';

import { PointerTypeOption, PointerTypeOptions } from './type-picker';
import { HelpPointerFormData } from './types';

export const MAX_CHARS_NAME_FIELD = 50;
export const MAX_CHARS_DESCRIPTION_FIELD = 160;
export const MAX_CHARS_LINK_FIELD = 2048;
export const MAX_TAGS_TOPICS_FIELD = 10;

export const FieldError = {
  REQUIRED: 'REQUIRED',
  TOO_LONG: 'TOO_LONG',
  INVALID: 'INVALID',
};

const isTooLong = (value: string = '', maxLength: number) => {
  return value.length > maxLength;
};

export const validateName = (value?: string) => {
  if (!value) {
    return FieldError.REQUIRED;
  } else if (isTooLong(value, MAX_CHARS_NAME_FIELD)) {
    return FieldError.TOO_LONG;
  }
  return undefined;
};

export const validateDescription = (
  originalDescriptionSize: number,
  value?: string,
) => {
  if (
    isTooLong(
      value,
      Math.max(MAX_CHARS_DESCRIPTION_FIELD, originalDescriptionSize),
    )
  ) {
    return FieldError.TOO_LONG;
  }
  return undefined;
};

export const validateLink = (value?: string) => {
  if (!value) {
    return FieldError.REQUIRED;
  } else if (isTooLong(value, MAX_CHARS_LINK_FIELD)) {
    return FieldError.TOO_LONG;
  }
  return undefined;
};

export const validateTeam = (value?: string) => {
  return value ? undefined : FieldError.REQUIRED;
};

const validateTags = (tags?: TagSelectOptions) => {
  return tags && tags.length > MAX_TAGS_TOPICS_FIELD
    ? FieldError.TOO_LONG
    : undefined;
};

const validateFormOnSubmit = (
  formData: HelpPointerFormData,
  originalDescriptionSize: number,
) => {
  const errors = {
    link: validateLink(formData.link),
    name: validateName(formData.name),
    description: validateDescription(
      originalDescriptionSize,
      formData.description,
    ),
    teamPicker: validateTeam(formData.team?.id),
    tags: validateTags(formData.tags || undefined),
  };
  if (errors.name || errors.link || errors.description || errors.teamPicker) {
    return errors;
  }
  return undefined;
};

export const validateHelpForm = {
  onSubmit: validateFormOnSubmit,
};

export const getInitialSelectedType = (
  type?: HelpPointerType,
): PointerTypeOption => {
  if (type && type === HelpPointerType.Information) {
    return PointerTypeOptions.knowledgeArticle;
  }
  return PointerTypeOptions.requestForm;
};

export const getInitialSelectedTeam = (
  owner?: HelpPointerOwner,
): Team | undefined => {
  if (owner?.id && owner?.displayName) {
    return {
      id: owner.id,
      name: owner.displayName,
      avatarUrl: owner.avatarUrl,
      type: 'team',
    };
  }
  return undefined;
};

export const getInitialTags = (tags?: HelpPointerTag[]) => {
  return (
    tags?.map((pointerTag) => ({
      label: pointerTag.name,
      value: pointerTag.uuid,
    })) || []
  );
};

export const resolveTypeString = (type: HelpPointerType) => {
  if (type === HelpPointerType.Action) {
    return 'request link';
  }
  return 'article';
};
