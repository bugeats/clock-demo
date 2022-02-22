// The main clock component that aggregates and animates its parts.

import React, { useEffect, useState } from 'react';

import { ClockSvg, ClockSvgFace, ClockSvgHand } from '../components';
import { createBox, SvgContext } from '../contexts';
import * as AnalogClock from '../models/AnalogClock';

const FPS = 2; // two frames per second to avoid potential issues with jitter

const svgContextData = {
  box: createBox(120, 120),
  vectorProps: {
    // Makes an SVG element draw all strokes with the same thickness
    // regardless of scaling to simulate a vector display.
    // Unfortunately, this property does NOT work when applied to SVG group elements
    // so we need to inject it inline wherever its needed.
    vectorEffect: 'non-scaling-stroke',
  },
};

export const Clock: React.FC = () => {
  const [clockState, setClockState] = useState<AnalogClock.ClockState>(
    AnalogClock.createClockState(new Date()),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClockState(AnalogClock.createClockState(new Date()));
    }, 1000 / FPS);

    // make sure to clear the timer on component teardown
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='Clock'>
      <SvgContext.Provider value={svgContextData}>
        <ClockSvg>
          <ClockSvgFace/>
          <ClockSvgHand rotation={clockState.minuteHandDegrees} size={1} thickness={3 / 48} />
          <ClockSvgHand rotation={clockState.hourHandDegrees} size={1 / 2} thickness={3 / 48} />
          <ClockSvgHand rotation={clockState.secondHandDegrees} size={1} thickness={1 / 48} />
        </ClockSvg>
      </SvgContext.Provider>
    </div>
  );
};
