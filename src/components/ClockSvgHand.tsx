// Dynamically draw a clock hand with the given size parameters and angle.

import React, { useContext } from 'react';

import { SvgContext } from '../contexts';
import { Degrees, UnitValue } from '../support/types';

interface ClockSvgHandProps {
  rotation: Degrees;
  size: UnitValue;
  thickness: UnitValue;
}

export const ClockSvgHand: React.FC<ClockSvgHandProps> = ({
  rotation,
  size,
  thickness,
}) => {
  const { box, vectorProps } = useContext(SvgContext);

  const transform = `rotate(${rotation} ${box.centerX} ${box.centerY})`;
  const margin = box.size(5 / 48); // margin between the pointy end and the clock edge
  const toff = box.size(thickness) / 2; // thickness of the hand

  // The top-most Y point, scaled according to margin
  const topY = (box.centerY) - (((box.centerY) - margin) * size);

  // Draw a diamond-like shape with one end elongated
  // TODO this is ugly, and if we do any more drawing I'm going to want to make some better tools.
  const pathCommands = [
    `M ${box.centerX - toff} ${box.centerX}`,  // start from center with an x offset for hand thickness
    `L ${box.centerY} ${topY}`,                // line to clock edge
    `L ${box.centerX + toff} ${box.centerY}`,  // line back from clock edge, with opposing x offset for hand thickness
    `L ${box.centerX}, ${box.height(7 / 12)}`, // extend past center to add a natural 'tail' to the hand shape
    'Z',                                       // close the path with a line that returns to start
  ].join(', ');

  return (
    <g transform={transform}>
      <path d={pathCommands} {...vectorProps} />
    </g>
  );
};
