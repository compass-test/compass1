import ArchiveIcon from '@atlaskit/icon-file-type/glyph/archive/16';
import AudioIcon from '@atlaskit/icon-file-type/glyph/audio/16';
import ExcelSpreadsheetIcon from '@atlaskit/icon-file-type/glyph/excel-spreadsheet/16';
import GenericIcon from '@atlaskit/icon-file-type/glyph/generic/16';
import ImageIcon from '@atlaskit/icon-file-type/glyph/image/16';
import PdfDocumentIcon from '@atlaskit/icon-file-type/glyph/pdf-document/16';
import PowerpointPresentationIcon from '@atlaskit/icon-file-type/glyph/powerpoint-presentation/16';
import SourceCodeIcon from '@atlaskit/icon-file-type/glyph/source-code/16';
import VideoIcon from '@atlaskit/icon-file-type/glyph/video/16';
import WordDocumentIcon from '@atlaskit/icon-file-type/glyph/word-document/16';
import BlogIcon from '@atlaskit/icon-object/glyph/blog/16';
import PageIcon from '@atlaskit/icon-object/glyph/page/16';
import ArchiveIcon24 from '@atlaskit/icon-file-type/glyph/archive/24';
import AudioIcon24 from '@atlaskit/icon-file-type/glyph/audio/24';
import ExcelSpreadsheetIcon24 from '@atlaskit/icon-file-type/glyph/excel-spreadsheet/24';
import GenericIcon24 from '@atlaskit/icon-file-type/glyph/generic/24';
import ImageIcon24 from '@atlaskit/icon-file-type/glyph/image/24';
import PdfDocumentIcon24 from '@atlaskit/icon-file-type/glyph/pdf-document/24';
import PowerpointPresentationIcon24 from '@atlaskit/icon-file-type/glyph/powerpoint-presentation/24';
import SourceCodeIcon24 from '@atlaskit/icon-file-type/glyph/source-code/24';
import VideoIcon24 from '@atlaskit/icon-file-type/glyph/video/24';
import WordDocumentIcon24 from '@atlaskit/icon-file-type/glyph/word-document/24';
import BlogIcon24 from '@atlaskit/icon-object/glyph/blog/24';
import PageIcon24 from '@atlaskit/icon-object/glyph/page/24';
import React from 'react';
import {
  ConfluenceAttachment,
  ConfluenceBlogpost,
  ConfluencePage,
} from '../../clients';
import { ConfItemResult } from '../../clients/response-types';

export interface ExtensionMatcher {
  regexp: RegExp;
  avatar: any; // can't seem to find a type that doesn't complain here.
  avatarLarge: any;
}

/**
 * The following code was derived from an implementation in confluence-frontend,
 * although it differs substantially.
 *
 * The original can be found at ./packages/confluence-rest-api/src/helpers/icons.js
 */
const ATTACHMENT_ICON_CLASS_PREFIXES = [
  // Quick Nav prefix
  'content-type-attachment-',
  // CQL prefix
  'icon-file-',
];

const DEFAULT_ATTACHMENT_AVATAR = GenericIcon;
const DEFAULT_ATTACHMENT_AVATAR_LARGE = GenericIcon24;
const ATTACHMENT_FILE_EXTENSION_MATCHERS: ExtensionMatcher[] = [
  {
    regexp: /\.(gif|jpeg|jpg|png)$/i,
    avatar: ImageIcon,
    avatarLarge: ImageIcon24,
  },
  {
    regexp: /\.(pdf)$/i,
    avatar: PdfDocumentIcon,
    avatarLarge: PdfDocumentIcon24,
  },
  {
    regexp: /\.(docx|dotx|doc|dot)$/i,
    avatar: WordDocumentIcon,
    avatarLarge: WordDocumentIcon24,
  },
  {
    regexp: /\.(xml|html|js|css|java|jar|war|ear)$/i,
    avatar: SourceCodeIcon,
    avatarLarge: SourceCodeIcon24,
  },
  {
    regexp: /\.(xlt|xls|xlsm|xlsx|xlst)$/i,
    avatar: ExcelSpreadsheetIcon,
    avatarLarge: ExcelSpreadsheetIcon24,
  },
  {
    regexp: /\.(wma|wmv|ram|mp3)$/i,
    avatar: AudioIcon,
    avatarLarge: AudioIcon24,
  },
  {
    regexp: /\.(pptx|ppsx|potx|pot|ppt|pptm)$/i,
    avatar: PowerpointPresentationIcon,
    avatarLarge: PowerpointPresentationIcon24,
  },
  {
    regexp: /\.(mov|mpeg|mpg|mp4|avi)$/i,
    avatar: VideoIcon,
    avatarLarge: VideoIcon24,
  },
  {
    regexp: /\.(zip)$/i,
    avatar: ArchiveIcon,
    avatarLarge: ArchiveIcon24,
  },
];

const getIconType = (
  iconClass: string,
  fileName: string,
  isLarge?: boolean,
) => {
  // Check the iconClass to make sure we're looking at an attachment
  const prefixMatches = ATTACHMENT_ICON_CLASS_PREFIXES.find((prefix) => {
    return iconClass.startsWith(prefix);
  });

  // if it's an attachment, look at the file extension to work out which type
  if (prefixMatches) {
    const matchingType:
      | ExtensionMatcher
      | undefined = ATTACHMENT_FILE_EXTENSION_MATCHERS.find(
      (extensionMatcher: ExtensionMatcher) => {
        const matches = extensionMatcher.regexp.exec(fileName);
        return !!matches && matches.length > 0;
      },
    );

    if (matchingType) {
      return isLarge ? matchingType.avatarLarge : matchingType.avatar;
    }
  }

  return isLarge ? DEFAULT_ATTACHMENT_AVATAR_LARGE : DEFAULT_ATTACHMENT_AVATAR;
};

export const getAvatarForConfluenceObjectResult = (
  result: ConfItemResult,
  isCollapsed?: boolean,
) => {
  if (result.contentType === ConfluencePage) {
    const Icon = isCollapsed ? PageIcon24 : PageIcon;
    return <Icon label={result.name} />;
  } else if (result.contentType === ConfluenceBlogpost) {
    const Icon = isCollapsed ? BlogIcon24 : BlogIcon;
    return <Icon label={result.name} />;
  } else if (result.contentType === ConfluenceAttachment) {
    return getMediaTypeAvatarForResult(result, isCollapsed);
  }

  return <></>;
};

export const getMediaTypeAvatarForResult = (
  result: ConfItemResult,
  isCollapsed?: boolean,
) => {
  const IconComponent = getIconType(
    result.iconClass || '',
    result.name,
    isCollapsed,
  );

  return <IconComponent label={result.name} />;
};
