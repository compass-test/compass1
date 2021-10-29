import React, { useCallback, useMemo, useState } from 'react';

import uuid from 'uuid';

import { FlagGroup } from '@atlaskit/flag';

import { FlagId, FlagPropsWithId } from '../../../common/types';
import { FlagsContextType } from '../../../controllers/flags';

import { FlagContainer } from './flag-container';

export type Props = {
  subscribe: (fn: () => FlagsContextType) => void;
};

export const FlagsRenderer: React.FC<Props> = ({ subscribe }) => {
  const [flags, setFlags] = useState<FlagPropsWithId[]>([]);

  const dismissFlag = useCallback<(id: FlagId) => void>(
    (id) => {
      setFlags((state) => state.filter((f) => f.id !== id));
    },
    [setFlags],
  );

  const showFlag = useCallback<FlagsContextType['showFlag']>(
    (flag) => {
      const internalId = flag.id || uuid.v4();
      setFlags((state) => {
        const foundFlagIndex = state.findIndex((f) => f.id === internalId);
        if (foundFlagIndex > -1) {
          return state.splice(foundFlagIndex, 1, { ...flag, id: internalId });
        }
        return [
          {
            ...flag,
            id: internalId,
          },
          ...state,
        ];
      });
      return () => dismissFlag(internalId);
    },
    [setFlags, dismissFlag],
  );

  useMemo(() => {
    return subscribe(() => {
      return {
        showFlag,
      };
    });
  }, [subscribe, showFlag]);

  return (
    <FlagGroup onDismissed={dismissFlag}>
      {flags.map((flag) => {
        return <FlagContainer {...flag} key={flag.id} />;
      })}
    </FlagGroup>
  );
};
