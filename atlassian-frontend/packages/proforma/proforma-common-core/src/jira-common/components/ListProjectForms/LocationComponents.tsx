import React from 'react';

import { observer } from 'mobx-react-lite';
import { FormattedMessage } from 'react-intl';

import { RequestType } from '../../models/ProjectForm';

import { InlineDialogWithButton } from './InlineDialogWithButton';
import {
  IntlListProjectFormsMessages,
  ListProjectFormsMessage,
} from './ListProjectFormsMessages.intl';
import { getLocations, Location, LocationMessages } from './location';
import {
  RequestTypeDescription,
  RequestTypesProps,
} from './RequestTypeComponents';
import {
  LocationNameWrapper,
  LocationRequestsTableWrapper,
  LocationTableWrapper,
  RequestTypeWrapper,
} from './styled';
import { groupRequestTypes } from './ticketType';

interface LocationsProps {
  locations: Location[];
}

const LocationDescription = observer<{ location: Location }>(({ location }) => {
  return (
    <LocationNameWrapper>
      <FormattedMessage
        {...IntlListProjectFormsMessages[LocationMessages[location]]}
      />
    </LocationNameWrapper>
  );
});

const LocationsDescriptions = observer<LocationsProps>(({ locations }) => {
  const sortedLocations = [...locations].sort();
  const rows = (
    <>
      {sortedLocations.map((location, index, args) => {
        // also add a horizontal rule between elements, but not after the last element.
        return (
          <tr>
            <td>
              <LocationDescription location={location} />
            </td>
          </tr>
        );
      })}
    </>
  );

  return (
    <LocationTableWrapper>
      <table>{rows}</table>
    </LocationTableWrapper>
  );
});

const MultipleRequestsLocationsDialog = observer<
  { uniqueLocations: number } & RequestTypesProps
>(({ requestTypes, uniqueLocations }) => {
  const label = (
    <FormattedMessage
      {...IntlListProjectFormsMessages[ListProjectFormsMessage.Locations]}
      values={{ locations: uniqueLocations }}
    />
  );
  const descriptions = (
    <MultipleRequestsLocationsDescriptions requestTypes={requestTypes} />
  );
  return <InlineDialogWithButton child={descriptions} label={label} />;
});

const MultipleLocationsDialog = observer<LocationsProps>(({ locations }) => {
  const label = (
    <FormattedMessage
      {...IntlListProjectFormsMessages[ListProjectFormsMessage.Locations]}
      values={{ locations: locations.length }}
    />
  );
  const locationsDescriptions = <LocationsDescriptions locations={locations} />;
  return <InlineDialogWithButton child={locationsDescriptions} label={label} />;
});

const MultipleRequestsLocationsDescriptions = observer<RequestTypesProps>(
  ({ requestTypes }) => {
    const groupedRequestTypes: {
      [key: string]: RequestType[];
    } = groupRequestTypes(requestTypes);

    // Find the most number of locations for all request types. We'll need to pad entries in the table rows to ensure
    // all rows have the same number of columns for alignment.
    const maxLocations = Math.max(
      ...Object.values(groupedRequestTypes).map(
        rts => getLocations(rts).length,
      ),
    );

    const rowPadding = (columns: number) =>
      [...Array(columns).keys()].map(() => <td />);

    const rows: JSX.Element[] = Object.keys(groupedRequestTypes).map(rtId => {
      const rts = groupedRequestTypes[rtId];
      const rt = rts[0];
      const locations = getLocations(rts);
      return (
        <>
          <tr>
            <td>
              <RequestTypeWrapper>
                <RequestTypeDescription requestType={rt} />
              </RequestTypeWrapper>
            </td>
            {locations.map(location => {
              return (
                <>
                  <td>
                    <LocationDescription location={location} />
                  </td>
                </>
              );
            })}
            {rowPadding(maxLocations - locations.length)}
          </tr>
        </>
      );
    });
    return (
      <LocationRequestsTableWrapper>
        <table>{rows}</table>
      </LocationRequestsTableWrapper>
    );
  },
);

export const FormLocationsComponent = observer<RequestTypesProps>(
  ({ requestTypes }) => {
    if (requestTypes.length === 0) {
      return <></>;
    }

    const groupedRequestTypes: {
      [key: string]: RequestType[];
    } = groupRequestTypes(requestTypes);

    const locations = Object.values(groupedRequestTypes).map(getLocations);
    const flatLocations = ([] as Location[]).concat(...locations);
    const uniqueLocations: Location[] = [...new Set(flatLocations)];

    const uniqueLocationsSize = uniqueLocations.length;
    if (uniqueLocationsSize > 1 && requestTypes.length > 1) {
      return (
        <MultipleRequestsLocationsDialog
          requestTypes={requestTypes}
          uniqueLocations={uniqueLocationsSize}
        />
      );
    } else if (uniqueLocationsSize > 1) {
      return <MultipleLocationsDialog locations={uniqueLocations} />;
    } else if (uniqueLocationsSize === 1) {
      return (
        <FormattedMessage
          {...IntlListProjectFormsMessages[
            LocationMessages[uniqueLocations[0]]
          ]}
        />
      );
    } else {
      return <></>;
    }
  },
);
