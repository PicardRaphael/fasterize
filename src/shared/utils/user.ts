export const haveSameUsers = <T>(current: T[], next: T[]) =>
  current.length === next.length &&
  current.every((v) => next.includes(v)) &&
  next.every((v) => current.includes(v));
