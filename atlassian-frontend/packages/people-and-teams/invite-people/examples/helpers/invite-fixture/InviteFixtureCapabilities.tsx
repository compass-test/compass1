import React from 'react';
import { InviteFixtureData, mergeInviteFixture } from './mockInviteServer';
import Button from '@atlaskit/button';
import { InviteFixtureSelect } from './InviteFixtureSelect';

export const InviteFixtureCapabilities = ({
  value,
  onChange,
  collapsedEntriesLimit = 4,
}: {
  value: InviteFixtureData;
  onChange: (c: InviteFixtureData) => void;
  collapsedEntriesLimit?: number;
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = React.useCallback(
    (changedFixture) => {
      onChange(mergeInviteFixture(value, [changedFixture]));
    },
    [onChange, value],
  );
  const toggle = React.useCallback(
    () => setExpanded((isExpanded) => !isExpanded),
    [],
  );
  const entriesVisible = expanded
    ? value.length
    : Math.min(value.length, collapsedEntriesLimit);

  return (
    <>
      <table>
        <tbody style={{ border: 'none' }}>
          {value.slice(0, entriesVisible).map((resourceFixture) => (
            <tr key={resourceFixture.ari}>
              <td>{resourceFixture.productId}</td>
              <td style={{ width: '140px' }}>
                <InviteFixtureSelect
                  value={resourceFixture}
                  onChange={handleChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {value.length > collapsedEntriesLimit && (
        <Button appearance="link" onClick={toggle}>
          {expanded
            ? `Fewer products`
            : `More products (${value.length - collapsedEntriesLimit})`}
        </Button>
      )}
    </>
  );
};
