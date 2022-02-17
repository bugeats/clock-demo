import { safeDegrees } from './utils';

test('safeDegrees', () => {
  expect(safeDegrees(0)).toBe(0);
  expect(safeDegrees(370)).toBe(10);
  expect(safeDegrees(-370)).toBe(0);
  expect(safeDegrees(undefined)).toBe(0);
  expect(safeDegrees(1/0)).toBe(0);
});
