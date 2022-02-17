// This component provides the root of the SVG document.
// Child components are expected to be SVG fragments,
// which use `SvgContext` to render themselves inside the view box.

import React, { useContext } from 'react';

import { SvgContext, ThemeContext } from '../contexts';

interface ClockSvgProps {
  children?: React.ReactNode;
}

export const ClockSvg: React.FC<ClockSvgProps> = ({
  children,
}) => {
  const { colorBg, colorFg } = useContext(ThemeContext);
  const { box } = useContext(SvgContext);

  const props = {
    width: '100%',
    height: '100%',
    viewBox: `0 0 ${box.width()} ${box.height()}`,
  };

  // Use a group element to cascade SVG styling down to all children.
  return (
    <svg {...props} version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <g
        stroke={colorFg}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        fill={colorBg}
      >
        {children}
      </g>
    </svg>
  );
};
