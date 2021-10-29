import {
  bulletList,
  listItem,
  text,
  link,
  strike,
  paragraph,
  heading,
  doc,
} from '@atlaskit/adf-utils';

import { getRepositoryUrl } from './repository';
import { fromRemote } from './remote-linker';

import type {
  BulletListDefinition,
  ParagraphDefinition,
  InlineFormattedText,
} from '@atlaskit/adf-schema';
import type { FileResult } from '../../types';

type MarkerFn<T> = (arg: T) => ReturnType<typeof text | typeof strike>;

type UpdatePayload = {
  description: string;
  ruleName: string;
  helpLink: string;
  offendingFiles: FileResult[];
  fixedFiles?: string[];
};
export function descriptionToADF({
  description,
  ruleName,
  helpLink,
  offendingFiles,
  fixedFiles,
}: UpdatePayload) {
  const Linker = fromRemote(getRepositoryUrl());
  const fixedFilesData =
    fixedFiles && fixedFiles.length
      ? [
          heading({ level: 3 })(text('Fixed files:')),
          toList(fixedFiles, strike),
        ]
      : [];
  return doc(
    paragraph(description),
    heading({ level: 3 })(text('Rule:')),
    paragraph(text(ruleName)),
    heading({ level: 3 })(text('Help link:')),
    paragraph(link({ href: helpLink })(helpLink)),
    heading({ level: 3 })(text('Files:')),
    toList(offendingFiles, (file) =>
      link({ href: Linker.linkToFile(file) })(file.name),
    ),
    ...fixedFilesData,
  );
}

const toList = <T>(files: T[], markerFn: MarkerFn<T>) => {
  return bulletList(
    ...files.map((file) => listItem([paragraph(markerFn(file))])),
  );
};

export const extractTextFromList = (list: BulletListDefinition) =>
  list.content
    .flatMap((listItem) =>
      listItem.content.flatMap((contentItem) =>
        (contentItem as ParagraphDefinition).content?.map(
          (itemContent) => (itemContent as InlineFormattedText).text,
        ),
      ),
    )
    .filter(Boolean) as string[];
