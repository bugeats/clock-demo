// The main clock component that aggregates and animates its parts.

import React, { useEffect, useState } from 'react';

import { ClockSvg, ClockSvgFace, ClockSvgHand } from '../components';
import { createBox, SvgContext } from '../contexts';
import { Degrees } from '../support/types';

const FPS = 2; // two frames per second to avoid potential issues with jitter

// -----------------------------------------------------------------------------

interface ClockState {
  hours: number; // 0.0 - 23.0
  minutes: number; // 0.0 - 59.0
  seconds: number; // 0.0 - 59.0
}

function sampleClockState (): ClockState {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  return {
    // hours and minutes are fractional like a real analog clock
    hours: h + (m / 60) + (s / 3600),
    minutes: m + (s / 60),
    // but seconds should 'tick' no matter what the sample rate
    seconds: s,
  };
}

// -----------------------------------------------------------------------------

export const Clock: React.FC = () => {
  const [clockState, setClockState] = useState<ClockState>(sampleClockState());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClockState(sampleClockState());
    }, 1000 / FPS);

    // make sure to clear the timer on component teardown
    return () => clearInterval(intervalId);
  }, []);

  const hours: Degrees = (360 / 12) * clockState.hours;
  const minutes: Degrees = (360 / 60) * clockState.minutes;
  const seconds: Degrees = (360 / 60) * clockState.seconds;

  const contextData = {
    box: createBox(120, 120),
    vectorProps: {
      // Makes an SVG element draw all strokes with the same thickness
      // regardless of scaling to simulate a vector display.
      // Unfortunately, this property does NOT work when applied to SVG group elements
      // so we need to inject it inline wherever its needed.
      vectorEffect: 'non-scaling-stroke',
    },
  };

  return (
    <div className='Clock'>
      <SvgContext.Provider value={contextData}>
        <ClockSvg>
          <ClockSvgFace/>
          <ClockSvgHand rotation={minutes} size={1} thickness={3/48} />
          <ClockSvgHand rotation={hours} size={1 / 2} thickness={3/48} />
          <ClockSvgHand rotation={seconds} size={1} thickness={1/48} />
        </ClockSvg>
      </SvgContext.Provider>
    </div>
  );
};
