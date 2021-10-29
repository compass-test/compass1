import { EmojiProvider } from '@atlaskit/emoji';
import type { TagSelectOptions } from '@atlassian/tc-tag-picker';

import { HelpPointer, HelpPointerOwner, TagUsage } from '../../../types';

export type HelpPointerFormData = {
  description?: string;
  tags?: TagSelectOptions | null;
  link?: string;
  name?: string;
  team?: {
    id?: string;
    name?: string;
  };
  helpType?: SelectOption;
  icon?: {
    color: string;
    id?: string;
    shortName: string;
  };
};

export type SelectOption = {
  label: string;
  value: string;
};

export type TagSelectOption = {
  label: string;
  value: string;
  usage?: TagUsage;
  __isNew__?: boolean;
};

export type HelpPointerEditorFormProps = {
  targetHelpPointer?: HelpPointer;
  title: string;
  workspaceInfo: {
    uuid: string;
    cloudId: string;
  };
  fixedOwner?: HelpPointerOwner;
  onClose: () => void;
  onFormSubmit: (
    formData: HelpPointerFormData,
    onCompleteCallback: (error?: string) => void,
  ) => void;
  emojiProvider: Promise<EmojiProvider>;
  tagPickerCallbacks: {
    queryTagList: (inputValue: string) => Promise<TagSelectOptions>;
    createTag: (inputValue: string) => Promise<SelectOption | undefined>;
  };
};
