import { createClockState, graduationMarks } from './AnalogClock';

describe('ClockModel', () => {
  test('graduationMarks', () => {
    expect(graduationMarks.length).toBe(5 * 12);
  });

  test('createClockState at noon', () => {
    const result = createClockState(new Date('2000-01-01T12:00:00.000'));
    expect(result).toEqual({
      hourHandDegrees: 0,
      minuteHandDegrees: 0,
      secondHandDegrees: 0,
    });
  });

  test('createClockState at half past noon', () => {
    const result = createClockState(new Date('2000-01-01T12:30:00.000'));
    expect(result).toEqual({
      hourHandDegrees: 360 / 12 / 2,
      minuteHandDegrees: 180,
      secondHandDegrees: 0,
    });
  });

  test('createClockState at complex time with seconds', () => {
    const result = createClockState(new Date('1982-08-12T22:10:30'));
    expect(result).toEqual({
      hourHandDegrees: 305.25,
      minuteHandDegrees: 63,
      secondHandDegrees: 180,
    });
  });
});
