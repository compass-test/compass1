import React from 'react';

import { EditablePanel, EditablePanelProps } from '@atlassian/commerce-layout';

import { PostalAddress } from '../../types';
import { DefinitionList } from '../definition-list';

import { Address, Empty } from './styled';

export { Empty } from './styled';

type PostalAddressWithName = Partial<
  PostalAddress & { name: string; taxId?: string }
>;

export const AddressInline: React.FC<PostalAddressWithName> = ({
  line1,
  line2,
  postcode,
  state,
  country,
  city,
  name,
}) => {
  if (
    !!line1 ||
    !!line2 ||
    !!postcode ||
    !!state ||
    !!country ||
    !!city ||
    !!name
  ) {
    return (
      <Address
        vocab="http://schema.org/"
        property="address"
        typeof="PostalAddress"
      >
        {!!name && <span>{name}</span>}
        {(!!line1 || !!line2) && (
          <span property="streetAddress">
            {!!line1 && line1}
            {!!line2 && `, ${line2}`}
          </span>
        )}
        {!!postcode && <span property="postalCode">{postcode}</span>}
        {!!city && <span property="addressLocality">{city}</span>}
        {!!state && <span property="addressRegion">{state}</span>}
        {!!country && <span property="countryName">{country}</span>}
      </Address>
    );
  }
  return <Empty>address not set</Empty>;
};

export const AddressElement: React.FC<PostalAddressWithName> = ({
  name,
  taxId,
  ...postalAddress
}) => (
  <DefinitionList
    items={[
      {
        term: 'Company name',
        description: name ? name : <Empty>Company name not added</Empty>,
      },
      {
        term: 'Company address',
        description: <AddressInline {...postalAddress} />,
      },
      {
        term: 'Tax ID',
        description: taxId ? taxId : <Empty>Tax ID not added</Empty>,
      },
    ]}
  />
);

export const AddressPanel: React.FC<
  PostalAddressWithName & EditablePanelProps
> = ({ testId, ...props }) => (
  <EditablePanel
    onEdit={props.onEdit}
    editLabel={props.editLabel!}
    testId={testId}
  >
    <AddressElement {...props} />
  </EditablePanel>
);
