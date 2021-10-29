import React from 'react';

import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';

import ComponentTypeSelect from '../../../common/ui/component-type-select';
import ImportanceSelect from '../../../common/ui/importance-select';
import { OwnerPicker } from '../../../common/ui/owner-picker';

import { RowWrapper } from './styled';

type Props = {
  styling?: 'dropdown' | undefined;
};

const ScorecardSettings: React.FC<Props> = (props) => {
  const { cloudId, isAdmin } = useTenantInfo();
  return (
    <RowWrapper>
      <OwnerPicker cloudId={cloudId} onChange={(value) => value} />
      <ComponentTypeSelect {...props} isAdmin={isAdmin()} />
      <ImportanceSelect {...props} isAdmin={isAdmin()} />
    </RowWrapper>
  );
};

export default ScorecardSettings;
