import { SpaceContainerType } from '../common/clients/common-types';
import { useEffect } from 'react';
import { useClients } from './clients';

const WarmUpCollabGraphCache = () => {
  const { collabGraphClient } = useClients();

  useEffect(() => {
    collabGraphClient.getUsers();
    collabGraphClient.getContainers([SpaceContainerType]);
  }, [collabGraphClient]);
  return null;
};

export default WarmUpCollabGraphCache;
