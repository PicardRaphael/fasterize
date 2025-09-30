export const areArraysEqual = <T>(current: T[], next: T[]): boolean =>
  current.length === next.length &&
  current.every((v) => next.includes(v)) &&
  next.every((v) => current.includes(v));
