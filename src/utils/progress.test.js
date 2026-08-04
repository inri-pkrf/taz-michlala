import { calculateProgress } from './progress';

describe('calculateProgress', () => {
  it('calculates the progress gradually based on completed steps', () => {
    expect(calculateProgress(['step-1', 'step-2', 'step-3'], 13)).toBe(23);
  });

  it('caps the progress at 100 percent even if more steps are completed than the total', () => {
    expect(calculateProgress(Array(20).fill('step'), 13)).toBe(100);
  });
});
