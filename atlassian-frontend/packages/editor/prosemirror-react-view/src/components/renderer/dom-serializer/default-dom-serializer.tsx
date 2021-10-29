import React, {
  FunctionComponent,
  memo,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

import { DOMSerializerContext } from './context';
import { DOMSerializerDummy } from './serializers/dummy-serializer';
import { createDomSerializer } from './serializers/schema-serializer';
import { DOMSerializer } from './types';

export interface Props {
  schema: Schema;
  plugins?: Plugin[];
}

const DefaultDOMSerializer: FunctionComponent<PropsWithChildren<Props>> = ({
  schema,
  plugins,
  children,
}) => {
  const [domSerializer, setDomSerializer] = useState<DOMSerializer>(
    DOMSerializerDummy,
  );

  useEffect(() => {
    setDomSerializer(createDomSerializer(schema, plugins));
  }, [schema, plugins]);

  return (
    <DOMSerializerContext.Provider value={domSerializer}>
      {children}
    </DOMSerializerContext.Provider>
  );
};

const DefaultDOMSerializerMemoized = memo(DefaultDOMSerializer);

export { DefaultDOMSerializerMemoized as DefaultDOMSerializer };
