import React from 'react';
import Image, { maxWidths } from './';
import { createDefaultExport } from '@atlassian/aux-test-utils';

export default createDefaultExport();

const SRC =
  'https://wac-cdn.atlassian.com/dam/jcr:b86a32cb-0aa8-4783-aa81-9592d4fbf829/jsw-header-illustrations---v3.png';

export const basic = () => <Image src={SRC} alt="homer" />;

export function Sizes() {
  return (
    <>
      {Object.keys(maxWidths).map((size, i) => {
        return (
          <Image
            key={i}
            src={SRC}
            size={size as keyof typeof maxWidths}
            alt="homer"
          />
        );
      })}
    </>
  );
}
