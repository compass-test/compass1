import React from 'react';

import {
  ContentLG,
  ContentMD,
  ContentSM,
  ContentXL,
  ContentXS,
} from './styled';

/**
 * ResponsiveResize takes items and their corresponding screen size, and
 * automatically wraps them in the correct breakpoints
 *
 * If not all of the parameters are provided, ResponsiveResize fills in
 * the missing sizes. Anything smaller than provided is filled with the
 * smallest given size's items, and the largest is filled with the largest
 * items given
 *
 */

export const ResponsiveResize = ({
  xs,
  sm,
  md,
  lg,
  xl,
}: {
  xs?: JSX.Element | string;
  sm?: JSX.Element | string;
  md?: JSX.Element | string;
  lg?: JSX.Element | string;
  xl?: JSX.Element | string;
}) => {
  const responsiveSizes = [xs, sm, md, lg, xl];
  autofillMissingSizes(responsiveSizes);

  return (
    <>
      <ContentXS>{responsiveSizes[0]}</ContentXS>
      <ContentSM>{responsiveSizes[1]}</ContentSM>
      <ContentMD>{responsiveSizes[2]}</ContentMD>
      <ContentLG>{responsiveSizes[3]}</ContentLG>
      <ContentXL>{responsiveSizes[4]}</ContentXL>
    </>
  );
};

function autofillMissingSizes(
  responsiveSizes: Array<JSX.Element | string | undefined>,
) {
  responsiveSizes.forEach((element, index) => {
    if (element === undefined) {
      const nextNonNull = getNextDefined(responsiveSizes, index);
      responsiveSizes[index] =
        nextNonNull !== undefined ? nextNonNull : responsiveSizes[index - 1];
    }
  });
}

function getNextDefined(
  responsiveSizes: Array<JSX.Element | string | undefined>,
  index: number,
): JSX.Element | string | undefined {
  for (let i = index; i < responsiveSizes.length; i++) {
    if (responsiveSizes[i] !== undefined) {
      return responsiveSizes[i];
    }
  }
}
