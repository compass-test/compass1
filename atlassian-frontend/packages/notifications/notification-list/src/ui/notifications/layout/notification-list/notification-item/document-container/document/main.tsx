import React, { Fragment } from 'react';

import { ExperienceSuccess } from '@atlassian/experience-tracker';

import {
  AdfDocument,
  ContentBodyItem,
  TextDocument,
} from '../../../../../../../common/types';
import { Experiences } from '../../../../../../../common/utils/experience-tracking/types';

import { ExpandableAdfDocument } from './adf-document';
import { ExpandablePlainText } from './plain-text';
import { Shrink } from './styled';

type ExpandableDocumentProps = {
  bodyItems: ContentBodyItem[];
  isExpanded: boolean;
  notificationId: string;
};

const isAdfItem = (
  item: ContentBodyItem,
): item is ContentBodyItem<AdfDocument> => {
  return item.document.format === 'ADF';
};

const isTextItem = (
  item: ContentBodyItem,
): item is ContentBodyItem<TextDocument> => {
  return item.document.format === 'TEXT';
};

const ExpandableDocument = ({
  bodyItems,
  isExpanded,
  notificationId,
}: ExpandableDocumentProps) => {
  if (bodyItems.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <Shrink>
        {bodyItems.map((item, index) =>
          isTextItem(item) ? (
            <ExpandablePlainText
              key={index}
              isExpanded={isExpanded}
              author={item.author}
              documentData={item.document.data}
              isQuoted={item.appearance === 'QUOTED'}
            />
          ) : isAdfItem(item) ? (
            <ExpandableAdfDocument
              key={index}
              document={item.document}
              author={item.author}
              isExpanded={isExpanded}
              isQuoted={item.appearance === 'QUOTED'}
            />
          ) : null,
        )}
        <ExperienceSuccess
          name={
            Experiences.RENDER_INDIVIDUAL_NOTIFICATION_WITH_CONTENT +
            '/' +
            notificationId
          }
        />
      </Shrink>
    </Fragment>
  );
};

export { ExpandableDocument };
