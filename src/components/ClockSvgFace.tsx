// An SVG fragment to draw clock face, including graduation marks.

import React, { useContext } from 'react';

import { ClockSvgMark } from '../components';
import { SvgContext } from '../contexts';

export const ClockSvgFace: React.FC = () => {
  const { box, vectorProps } = useContext(SvgContext);

  const bezelThickness = box.size(1/24);

  // TODO magic numbers. Can this represented in a data model layer?
  const marksPerRotation = (360 / 12) * 5;
  const markIndexToAngle = (i: number) => i * ((360 / 12) / 5);

  const graduations = Array.from({ length: marksPerRotation }, (_, i) => {
    const n = markIndexToAngle(i);
    const bold = i % 5 === 0;
    return (
      <ClockSvgMark key={n} rotation={n} bold={bold} />
    );
  });

  // Two circles for the bezel, and a bunch of graduation marks.
  return (
    <>
      <circle cx={box.centerX} cy={box.centerY} r={box.height(1/2) - 1} {...vectorProps} />
      <circle cx={box.centerX} cy={box.centerY} r={box.height(1/2) - bezelThickness} {...vectorProps} />
      {graduations}
    </>
  );
};
