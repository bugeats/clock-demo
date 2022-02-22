// An SVG fragment to draw clock face, including graduation marks.

import React, { useContext } from 'react';

import { ClockSvgMark } from '../components';
import { SvgContext } from '../contexts';
import * as AnalogClock from '../models/AnalogClock';

export const ClockSvgFace: React.FC = () => {
  const { box, vectorProps } = useContext(SvgContext);

  const bezelThickness = box.size(1 / 24);

  const graduations = AnalogClock.graduationMarks.map((mark) => (
    <ClockSvgMark key={mark.angle} rotation={mark.angle} bold={mark.bold}/>
  ));

  // Two circles for the bezel, and a bunch of graduation marks.
  return (
    <>
      <circle cx={box.centerX} cy={box.centerY} r={box.height(1 / 2) - 1} {...vectorProps} />
      <circle cx={box.centerX} cy={box.centerY} r={box.height(1 / 2) - bezelThickness} {...vectorProps} />
      {graduations}
    </>
  );
};
