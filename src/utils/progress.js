export function calculateProgress(completedActions, totalSteps) {
  const safeTotal = Math.max(totalSteps, 1);
  const ratio = (completedActions.length / safeTotal) * 100;
  return Math.min(100, Math.max(0, Math.round(ratio)));
}
