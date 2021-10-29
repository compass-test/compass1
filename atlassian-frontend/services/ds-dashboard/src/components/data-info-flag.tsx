import React, { useEffect } from 'react';

import WarningIcon from '@atlaskit/icon/glyph/warning';
import { Y300 } from '@atlaskit/theme/colors';
import { useFlags } from '@atlaskit/flag';

import getLastBuilt from '../utils/get-last-built';

const DataInfoFlag = () => {
  const { showFlag } = useFlags();

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    const lastBuilt = getLastBuilt();

    showFlag({
      id: 'data-info-flag',
      appearance: 'normal',
      icon: <WarningIcon label="" primaryColor={Y300} />,
      title: 'Data may be stale',
      description: (
        <>
          <p>
            This is still a prototype. Until automatic deployments are enabled,
            package information may be out of date.
          </p>
          <p>Data was last updated {lastBuilt} ago.</p>
        </>
      ),
    });
  }, [showFlag]);

  return null;
};

export default DataInfoFlag;
