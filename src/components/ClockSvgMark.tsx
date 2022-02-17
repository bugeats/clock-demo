// Dynamically draw clock marking (graduation) at given angle.

import React, { useContext } from 'react';

import { SvgContext } from '../contexts';
import { Degrees } from '../support/types';
import { safeDegrees } from '../support/utils';

interface ClockSvgMarkProps {
  rotation: Degrees;
  bold: boolean;
}

export const ClockSvgMark: React.FC<ClockSvgMarkProps> = ({
  rotation,
  bold,
}) => {
  const { box, vectorProps } = useContext(SvgContext);

  const transform = `rotate(${safeDegrees(rotation)} ${box.centerX} ${box.centerY})`;

  const props = {
    y1: bold ? box.height(8/64) : box.height(5/64),
    y2: box.height(3/48),
  };

  return (
    <g transform={transform}>
      <line x1={box.centerX} x2={box.centerX} {...props} {...vectorProps} />
    </g>
  );
};
