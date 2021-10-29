import React from 'react';

import { observer } from 'mobx-react-lite';
import { FormattedMessage } from 'react-intl';

import { RequestType } from '../../models/ProjectForm';

import { InlineDialogWithButton } from './InlineDialogWithButton';
import { IntlListProjectFormsMessages } from './ListProjectFormsMessages.intl';
import {
  RequestTypeIconSmall,
  RequestTypePaddingWrapper,
  RequestTypesDivider,
  RequestTypeWrapper,
} from './styled';
import { groupRequestTypes } from './ticketType';
import { TypeRenderer } from './TypeRenderer';

interface RequestTypesAndRendererProps {
  requestTypes: RequestType[];
  typeRenderer: TypeRenderer;
}

export interface RequestTypesProps {
  requestTypes: RequestType[];
}

export const RequestTypeDescription: React.FC<{ requestType: RequestType }> = ({
  requestType,
}) => {
  return (
    <>
      <RequestTypeIconSmall src={requestType.iconUrl} />
      {requestType.name}
    </>
  );
};

export const RequestTypesDescriptions: React.FC<RequestTypesProps> = ({
  requestTypes,
}) => {
  return (
    <div>
      {requestTypes.map((requestType, index, args) => {
        // also add a horizontal rule between elements, but not after the last element.
        return (
          <div>
            <RequestTypePaddingWrapper>
              <RequestTypeDescription requestType={requestType} />
            </RequestTypePaddingWrapper>
            {index < args.length - 1 && <RequestTypesDivider />}
          </div>
        );
      })}
    </div>
  );
};

export const RequestTypesComponent = observer<RequestTypesAndRendererProps>(
  ({ requestTypes, typeRenderer }) => {
    const groupedRequestTypes = groupRequestTypes(requestTypes);
    const keys = Object.keys(groupedRequestTypes);

    if (keys.length === 0) {
      return <></>;
    } else if (keys.length === 1) {
      return (
        <RequestTypeWrapper>
          <RequestTypeDescription
            requestType={groupedRequestTypes[keys[0]][0]}
          />
        </RequestTypeWrapper>
      );
    } else {
      const content = (
        <RequestTypesDescriptions
          requestTypes={Object.values(groupedRequestTypes).map(rts => rts[0])}
        />
      );
      const label = (
        <FormattedMessage
          {...IntlListProjectFormsMessages[typeRenderer.groupLabel]}
          values={{ types: keys.length }}
        />
      );

      return (
        <RequestTypeWrapper>
          <InlineDialogWithButton label={label} child={content} />
        </RequestTypeWrapper>
      );
    }
  },
);
