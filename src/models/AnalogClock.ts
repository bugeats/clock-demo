import { Degrees } from '../support/types';


// Constants -------------------------------------------------------------------

const circleDegrees: Degrees = 360;
const hoursPerRotation = 12;
const minuteMarksInsideHour = 5;
const minutesPerHour = 60;
const secondsPerMinute = 60;
const secondsPerHour = 3600;


// Graduation Marks ------------------------------------------------------------

interface GraduationMark {
  readonly angle: Degrees;
  readonly bold: boolean;
}

const marksPerRotation = hoursPerRotation * minuteMarksInsideHour;
const markIndexToAngle = (i: number) => i * ((circleDegrees / hoursPerRotation) / minuteMarksInsideHour);

export const graduationMarks: GraduationMark[] = Array.from({ length: marksPerRotation }, (_, i) => {
  return {
    angle: markIndexToAngle(i),
    bold: i % minuteMarksInsideHour === 0,
  };
});


// Clock State -----------------------------------------------------------------

export interface ClockState {
  readonly hourHandDegrees: Degrees;
  readonly minuteHandDegrees: Degrees;
  readonly secondHandDegrees: Degrees;
}

export function createClockState (date: Date): ClockState {
  const dh = date.getHours();
  const dm = date.getMinutes();
  const ds = date.getSeconds();

  // hours and minutes are fractional like a real analog clock
  const fractionalHours = dh + (dm / minutesPerHour) + (ds / secondsPerHour);
  const fractionalMinutes = dm + (ds / secondsPerMinute);

  const hourHandDegrees = safeDegrees((circleDegrees / hoursPerRotation) * fractionalHours);
  const minuteHandDegrees = safeDegrees((circleDegrees / minutesPerHour) * fractionalMinutes);
  const secondHandDegrees = safeDegrees((circleDegrees / secondsPerMinute) * ds);

  return Object.freeze({
    hourHandDegrees,
    minuteHandDegrees,
    secondHandDegrees,
  });
}


// Support ---------------------------------------------------------------------

function safeDegrees (n?: number): Degrees {
  if (!Number.isFinite(n)) {
    return 0;
  }

  return Math.max(0, (n || 0) % circleDegrees);
}

