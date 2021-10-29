import React, { useEffect } from 'react';

/**
 * detects if the ENV is VR Testing
 */
export const isVrTesting = () => {
  return location.port === '9000';
};

type Props = {
  /** the ID of the ready state */
  waitFor?: string;
  /** clip for the screenshot, if not provided, the Vr will use the first nested node bounding rect */
  clip?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  children: JSX.Element;
};

/**
 * Vr preparation
 */
const Vr = ({ waitFor, clip, children }: Props) => {
  useEffect(() => {
    if (waitFor) {
      document.documentElement.setAttribute('data-vr-wait-for', waitFor);
    }
    document.documentElement.setAttribute('data-vr-clip', JSON.stringify(clip));
  }, [clip, waitFor]);
  return children;
};

export default Vr;

/**
 * mounts a <span /> with data-vr-ready on indicate the automation testing that it's ready for a screenshot
 */
export const VrReady = ({ name }: { name: string }) => {
  if (!isVrTesting()) {
    return null;
  }

  return <span data-vr-ready={name}></span>;
};
