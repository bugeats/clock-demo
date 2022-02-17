// Use CSS tricks to render a centered container proportional to the viewport and with a fixed aspect ratio.

import './ClockContainer.css';

import React, { useContext } from 'react';

import { ThemeContext } from '../contexts';

interface ClockContainerProps {
  children?: React.ReactNode;
}

export const ClockContainer: React.FC<ClockContainerProps> = ({
  children,
}) => {
  const { colorFg, colorBg } = useContext(ThemeContext);

  const clockContainerStyle: React.CSSProperties = {
    backgroundColor: colorBg,
    color: colorFg,
  };

  return (
    <div className='ClockContainer' style={clockContainerStyle}>
      <div>
        {children}
      </div>
    </div>
  );
};
