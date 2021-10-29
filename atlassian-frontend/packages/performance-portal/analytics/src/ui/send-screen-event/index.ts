import { useLayoutEffect } from 'react';

import { sendScreenEvent } from '../../utils/analytics-web-client';

type Props = {
  name: string;
  attributes?: { [key: string]: string | number | boolean };
};

export const SendScreenEvent = ({ name, attributes }: Props) => {
  useLayoutEffect(() => {
    sendScreenEvent(`${name}Screen`, attributes);
  }, [attributes, name]);
  return null;
};
